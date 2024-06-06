import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
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
  async getAllEarningsSource(request: Request, earningType?: "Fixed" | "Variable"): Promise<EarningSourceDto[]> {

    let allEarnings: EarningSourceDto[]
    const id_user = request["user"]._id

    if(earningType){
      allEarnings = await this.earningSourceModel.find({
        id_user: id_user,
        earning_type: earningType
      }).exec()

      if(allEarnings.length==0){
        throw new NotFoundException(`Nessuna categoria di uscita di tipo ${earningType} inserita`,)
      }
    }else{
      allEarnings = await this.earningSourceModel.find({id_user: id_user}).exec();
      if (allEarnings.length === 0) {
        throw new NotFoundException('Nessun fonte di entrata inserito');
      }
    }
    return allEarnings;
  }

  //Insert new earning source
  async insertNewEarningSource(
    earningSourceDto: EarningSourceDto,
    request: Request
  ): Promise<EarningSourceDto> {
    const id_user = request["user"]._id
    
    const isUniqueSourceName = await this.earningSourceModel.exists({
      earning_source_name: earningSourceDto.earning_source_name,
    });

    if (isUniqueSourceName) {
      throw new ConflictException('Fonte entrata già inserita');
    }

    return this.earningSourceModel.create({
      ...earningSourceDto,
      id_user: id_user
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
