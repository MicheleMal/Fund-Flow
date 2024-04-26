import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { EarningsModule } from './earnings/earnings.module';

//TODO: Sviluppare le tabelle, endpoint categoria uscite ed uscite
//TODO: Aggiungere tabella utenti ed aggiungere campo id_utente nella tabella totalEarning

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL_DEV),
    EarningsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
