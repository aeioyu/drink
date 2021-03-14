import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NotificationsService {
  constructor(private configService: ConfigService, private readonly mailerService: MailerService) {}

  insufficientStockEmail(inventories) {
    const vendingMachineId = inventories?.[0].machineId;

    return this.mailerService
      .sendMail({
        to: 'aeio.yu@gmail.com', // List of receivers email address
        from: '"Vending Machine Notification" <noreply@drink.com>', // Senders email address
        subject: `Vending Machine #${vendingMachineId} has a lower stock product`,
        template: 'insufficientStockNotification', // The `.pug` or `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          machineId: vendingMachineId,
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
