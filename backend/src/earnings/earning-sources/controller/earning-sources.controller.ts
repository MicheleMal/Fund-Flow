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
import { EarningSourcesService } from '../service/earning-sources.service';
import { EarningSourceDto } from '../dto/earning-source.dto';
import { UpdateEarningSourceDto } from '../dto/update-earning-source.dto';

@Controller('earning-sources')
export class EarningSourcesController {
  constructor(private readonly earningSourcesService: EarningSourcesService) {}

  // /all
  @Get('all')
  getAllEarningSources() {
    return this.earningSourcesService.getAllEarningsSource();
  }

  // /insert
  @Post('insert')
  insertEarningSource(
    @Body(ValidationPipe) earningSourceDto: EarningSourceDto,
  ): Promise<EarningSourceDto> {
    return this.earningSourcesService.insertNewEarningSource(earningSourceDto);
  }

  // /update/:id
  @Patch('update/:id')
  update(
    @Body(ValidationPipe) updateEarningSourceDto: UpdateEarningSourceDto,
    @Param('id') id: string,
  ): Promise<UpdateEarningSourceDto> {
    return this.earningSourcesService.updateEarningSource(
      updateEarningSourceDto,
      id,
    );
  }

  // /delete/:id
  @Delete('delete/:id')
  delete(@Param('id') id: string): Promise<EarningSourceDto> {
    return this.earningSourcesService.deleteEarningSource(id);
  }
}
