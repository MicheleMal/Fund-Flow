import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EarningDto } from 'src/earnings/dto/earning.dto';
import { UpdateEarningDto } from 'src/earnings/dto/update-earning.dto';
import { Earning } from 'src/schemas/Earning.schema';
import { EarningSourceDto } from '../dto/earning-source.dto';
import { EarningSource } from 'src/schemas/EarningSource.schema';
import { TotalEarnings } from 'src/schemas/TotalEarnings.schema';

@Injectable()
export class EarningsService {
  constructor(
    @InjectModel('Earning') private readonly earningModel: Model<Earning>,
    @InjectModel('EarningSource')
    private readonly earningSourceModel: Model<EarningSource>,
    @InjectModel('TotalEarnings')
    private readonly totalEarningsModel: Model<TotalEarnings>,
  ) {}

  // Get all earnings
  async getAllEarnings(): Promise<EarningDto[]> {
    const allEarnings = await this.earningModel
      .find()
      .populate('id_earning_source')
      .exec();

    if (allEarnings.length === 0) {
      throw new NotFoundException('Nessun guadagno inserito');
    }
    return allEarnings;
  }

  // Get all earnings source
  async getAllEarningsSource(): Promise<EarningSourceDto[]> {
    const allEarningsSource = await this.earningSourceModel.find().exec();
    if (allEarningsSource.length === 0) {
      throw new NotFoundException('Nessun fonte di guadagno inserito');
    }
    return allEarningsSource;
  }

  // Get all earning by id
  async getEarninById(_id: string): Promise<EarningDto> {
    const earning = await this.earningModel.findById(_id);

    if (!earning) {
      throw new NotFoundException('Nessun guadagno trovato');
    }

    return earning;
  }

  // Insert new earning
  async insertNewEarning(earningDto: EarningDto): Promise<EarningDto> {
    // Prima versione con forEach
    // const monthTotalEarnings = await this.totalEarningsModel
    //   .find({}, 'month')
    //   .exec();

    // const monthUser = new Date(earningDto.earning_date).getMonth();

    // // Controlla se la tabella è vuota o non esiste il mese inserito
    // if (monthTotalEarnings.length === 0) {
    //   this.totalEarningsModel.create({
    //     earnings_total: earningDto.amount,
    //     month: new Date(earningDto.earning_date).getMonth() + 1,
    //   });
    // } else {
    //   monthTotalEarnings.forEach((monthTotalEarning) => {
    //     // Controlla se il mese è già presente nella tabella total earnings
    //     if (monthTotalEarning['month'] === monthUser + 1) {
    //       this.totalEarningsModel
    //         .findOneAndUpdate(
    //           {
    //             month: monthUser + 1,
    //           },
    //           {
    //             $inc: { earnings_total: earningDto.amount },
    //           },
    //         )
    //         .exec();
    //     } else {
    //       this.totalEarningsModel.create({
    //         earnings_total: earningDto.amount,
    //         month: new Date(earningDto.earning_date).getMonth() + 1,
    //       });
    //     }
    //   });
    // }

    // Seconda versione
    const monthUser = new Date(earningDto.earning_date).getMonth() + 1;
    const yearUser = new Date(earningDto.earning_date).getFullYear();

    const amountUser = earningDto.amount;
    this.totalEarningsModel
      .findOneAndUpdate(
        { month: monthUser, year: yearUser },
        {
          $inc: { earnings_total: earningDto.amount },
          $setOnInsert: { monthUser, amountUser, yearUser },
        }, // $setOnInsert: consente di specificare valori da impostare per il nuovo documento
        { upsert: true, new: true }, // upsert: true indica di creare un nuovo documento se non ne viene trovato uno corrispondete al filtro
      )
      .exec();

    return this.earningModel.create(earningDto);
  }

  //Insert new earning source
  async insertNewEarningSource(
    earningSourceDto: EarningSourceDto,
  ): Promise<EarningSourceDto> {
    const isUnique = await this.earningSourceModel.exists({
      source_name: earningSourceDto.source_name,
    });

    if (isUnique) {
      throw new ConflictException('Fonte di guadagno già inserita');
    }

    return this.earningSourceModel.create(earningSourceDto);
  }

  // Delete earning by id
  async deleteEarning(_id: string): Promise<EarningDto> {
    const deleteEarning = await this.earningModel.findByIdAndDelete(_id).exec();

    if (!deleteEarning) {
      throw new NotFoundException('Nessun guadagno trovato da eliminare');
    }
    return deleteEarning;
  }

  // Update earning by id
  async updateEarning(
    updateEarningDto: UpdateEarningDto,
    _id: string,
  ): Promise<UpdateEarningDto> {
    const updateEarning = await this.earningModel
      .findByIdAndUpdate(_id, updateEarningDto, { new: true })
      .exec();

    if (!updateEarning) {
      throw new NotFoundException('Nessun guadagno trovato da modificare');
    }

    return updateEarning;
  }
}
