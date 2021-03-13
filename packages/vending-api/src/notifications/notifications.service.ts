import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NotificationsService {
  constructor(private configService: ConfigService, private readonly mailerService: MailerService) {}

  insufficientStockEmail(inventories) {
    // inventories
    const vendingMachineId = inventories?.[0].machineId;
    const emailHtml = `this is email example`;
    console.log({ emailHtml });

    return this.mailerService
      .sendMail({
        to: 'aeio.yu@gmail.com', // List of receivers email address
        from: '"Vending Machine Notification" <noreply@drink.com>', // Senders email address
        subject: `Vending Machine #${vendingMachineId} has an insufficient Stock`,
        template: 'insufficientStockNotification', // The `.pug` or `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          username: 'john doe',
        },
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  insufficientStockAppPush(inventories) {
    return;
  }
}
