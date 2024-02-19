import nodemailer from "nodemailer";
import config_send_mail from "../../configs/config_send_mail";
import { SEND_MAIL_FROM } from "../../const";

const transporter = nodemailer.createTransport({
  service: config_send_mail.service,
  auth: {
    user: config_send_mail.user,
    pass: config_send_mail.password,
  },
});

export const sendMail = async (mailOptions) => {
  mailOptions.from = SEND_MAIL_FROM;
  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.log("Error al enviar correo electronico: ", error);
    return null;
  }
};

export const sendMailDev = async (mailOptions) => {
  mailOptions.from = SEND_MAIL_FROM;
  mailOptions.subject = mailOptions.subject + " - DEV: " + mailOptions.to;
  mailOptions.to = "jose.segovia.r@gmail.com";
  console.log("SENDING MAIL DEVELOP", mailOptions.subject, mailOptions.to);
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("MAIL DEVELOP SENT");
    return info;
  } catch (error) {
    console.log("Error al enviar correo electronico (DEV): ", error);
    return null;
  }
};
