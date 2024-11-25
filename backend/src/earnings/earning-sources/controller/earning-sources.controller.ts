import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { EarningSourcesService } from '../service/earning-sources.service';
import { EarningSourceDto } from '../dto/earning-source.dto';
import { UpdateEarningSourceDto } from '../dto/update-earning-source.dto';
import { AuthGuard } from 'src/users/auth/guard/auth.guard';

@Controller('earning-sources')
export class EarningSourcesController {
  constructor(private readonly earningSourcesService: EarningSourcesService) {}

  // /all or /all?et
  @UseGuards(AuthGuard)
  @Get('all')
  getAllEarningSources(
    @Request() request: Request,
    @Query('est') est?: 'Fixed' | 'Variable',
  ) {
    return this.earningSourcesService.getAllEarningsSource(request, est);
  }

  // /:id
  @UseGuards(AuthGuard)
  @Get(':id')
  getEarningSourceById(
    @Param('id') _id: string,
  ): Promise<EarningSourceDto> {
    return this.earningSourcesService.getEarningSourceById(_id);
  }

  // /insert
  @UseGuards(AuthGuard)
  @Post('insert')
  insertEarningSource(
    @Body(ValidationPipe) earningSourceDto: EarningSourceDto,
    @Request() request: Request,
  ): Promise<EarningSourceDto> {
    return this.earningSourcesService.insertNewEarningSource(
      earningSourceDto,
      request,
    );
  }

  // /update/:id
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  delete(@Param('id') id: string): Promise<EarningSourceDto> {
    return this.earningSourcesService.deleteEarningSource(id);
  }
}
