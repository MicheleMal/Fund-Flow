import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EarningSourceDto } from '../dto/earning-source.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EarningSource } from 'src/schemas/EarningSource.schema';
import { UpdateEarningSourceDto } from '../dto/update-earning-source.dto';

@Injectable()
export class EarningSourcesService {
  @InjectModel(EarningSource.name)
  private readonly earningSourceModel: Model<EarningSource>;

  // Get all earning sources
  async getAllEarningsSource(): Promise<EarningSourceDto[]> {
    const allEarningSources = await this.earningSourceModel.find().exec();
    if (allEarningSources.length === 0) {
      throw new NotFoundException('Nessun fonte di entrata inserito');
    }
    return allEarningSources;
  }

  //Insert new earning source
  async insertNewEarningSource(
    earningSourceDto: EarningSourceDto,
  ): Promise<EarningSourceDto> {
    const earningSourceName = earningSourceDto.earning_source_name.trim();

    const isUniqueSourceName = await this.earningSourceModel.exists({
      earning_source_name: earningSourceName,
    });

    if (isUniqueSourceName) {
      throw new ConflictException('Fonte entrata già inserita');
    }

    return this.earningSourceModel.create({
      earning_source_name: earningSourceName,
      earning_type: earningSourceDto.earning_type,
    });
  }

  // Update earning source by id
  async updateEarningSource(
    updateEarningSourceDto: UpdateEarningSourceDto,
    _id: string,
  ): Promise<UpdateEarningSourceDto> {
    const updateEarningSource = await this.earningSourceModel
      .findByIdAndUpdate(_id, updateEarningSourceDto, { new: true })
      .exec();

    if (!updateEarningSource) {
      throw new NotFoundException('Nessuna fonte entrate trovata');
    }

    return updateEarningSource;
  }

  // Delete earning source by id
  async deleteEarningSource(_id: string): Promise<EarningSourceDto>{
    const deleteEarningSource = await this.earningSourceModel
      .findByIdAndDelete(_id)
      .exec();

    if (!deleteEarningSource) {
      throw new NotFoundException('Nessuna fonte entrata trovata');
    }
    return deleteEarningSource
  }
}
