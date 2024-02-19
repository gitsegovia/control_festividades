import { checkToken, doLoginProvider, doLoginEmployee } from "../../utils/auth";
import { AuthenticationError } from "../../utils/graphqlError";

export default {
  Query: {
    dataEmployeeByUserId: async (_, { userId }, { models }) => {
      const user = await models.User.findByPk(userId, {
        include: [
          {
            model: models.Provider,
            as: "Provider",
            include: [
              {
                model: models.ProviderPersonal,
                as: "ProviderPersonal",
              },
              {
                model: models.ProviderResponsible,
                as: "ProviderResponsible",
              },
              {
                model: models.CategoryCompany,
                as: "CategoryCompany",
              },
            ],
          },
        ],
      });

      if (user) {
        return user;
      }
      throw new Error("User not found");
    },
  },
  Mutation: {
    me: (_, { token, onTokenExpiration }, { models }) => {
      try {
        return checkToken({
          access_token: token,
          onTokenExpiration,
          models,
        });
      } catch (error) {
        throw AuthenticationError(error);
      }
    },
    loginEmployee: (_, { input }, { models }) => {
      const { email, password, systemConnect } = input;
      try {
        const result = doLoginEmployee(
          { email, password, systemConnect },
          models
        );

        return result;
      } catch (error) {
        throw AuthenticationError(error);
      }
    },
  },
};
