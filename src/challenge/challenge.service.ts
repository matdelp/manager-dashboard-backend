import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { Challenge, ChallengeDocument } from 'src/schemas/challenge.schema';
import { Code, CodeDocument } from 'src/schemas/code.schema';
import { CodeText, CodeTextDocument } from 'src/schemas/codeText.schema';
import {
  FunctionInputDefinition,
  FunctionInputDefinitionDocument,
} from 'src/schemas/functionInputDefinition.schema';
import {
  FunctionInputValue,
  FunctionInputValueDocument,
} from 'src/schemas/functionInputValue.schema';
import { Manager, ManagerDocument } from 'src/schemas/manager.schema';
import { Test, TestDocument } from 'src/schemas/test.schema';
import { CreateChallengeDto } from './dto/createChallenge.dto';
import { UpdateChallengeDto } from './dto/updateChallenge.dto';
import { CodeDto } from './dto/nestedDto/code.dto';
import { validateOrReject } from 'class-validator';
import { TestDto } from './dto/nestedDto/test.dto';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectModel(Challenge.name)
    private challengeModel: Model<ChallengeDocument>,

    @InjectModel(Code.name)
    private codeModel: Model<CodeDocument>,

    @InjectModel(CodeText.name)
    private codeTextModel: Model<CodeTextDocument>,

    @InjectModel(FunctionInputDefinition.name)
    private functionInputDefinitionModel: Model<FunctionInputDefinitionDocument>,

    @InjectModel(FunctionInputValue.name)
    private functionInputValueModel: Model<FunctionInputValueDocument>,

    @InjectModel(Manager.name)
    private managerModel: Model<ManagerDocument>,

    @InjectModel(Test.name)
    private testModel: Model<TestDocument>,
  ) {}

  async findAll(): Promise<Challenge[]> {
    return this.challengeModel.find().exec();
  }

  async findOne(id: string): Promise<Challenge> {
    const challenge = await this.challengeModel.findById(id).exec();
    if (!challenge) throw new NotFoundException('Challenge not found');
    return challenge;
  }

  async create(dto: CreateChallengeDto): Promise<Challenge> {
    const codeDto = plainToInstance(CodeDto, dto.code);
    await validateOrReject(codeDto);
    const testDtos = plainToInstance(TestDto, dto.test);
    await Promise.all(testDtos.map((t) => validateOrReject(t)));

    const existing = await this.challengeModel.findOne({ title: dto.title });
    if (existing) {
      throw new BadRequestException('Title already used for another challenge');
    }

    // Create code_text array
    const codeTexts = await this.codeTextModel.create(
      dto.code.code_text.map((text) => ({
        language: text.language,
        content: text.content,
      })),
    );

    // Create inputs array
    const inputs = await this.functionInputDefinitionModel.create(
      dto.code.inputs.map((input) => ({
        name: input.name,
        type: input.type,
      })),
    );

    // Create code from those
    const newCode = await this.codeModel.create({
      function_name: dto.code.function_name,
      code_text: codeTexts.map((codeText) => codeText._id),
      inputs: inputs.map((input) => input._id),
    });

    // Create test array
    const newTests = await Promise.all(
      dto.test.map(async (test) => {
        // Create inputs for eac test
        const inputValues = await this.functionInputValueModel.create(
          test.inputs.map((input) => ({
            name: input.name,
            value: input.value,
          })),
        );

        // Create test document with these inputs
        return await this.testModel.create({
          weight: test.weight,
          inputs: inputValues.map((input) => input._id),
          outputs: test.outputs,
        });
      }),
    );

    const challenge = await this.challengeModel.create({
      title: dto.title,
      category: dto.category,
      description: dto.description,
      level: dto.level,
      code: newCode._id,
      test: newTests.map((testItem) => testItem._id),
      submission: [],
    });

    return challenge;
  }

  async update(id: string, dto: UpdateChallengeDto): Promise<Challenge> {
    const challenge = await this.challengeModel.findById(id).exec();
    if (!challenge) throw new NotFoundException('Challenge not found');

    // Top-level fields
    challenge.title = dto.title ?? challenge.title;
    challenge.category = dto.category ?? challenge.category;
    challenge.description = dto.description ?? challenge.description;
    challenge.level = dto.level ?? challenge.level;

    // Update code if needed
    if (dto.code) {
      let codeItem = await this.codeModel.findById(challenge.code).exec();
      if (!codeItem) {
        codeItem = new this.codeModel();
      }

      codeItem.function_name = dto.code.function_name ?? codeItem.function_name;

      // Update or create 'code_text' nested in 'code'
      if (dto.code.code_text) {
        const codeTextIds = [];
        for (const newCodeText of dto.code.code_text) {
          let updatedItem;
          if (newCodeText._id) {
            updatedItem = await this.codeTextModel.findByIdAndUpdate(
              newCodeText._id,
              newCodeText,
              {
                new: true,
                upsert: true,
              },
            );
          } else {
            updatedItem = await this.codeTextModel.create(newCodeText);
          }
          codeTextIds.push(updatedItem._id);
        }
        codeItem.code_text = codeTextIds;
      }

      // Same for inputs
      if (dto.code.inputs) {
        const inputIds = [];
        for (const input of dto.code.inputs) {
          let updatedItem;
          if (input._id) {
            updatedItem =
              await this.functionInputDefinitionModel.findByIdAndUpdate(
                input._id,
                input,
                { new: true, upsert: true },
              );
          } else {
            updatedItem = await this.functionInputDefinitionModel.create(input);
          }
          inputIds.push(updatedItem._id);
        }
        codeItem.inputs = inputIds;
      }

      await codeItem.save();

      // Assign updated code document ID to challenge.code if not set
      if (
        !challenge.code ||
        challenge.code.toString() !== codeItem._id.toString()
      ) {
        challenge.code = codeItem._id;
      }
    }

    // Update or create 'test'
    if (dto.test) {
      const testIds = [];
      for (const test of dto.test) {
        let testItem;
        if (test._id) {
          testItem = await this.testModel.findByIdAndUpdate(test._id, test, {
            new: true,
            upsert: true,
          });
        } else {
          const inputValues = await this.functionInputValueModel.create(
            test.inputs.map((input) => ({
              name: input.name,
              value: input.value,
            })),
          );

          testItem = await this.testModel.create({
            weight: test.weight,
            inputs: inputValues.map((value) => value._id),
            outputs: test.outputs,
          });
        }
        testIds.push(testItem._id);
      }
      challenge.test = testIds;
    }

    await challenge.save();

    // Return updated challenge with populated nested fields
    const updatedChallenge = await this.challengeModel
      .findById(challenge._id)
      .populate([
        { path: 'code', populate: [{ path: 'code_text' }, { path: 'inputs' }] },
        { path: 'test', populate: { path: 'inputs' } },
      ])
      .lean<Challenge>()
      .exec();
    if (!updatedChallenge)
      throw new NotFoundException('Updated challenge not found');
    return updatedChallenge;
  }

  async delete(id: string): Promise<void> {
    const result = await this.challengeModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Challenge not found');
  }
}
