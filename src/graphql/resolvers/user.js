import {
  checkToken,
  doLoginResponsible,
  doLoginEmployee,
} from "../../utils/auth";
import { AuthenticationError } from "../../utils/graphqlError";

export default {
  Query: {
    getUsersAll: async (_, { search }, { models }) => {
      const options = search?.options ?? null;
      //PRIORITARIO arreglar consulta para que busque las options y filter y segun eso haga las busquedas
      const optionsFind = {
        include: [
          {
            model: models.Employee,
            as: "Employee",
          },
          {
            model: models.Responsible,
            as: "Responsible",
          },
        ],
      };

      if (options !== null) {
        if (options.limit > 0) {
          optionsFind.limit = options.limit;
        }
        if (options.offset > 0) {
          optionsFind.offset = options.offset;
        }
        if (options.orderBy) {
          optionsFind.order = options.orderBy.map((field, index) => {
            return [
              field,
              options.direction ? options.direction[index] ?? "ASC" : "ASC",
            ];
          });
          optionsFind.include.order = optionsFind.order;
        }
      }

      const users = await models.User.findAll(optionsFind);

      const infoPage = {
        count: users.length,
        pages: 1,
        current: 1,
        next: false,
        prev: false,
      };

      return {
        infoPage,
        results: users,
      };
    },
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
    loginResponsible: (_, { input }, { models }) => {
      const { email, password, systemConnect } = input;
      try {
        console.log("LOGIN");
        const result = doLoginResponsible(
          { email, password, systemConnect },
          models
        );

        return result;
      } catch (error) {
        throw AuthenticationError(error);
      }
    },
    createUserResponsible: async (_, { input }, { models }) => {
      const { email, password, responsibleId } = input;

      const count = await models.User.count({
        where: {
          email,
          typeUser: "Responsible",
        },
      });
      if (count > 0) {
        throw new AuthenticationError("User already exists");
      }

      try {
        const result = await models.sequelizeInst.transaction(async (t) => {
          const inpUser = {
            email,
            phone: "000000",
            password,
            typeUser: "Responsible",
            nameUser: email,
            responsibleId,
          };
          const userResp = await models.User.create({
            ...inpUser,
          });

          return userResp;
        });

        return result;
      } catch (error) {
        throw AuthenticationError(error);
      }
    },
    suspendUser: async (_, { userId }, { models }) => {
      const user = await models.User.findByPk(userId);

      if (!user) {
        throw new AuthenticationError("User not found");
      }

      user.status = "Inactive";
      user.save();

      return true;
    },
  },
};
