import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EarningDto } from 'src/earnings/dto/earning.dto';
import { UpdateEarningDto } from 'src/earnings/dto/update-earning.dto';
import { Earning } from 'src/schemas/Earning.schema';
import { TotalEarnings } from 'src/schemas/TotalEarnings.schema';
import { TotalEarningsDto } from '../dto/total-earnings.dto';

@Injectable()
export class EarningsService {
  constructor(
    @InjectModel(Earning.name) private readonly earningModel: Model<Earning>,
    @InjectModel(TotalEarnings.name)
    private readonly totalEarningModel: Model<TotalEarnings>,
  ) {}

  // Get all earnings
  async getAllEarnings(request: Request): Promise<EarningDto[]> {
    const id_user = request["user"]._id
    const allEarnings = await this.earningModel
      .find({id_user: id_user})
      .populate('id_earning_source')
      .populate('id_user')
      .exec();

    if (allEarnings.length == 0) {
      throw new NotFoundException('Nessun entrata inserito');
    }
    return allEarnings;
  }

  async getTotalEarnings(request: Request){
    
    const id_user = request["user"]._id

    const totals = await this.totalEarningModel.find({
      id_user: id_user
    }).sort({'year': 'asc'}).sort({'month': 'asc'}).exec()

    // const totals = await this.totalEarningModel.aggregate([
    //   {
    //     $group: {
    //       _id: {
    //         year: "$year",
    //         month: "$month"
    //       },
    //       earnings_total: {$sum: "$earnings_total"}
    //     }
    //   },

    //   {
    //     $group:{
    //       _id: "$_id.year",
    //       months: {
    //         $push:{
    //           month: "$_id.month",
    //           earnings_total: "$earnings_total"
    //         }
    //       }
    //     }
    //   },
    //   {
    //     $project: {
    //       year: "$_id",
    //       months: 1,
    //       _id: 0
    //     }
    //   },
    //   {
    //     $group: {
    //       _id: null,
    //       years: {
    //         $push: {
    //           k: { $toString: "$year" },
    //           v: "$months"
    //         }
    //       }
    //     }
    //   },
    //   {
    //     $replaceRoot: {
    //       newRoot: { $arrayToObject: "$years" }
    //     }
    //   }
    // ])

    return totals
  }

  // Get all earning by id
  async getEarninById(_id: string, request: Request): Promise<EarningDto> {
    const id_user = request["user"]._id
    const earning = await this.earningModel
      .findById({
        _id: _id,
        id_user: id_user
      })
      .populate('id_earning_source')
      .populate('id_user')
      .exec();

    if (!earning) {
      throw new NotFoundException('Nessun entrata trovato');
    }

    return earning;
  }

  // Insert new earning
  async insertNewEarning(request: Request, earningDto: EarningDto): Promise<EarningDto> {
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
    const id_user = request["user"]._id
    let earningDate: Date
    if(!earningDto.earning_date){
      earningDate = new Date()
    }else{
      earningDate = earningDto.earning_date
    }
    const monthUser = new Date(earningDate).getMonth() + 1;
    const yearUser = new Date(earningDate).getFullYear();

    const amountUser = earningDto.earning_amount;
    const earning = await this.totalEarningModel
      .findOneAndUpdate(
        { month: monthUser, year: yearUser, id_user: id_user },
        {
          $inc: { earnings_total: earningDto.earning_amount },
          $setOnInsert: { monthUser, amountUser, yearUser, id_user },
        }, // $setOnInsert: consente di specificare valori da impostare per il nuovo documento
        { upsert: true, new: true }, // upsert: true indica di creare un nuovo documento se non ne viene trovato uno corrispondete al filtro
      )
      .exec();

    return this.earningModel.create({
      ...earningDto,
      id_user: id_user,
    });
  }

  // Delete earning by id
  async deleteEarning(_id: string): Promise<EarningDto> {
    const deleteEarning = await this.earningModel.findByIdAndDelete(_id).exec();

    if (!deleteEarning) {
      throw new NotFoundException('Nessun entrata trovato da eliminare');
    }

    this.totalEarningModel
      .findOneAndUpdate(
        {
          year: deleteEarning.earning_date.getFullYear(),
          month: deleteEarning.earning_date.getMonth() + 1,
        },
        {
          $inc: { earnings_total: -deleteEarning.earning_amount },
        },
      )
      .exec();

    return deleteEarning;
  }

  // Update earning by id
  async updateEarning(
    updateEarningDto: UpdateEarningDto,
    _id: string,
    request: Request
  ): Promise<UpdateEarningDto> {
    const id_user = request["user"]._id

    // Find earning current
    const earningCurrent = await this.earningModel
      .findById({
        _id: _id,
        id_user: id_user
      })
      .populate('id_earning_source')
      .populate('id_user')
      .exec();

    // Update earning
    const updateEarning = await this.earningModel
      .findByIdAndUpdate(_id, updateEarningDto, { new: true }).populate('id_earning_source').populate('id_user')
      .exec();

    if (!updateEarning) {
      throw new NotFoundException('Nessun entrata trovato da modificare');
    }

    // If user inserted earning_amount
    const monthUser = earningCurrent.earning_date.getMonth() + 1;
    const yearUser = earningCurrent.earning_date.getFullYear();

    if(updateEarningDto.earning_amount){
      if (updateEarningDto.earning_amount > earningCurrent.earning_amount) {
        const totalEarning = await this.totalEarningModel
          .findOne({ month: monthUser, year: yearUser })
          .exec();

        totalEarning.earnings_total = (totalEarning.earnings_total - earningCurrent.earning_amount) + updateEarningDto.earning_amount;

        await totalEarning.save();
      } else {
        const totalEarning = await this.totalEarningModel
          .findOne({ month: monthUser, year: yearUser })
          .exec();
        totalEarning.earnings_total = totalEarning.earnings_total - (earningCurrent.earning_amount - updateEarningDto.earning_amount);

        await totalEarning.save();
      }
    }

    // If user inserted earning_date
    if(updateEarningDto.earning_date){
      const monthInserted = new Date(updateEarningDto.earning_date).getMonth()+1
      const yearInserted = new Date(updateEarningDto.earning_date).getFullYear()
      const earningAmount = updateEarningDto.earning_amount ? updateEarningDto.earning_amount : earningCurrent.earning_amount

      await this.totalEarningModel.findOneAndUpdate({
        month: earningCurrent.earning_date.getMonth()+1,
        year: earningCurrent.earning_date.getFullYear()
      }, {
        $inc: {earnings_total: -earningAmount}
      }).exec()

      const totalEarning = await this.totalEarningModel.findOneAndUpdate({
        month: monthInserted,
        year: yearInserted
      }, {
        $inc: {earnings_total: earningAmount},
        $setOnInsert: {monthInserted, yearInserted, earningAmount, id_user}
      }, {upsert: true, new: true}).exec()


    }

    return updateEarning;
  }
}
