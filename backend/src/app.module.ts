import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { EarningsModule } from './earnings/earnings.module';
import { ExpensesModule } from './expenses/expenses.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { JwtModule } from '@nestjs/jwt';

//TODO: Controllare gli spazi nel metodo PATCH

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions:{
        expiresIn: "1s"
      }
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL_DEV),
    UsersModule,
    EarningsModule,
    ExpensesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
