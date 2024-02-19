import { sendMailDev } from "../../services/sendMail";
import {
  templateEmailNewProvider,
  templateEmailValidateMailProvider,
} from "../../services/sendMail/templateMail";
import { makeCodeNumeric } from "../../utils/security";

const DEV = process.env.NODE_ENV;

export default {
  Mutation: {
    createMailRegister: () => {
      const mailProviderOptions = {
        to: "demo@prueba.com",
        subject: "Cuenta registrada en la plataforma CuiQly", // Subject line
        html: templateEmailNewProvider({
          businessName: "Prueba",
          emailBusiness: "demo@prueba.com",
        }), // html body
      };

      const mailValidateMailOptions = {
        to: "demo@prueba.com",
        subject: "Bienvenid@, verifica tu correo electrónico.", // Subject line
        html: templateEmailValidateMailProvider({
          businessName: "Prueba",
          tokenActivation: makeCodeNumeric(6),
          tokenLink: "revisar",
        }), // html body
      };

      sendMailDev(mailProviderOptions);
      sendMailDev(mailValidateMailOptions);

      return true;
    },
    createVerfPhone: (_, { phone }) => {
      //+507 555-5555
      console.log(phone);
      return true;
    },
  },
};
