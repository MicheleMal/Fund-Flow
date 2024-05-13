import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { EarningsModule } from './earnings/earnings.module';
import { ExpensesModule } from './expenses/expenses.module';


//TODO: Cambiare guadagno totale quando si modifica o elimina un entrata
//TODO: Controllare gli spazi su patch

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL_DEV),
    EarningsModule,
    ExpensesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
