import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { RolesGuard } from 'src/common/guards/roles.guard';
import { ChallengeService } from './challenge.service';
import { CreateChallengeDto } from './dto/createChallenge.dto';
import { UpdateChallengeDto } from './dto/updateChallenge.dto';
import { Challenge } from './types/Challenge';

@UseGuards(RolesGuard)
@Controller('challenge')
export class ChallengeController {
  constructor(private readonly ChallengeService: ChallengeService) {}

  @Get()
  findAll() {
    return this.ChallengeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Challenge> {
    return await this.ChallengeService.findOne(id);
  }

  @Post()
  async createChallenge(
    @Body() createDto: CreateChallengeDto,
  ): Promise<Challenge> {
    return await this.ChallengeService.create(createDto);
  }

  @Patch(':id')
  async updateChallenge(
    @Param('id') id: string,
    @Body() updateDto: UpdateChallengeDto,
  ): Promise<Challenge> {
    return await this.ChallengeService.update(id, updateDto);
  }
  @Delete(':id')
  async deleteChallenge(@Param('id') id: string): Promise<void> {
    return await this.ChallengeService.delete(id);
  }
}
