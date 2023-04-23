import nodemailer from "nodemailer";

export interface IEmailSender {
  send(to: string, subject: string, html: string): Promise<void>;
}

export class NodemailerEmailSender implements IEmailSender {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.EMAIL_HOST_USER ?? "",
        pass: process.env.EMAIL_HOST_PASSWORD ?? "",
      },
    });
  }

  async send(to: string, subject: string, html: string): Promise<void> {
    await this.transporter.sendMail({
      from: "user@gmail.com",
      to,
      subject,
      html,
    });
  }
}

export const sendEmail = async (to: string, subject: string, html: string) => {
  const emailSender = new NodemailerEmailSender();
  await emailSender.send(to, subject, html);
};
