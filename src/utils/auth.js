import jwt from "jsonwebtoken";
import { encrypt, getBase64, setBase64 } from "./security";
import config_auth from "../configs/config_auth";
import { isPasswordMatch } from "./is";

export const createTokenWeb = async (user) => {
  const { id } = user;

  const idHas = setBase64(id);

  const token = jwt.sign({ id: idHas }, config_auth.secretKey, {
    expiresIn: config_auth.expiresInWeb,
  });

  return token;
};

export const createTokenApp = async ({ id }) => {
  const idHas = setBase64(id);

  const token = jwt.sign({ id: idHas }, config_auth.secretKey, {
    expiresIn: config_auth.expiresInApp,
  });

  return token;
};

export const checkToken = async ({
  access_token,
  onTokenExpiration = "logout",
  models,
}) => {
  try {
    const result = {};

    const tokenVerify = await jwt.verify(
      access_token,
      config_auth.secretKey,
      async (err, decode) => {
        if (err) {
          if (onTokenExpiration === "logout") {
            throw new Error("session_expired");
          } else {
            const oldTokenDecoded = jwt.decode(access_token, {
              complete: true,
            });
            const { id: userIdB64 } = oldTokenDecoded.payload;

            const userId = getBase64(userIdB64);

            const user = await models.User.findByPk(userId, {
              include: [
                {
                  model: models.Responsible,
                  as: "Responsible",
                },
                {
                  model: models.Employee,
                  as: "Employee",
                },
              ],
            });

            if (user.status !== "Active") {
              throw new Error("account_inactive");
            }

            const idHas = setBase64(id);

            const accessToken = jwt.sign({ id: idHas }, config_auth.secretKey, {
              expiresIn: config_auth.expiresInWeb,
            });

            result.user = user;
            result.token = accessToken;
          }
        } else {
          const { id: userIdB64 } = decode;

          const userId = getBase64(userIdB64);

          const user = await models.User.findByPk(userId, {
            include: [
              {
                model: models.Responsible,
                as: "Responsible",
              },
              {
                model: models.Employee,
                as: "Employee",
              },
            ],
          });

          if (user.status !== "Active") {
            throw new Error("account_inactive");
          }

          const idHas = setBase64(user.id);

          const accessToken = jwt.sign({ id: idHas }, config_auth.secretKey, {
            expiresIn: config_auth.expiresInWeb,
          });

          result.user = user;
          result.token = accessToken;
        }
      }
    );
    console.log(tokenVerify);
    return result;
  } catch (e) {
    throw new Error("invalid_token");
  }
};

export const doLoginProvider = async (
  { email, password, systemConnect },
  models
) => {
  const user = await models.User.findOne({
    where: { email, typeUser: "Provider" },
    include: {
      model: models.Provider,
      as: "Provider",
      include: [
        {
          model: models.ProviderResponsible,
          as: "ProviderResponsible",
        },
        {
          model: models.ProviderPersonal,
          as: "ProviderPersonal",
        },
        {
          model: models.CategoryCompany,
          as: "CategoryCompany",
        },
      ],
    },
  });
  if (!user) {
    throw new Error("wrong_username_password");
  }

  const passwordMatch = isPasswordMatch(encrypt(password), user.password);
  const isActive = user.status === "Active";

  if (!passwordMatch || !isActive) {
    throw new Error("wrong_username_password");
  }
  let token = "";
  if (systemConnect === "App") {
    token = createTokenApp({ id: user.id });
  } else {
    token = createTokenWeb({ id: user.id });
  }
  return { user, token };
};

export const doLoginEmployee = async (
  { email, password, systemConnect },
  models
) => {
  const user = await models.User.findOne({
    where: { email, typeUser: "Employee" },
    include: {
      model: models.Employee,
      as: "Employee",
    },
  });
  if (!user) {
    throw new Error("wrong_username_password");
  }

  const passwordMatch = isPasswordMatch(encrypt(password), user.password);
  const isActive = user.status === "Active";

  if (!passwordMatch || !isActive) {
    throw new Error("wrong_username_password");
  }
  let token = "";
  if (systemConnect === "App") {
    token = createTokenApp({ id: user.id });
  } else {
    token = createTokenWeb({ id: user.id });
  }
  return { user, token };
};

export const doLoginResponsible = async (
  { email, password, systemConnect },
  models
) => {
  const user = await models.User.findOne({
    where: { email, typeUser: "Responsible" },
    include: {
      model: models.Responsible,
      as: "Responsible",
    },
  });
  console.log(user);
  if (!user) {
    throw new Error("wrong_username_password");
  }

  const passwordMatch = isPasswordMatch(encrypt(password), user.password);
  const isActive = user.status === "Active";

  if (!passwordMatch || !isActive) {
    throw new Error("wrong_username_password");
  }
  let token = "";
  if (systemConnect === "App") {
    token = createTokenApp({ id: user.id });
  } else {
    token = createTokenWeb({ id: user.id });
  }
  return { user, token };
};
