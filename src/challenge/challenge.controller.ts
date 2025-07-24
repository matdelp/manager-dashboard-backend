import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateChallengeDto } from './dto/createChallenge.dto';
import { UpdateChallengeDto } from './dto/updateChallenge.dto';
import { ChallengesService } from './challenge.service';
import { Challenge } from './types/Challenge';

@Controller('challenge')
export class ChallengeController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Get()
  findAll() {
    return this.challengesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Challenge> {
    return await this.challengesService.findOne(id);
  }

  @Post()
  async createChallenge(
    @Body() createDto: CreateChallengeDto,
  ): Promise<Challenge> {
    return await this.challengesService.create(createDto);
  }

  @Put(':id')
  async updateChallenge(
    @Param('id') id: string,
    @Body() updateDto: UpdateChallengeDto,
  ): Promise<Challenge> {
    return await this.challengesService.update(id, updateDto);
  }
  @Delete(':id')
  async deleteChallenge(@Param('id') id: string): Promise<void> {
    return await this.challengesService.delete(id);
  }
}
