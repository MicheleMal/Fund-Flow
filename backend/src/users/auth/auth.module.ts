import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';
import { EmailService } from 'src/email/service/email.service';
import { EmailModule } from 'src/email/email.module';
import { TemporanyCodes, TemporanyCodesSchema } from 'src/schemas/TemporaryCodes.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema
            },
            {
                name: TemporanyCodes.name,
                schema: TemporanyCodesSchema
            }
        ]),
        EmailModule
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
