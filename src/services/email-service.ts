import { ENV } from '@/common/config/env';
import User from '@/db/models/user';
import { ServerClient } from 'postmark';

export class EmailService {
  private from = 'adetayo.o@instance.finance';
  private company_name = 'Lexitar Gadgets';
  private sender_name = 'Lexitar Gadgets';
  private company_address = 'Somewhere in the world 😉';
  private client = new ServerClient(ENV.POSTMARK_TOKEN!, { useHttps: true });

  async sendEmailVerificationMail(user: User, token: string) {
    try {
      await this.client.sendEmailWithTemplate({
        From: this.from,
        To: user.email,
        TemplateAlias: 'welcome',
        TemplateModel: {
          company_name: this.company_name,
          name: `${user.firstName} ${user.lastName}`,
          action_url: `${ENV.SERVER_URL}/api/v1/auth/verify?token=${token}`,
          company_address: this.company_address,
          sender_name: this.sender_name,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
