import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendWelcomeEmail(to: string, username: string) {
    await this.mailService.sendMail({
      from: this.configService.get<string>('FROM_EMAIL'),
      to: to,
      subject: `Benvenuto ${username}`,
      text: 'Registrazione effettuata con successo.',
    });
  }

  async sendUpdateUserEmail(to: string) {
    await this.mailService.sendMail({
      from: this.configService.get<string>('FROM_EMAIL'),
      to: to,
      subject: 'Profilo aggiornato',
      text: 'Il tuo profilo è stato aggiornato correttamente.',
    });
  }

  async sendDeleteUserEmail(to: string) {
    await this.mailService.sendMail({
      from: this.configService.get<string>('FROM_EMAIL'),
      to: to,
      subject: 'Account eliminato',
      text: 'Il tuo account è stato eliminato con successo come da lei richiesto',
    });
  }

  async sendTemporanyCodeEmail(to: string, code: number){
    this.mailService.sendMail({
      from: this.configService.get<string>('FROM_EMAIL'),
      to: to,
      subject: "Codice temporaneo",
      text: `Codice temporaneo per ripristinare la password: ${code}` 
    })
  }

  async sendRestPasswordEmail(to: string){
    this.mailService.sendMail({
      from: this.configService.get<string>('FROM_EMAIL'),
      to: to,
      subject: "Password resettata",
      text: "La password è stata resettata"
    })
  }
}
