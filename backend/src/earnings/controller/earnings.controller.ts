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

@Controller('earnings')
export class EarningsController {
  constructor(private readonly earningsService: EarningsService) {}

  // /earnings/all
  @Get('all')
  getAll(): Promise<EarningDto[]> {
    return this.earningsService.getAllEarnings();
  }

  // /earnings/:id
  @Get(':id')
  getById(@Param('id') id: string): Promise<EarningDto> {
    return this.earningsService.getEarninById(id);
  }

  // /earnings/insert
  @Post('insert')
  insert(@Body(ValidationPipe) earningDto: EarningDto): Promise<EarningDto> {
    return this.earningsService.insertNewEarning(earningDto);
  }

  // /earnings/update/:id
  @Patch('update/:id')
  update(
    @Body(ValidationPipe) updateEarningDto: UpdateEarningDto,
    @Param('id') id: string,
  ): Promise<UpdateEarningDto>  {
    return this.earningsService.updateEarning(updateEarningDto, id);
  }

  // /earnings/delete/:id
  @Delete('delete/:id')
  delete(@Param('id') id: string): Promise<EarningDto>  {
    return this.earningsService.deleteEarning(id);
  }
}
