import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
  findOne(@Param('id') id: string): Challenge {
    return this.challengesService.findOne(id);
  }

  //Keepgoing
  @Post()
  createChallenge(@Body() createDto: CreateChallengeDto): string {
    return 'This action adds a new challenge';
  }

  @Put(':id')
  updateChallenge(
    @Param('id') id: string,
    @Body() updateDto: UpdateChallengeDto,
  ): string {
    return `This action update the challenge`;
  }
  @Delete(':id')
  deleteChallengeByName(
    @Param('id') id: number,
    @Query('name') name: string,
  ): string {
    return `This action delete the challenge`;
  }
}
