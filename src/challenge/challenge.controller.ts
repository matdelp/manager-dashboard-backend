import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
} from '@nestjs/common';
// import { CreateChallengeDto } from './create-challenges.dto';
// import { UpdateChallengeDto } from './update-challenges.dto';

@Controller('challenge')
export class ChallengeController {
  @Get()
  findAll(): string {
    return `This action returns all the challenges`;
  }
  @Get(':id')
  findOne(@Param('id') id: number, @Query('name') name: string): string {
    return `This action returns "${name}" challenge`;
  }
  @Put(':id')
  updateChallenge(
    @Param('id') id: number,
    @Body() updateDto: UpdateChallengeDto,
    @Query('name') name: string,
  ): string {
    return `This action update "${name}" challenge`;
  }
  @Delete(':id')
  deleteChallengeByName(
    @Param('id') id: number,
    @Query('name') name: string,
  ): string {
    return `This action delete "${name}" challenge`;
  }
}
//   @Post()
//   createChallenge(@Body() createDto: CreateChallengeDto): string {
//     return 'This action adds new challenges';}
