import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { EarningsService } from '../service/earnings.service';
import { EarningDto } from 'src/earnings/dto/earning.dto';
import { UpdateEarningDto } from 'src/earnings/dto/update-earning.dto';
import { AuthGuard } from 'src/users/auth/guard/auth.guard';
import { TotalEarningsDto } from '../dto/total-earnings.dto';

@Controller('earnings')
export class EarningsController {
  constructor(private readonly earningsService: EarningsService) {}

  // /earnings/all
  @UseGuards(AuthGuard)
  @Get('all')
  getAll(@Request() request: Request): Promise<EarningDto[]> {
    return this.earningsService.getAllEarnings(request);
  }

  // /earnings/total
  @UseGuards(AuthGuard)
  @Get('totals')
  getTotalEarnings(@Request() request: Request){
    return this.earningsService.getTotalEarnings(request)
  }

  // /earnings/:id
  @UseGuards(AuthGuard)
  @Get(':id')
  getById(@Param('id') id: string, @Request() request: Request): Promise<EarningDto> {
    return this.earningsService.getEarninById(id, request);
  }

  // /earnings/insert
  @UseGuards(AuthGuard)
  @Post('insert')
  insert(@Request() request: Request, @Body(ValidationPipe) earningDto: EarningDto): Promise<EarningDto> {
    return this.earningsService.insertNewEarning(request, earningDto);
  }

  // /earnings/update/:id
  @UseGuards(AuthGuard)
  @Patch('update/:id')
  update(
    @Body(ValidationPipe) updateEarningDto: UpdateEarningDto,
    @Param('id') id: string,
    @Request() request: Request
  ): Promise<UpdateEarningDto>  {
    return this.earningsService.updateEarning(updateEarningDto, id, request);
  }

  // /earnings/delete/:id
  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  delete(@Param('id') id: string): Promise<EarningDto>  {
    return this.earningsService.deleteEarning(id);
  }

}
