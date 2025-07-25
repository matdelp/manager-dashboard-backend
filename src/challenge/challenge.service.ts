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
    const updated = await this.challengeModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Challenge not found');
    return updated;
  }

  async delete(id: string): Promise<void> {
    const result = await this.challengeModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Challenge not found');
  }
}
