import nodemailer from "nodemailer";

export interface IEmailSender {
  send(to: string, subject: string, html: string): Promise<void>;
}

export class NodemailerEmailSender implements IEmailSender {
  private transporter: nodemailer.Transporter;

  // TODO Poner los datos de autenticación como variables de entorno o en archivo de configuraciñon
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "unparcheadm@gmail.com",
        pass: "iecnfzzqflvevlsf",
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