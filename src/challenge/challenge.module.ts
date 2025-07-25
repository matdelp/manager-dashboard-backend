import { Module } from '@nestjs/common';
import { ChallengeController } from './challenge.controller';
import { ChallengeService } from './challenge.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Manager, ManagerSchema } from 'src/schemas/manager.schema';
import { Challenge, ChallengeSchema } from 'src/schemas/challenge.schema';
import { Code, CodeSchema } from 'src/schemas/code.schema';
import { CodeText, CodeTextSchema } from 'src/schemas/codeText.schema';
import {
  FunctionInputDefinition,
  FunctionInputDefinitionSchema,
} from 'src/schemas/functionInputDefinition.schema';
import {
  FunctionInputValue,
  FunctionInputValueSchema,
} from 'src/schemas/functionInputValue.schema';
import { Test, TestSchema } from 'src/schemas/test.schema';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([
      { name: Manager.name, schema: ManagerSchema },
      { name: Challenge.name, schema: ChallengeSchema },
      { name: Code.name, schema: CodeSchema },
      { name: CodeText.name, schema: CodeTextSchema },
      {
        name: FunctionInputDefinition.name,
        schema: FunctionInputDefinitionSchema,
      },
      { name: FunctionInputValue.name, schema: FunctionInputValueSchema },
      { name: Test.name, schema: TestSchema },
    ]),
  ],
  controllers: [ChallengeController],
  providers: [ChallengeService, RolesGuard],
  exports: [ChallengeService],
})
export class ChallengeModule {}
