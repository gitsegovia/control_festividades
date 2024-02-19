import "dotenv/config";

const config_send_mail = {
  service: process.env.SEND_MAIL_SERVICE,
  user: process.env.SEND_MAIL_USER,
  password: process.env.SEND_MAIL_PASS,
};

export default config_send_mail;
