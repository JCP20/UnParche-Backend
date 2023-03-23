import nodemailer from "nodemailer";

export const sendEmail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "unparcheadm@gmail.com",
      pass: "iecnfzzqflvevlsf",
    },
  });

  await transporter.sendMail({
    from: "user@gmail.com",
    to,
    subject,
    html,
  });
};
