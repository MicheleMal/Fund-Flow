//? Cambiare da incomes a earning

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { EarningsService } from '../service/earnings.service';
import { EarningDto } from 'src/earnings/dto/earning.dto';
import { UpdateEarningDto } from 'src/earnings/dto/update-earning.dto';
import { EarningSourceDto } from '../dto/earning-source.dto';

@Controller('earnings')
export class EarningsController {
  constructor(private readonly earningsService: EarningsService) {}

  // /earnings/all
  @Get('all')
  getAll(): Promise<EarningDto[]> {
    return this.earningsService.getAllEarnings();
  }

  @Get('source/all')
  getAllSource(): Promise<EarningSourceDto[]> {
    return this.earningsService.getAllEarningsSource();
  }

  // /earnings/:id
  @Get(':id')
  getById(@Param('id') id: string): Promise<EarningDto> {
    return this.earningsService.getEarninById(id);
  }

  // /earnings/insert
  @Post('insert')
  insert(@Body(ValidationPipe) incomeDto: EarningDto): Promise<EarningDto> {
    return this.earningsService.insertNewEarning(incomeDto);
  }

  // /earnings/source/insert
  @Post('source/insert')
  insertEarningSource(
    @Body(ValidationPipe) earningSourceDto: EarningSourceDto,
  ): Promise<EarningSourceDto> {
    return this.earningsService.insertNewEarningSource(earningSourceDto);
  }

  // /earnings/update/:id
  @Patch('/update/:id')
  update(
    @Body(ValidationPipe) updateIncomeDto: UpdateEarningDto,
    @Param('id') id: string,
  ) {
    return this.earningsService.updateEarning(updateIncomeDto, id);
  }

  // /earnings/delete/:id
  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.earningsService.deleteEarning(id);
  }
}
