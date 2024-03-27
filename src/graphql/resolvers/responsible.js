import { Op } from "sequelize";
import { encrypt } from "../../utils/security";

export default {
  Query: {
    responsibleListAll: async (_, { search }, { models }) => {
      const options = search?.options ?? null;
      //PRIORITARIO arreglar consulta para que busque las options y filter y segun eso haga las busquedas
      const optionsFind = {
        include: [
          {
            model: models.User,
            as: "User",
          },
          "TouristicPlaces",
        ],
      };
      /*{
        include: [
          {
            model: models.User,
            as: "User",
          },
          "TouristicPlaces",
        ],
      };*/

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

      const responsible = await models.Responsible.findAll(optionsFind);

      const infoPage = {
        count: responsible.length,
        pages: 1,
        current: 1,
        next: false,
        prev: false,
      };

      return {
        infoPage,
        results: responsible,
      };
    },
  },
  Mutation: {
    createResponsible: async (_, { input }, { models }) => {
      const {
        responsibleId = null,
        touristicPlaceId,
        dni,
        name,
        phone,
        email,
        password,
      } = input;

      if (responsibleId===null) {
        const countUser = await models.User.count({
          where: {
            email,
            typeUser: "Responsible",
          },
        });
        if (countUser > 0) {
          throw new Error("User already exists");
        }
        const countResp = await models.Responsible.count({
          where: {
            dni,
          },
        });
        if (countResp > 0) {
          throw new Error("Responsible already exists");
        }

        try {
          const result = await models.sequelizeInst.transaction(async (t) => {
            const inpUser = {
              email,
              phone: "000000",
              password,
              typeUser: "Responsible",
              nameUser: email,
            };

            const inpResponsible = {
              dni,
              name,
              phone,
              User: inpUser,
            };

            const userResp = await models.Responsible.create(
              {
                ...inpResponsible,
              },
              {
                include: {
                  model: models.User,
                  as: "User",
                },
                transaction: t,
              }
            );

            if (touristicPlaceId && touristicPlaceId.length > 0) {
              userResp.setTouristicPlaces(touristicPlaceId);
            }

            return userResp;
          });

          return result;
        } catch (error) {
          // PRIORITARIO Create error manager to handle internal messages or retries or others
          console.log(error);
          throw new Error("error");
        }
      } else {
        const countUser = await models.User.count({
          where: {
            email,
            typeUser: "Responsible",
            responsibleId: {
              [Op.not]: responsibleId,
            },
          },
        });
        if (countUser > 0) {
          throw new Error("User already exists");
        }
        const findResp = await models.Responsible.findOne({
          where: {
            id: responsibleId,
          },
          include: [
            {
              model: models.User,
              as: "User",
            },
            "TouristicPlaces",
          ],
        });

        if (!findResp) {
          throw new Error("Not find responsible");
        }

        if (dni && dni !== findResp.dni) {
          const countResp = await models.Responsible.count({
            where: {
              dni,
            },
          });
          if (countResp > 0) {
            throw new Error("Responsible already exists");
          }
        }

        try {
          const result = await models.sequelizeInst.transaction(async (t) => {
            if (dni) {
              findResp.dni = dni;
            }
            if (name) {
              findResp.name = name;
            }
            if (phone) {
              findResp.phone = phone;
            }
            if (email || password) {
              if (email) {
                findResp.User.email = email;
              }
              if (password) {
                findResp.User.password = encrypt(password);
              }
              await findResp.User.save({ transaction: t });
            }

            if (touristicPlaceId) {
              if (touristicPlaceId.length > 0) {
                await findResp.setTouristicPlaces(touristicPlaceId, {
                  transaction: t,
                });
              } else {
                await findResp.removeTouristicPlaces(touristicPlaceId, {
                  transaction: t,
                });
              }
            }
            await findResp.save({ transaction: t });
            return findResp;
          });

          return result;
        } catch (error) {
          // PRIORITARIO Create error manager to handle internal messages or retries or others
          console.log(error);
          throw new Error("error");
        }
      }
    },
    addTouristicPlaceToResponsible: async (_, { input }, { models }) => {
      const { responsibleId, touristicPlaceId } = input;

      const findResponsible = await models.Responsible.findByPk(responsibleId);

      if (!findResponsible) {
        throw new Error("Responsible not found");
      }
      try {
        const result = await models.sequelizeInst.transaction(async (t) => {
          await findResponsible.addTouristicPlaces(touristicPlaceId, {
            transaction: t,
          });

          return true;
        });

        return result;
      } catch (error) {
        // PRIORITARIO Create error manager to handle internal messages or retries or others
        console.log(error);
        throw new Error("error");
      }
    },
    setTouristicPlaceToResponsible: async (_, { input }, { models }) => {
      const { responsibleId, touristicPlaceId } = input;

      const findResponsible = await models.Responsible.findByPk(responsibleId);

      if (!findResponsible) {
        throw new Error("Responsible not found");
      }

      try {
        const result = await models.sequelizeInst.transaction(async (t) => {
          await findResponsible.setTouristicPlaces(touristicPlaceId, {
            transaction: t,
          });

          return true;
        });

        return result;
      } catch (error) {
        // PRIORITARIO Create error manager to handle internal messages or retries or others
        console.log(error);
        throw new Error("error");
      }
    },
    removeTouristicPlaceToResponsible: async (_, { input }, { models }) => {
      const { responsibleId, touristicPlaceId } = input;

      const findResponsible = await models.Responsible.findByPk(responsibleId);

      if (!findResponsible) {
        throw new Error("Responsible not found");
      }
      try {
        const result = await models.sequelizeInst.transaction(async (t) => {
          await findResponsible.removeTouristicPlaces(touristicPlaceId, {
            transaction: t,
          });

          return true;
        });

        return result;
      } catch (error) {
        // PRIORITARIO Create error manager to handle internal messages or retries or others
        console.log(error);
        throw new Error("error");
      }
    },
    setPermissionResponsible: async (_, { input }, { models }) => {
      const { responsibleId, permission } = input;

      const findResponsible = await models.Responsible.findByPk(responsibleId);

      if (!findResponsible) {
        throw new Error("Responsible not found");
      }
      try {
        const result = await models.sequelizeInst.transaction(async (t) => {
          findResponsible.permission = permission;
          await findResponsible.save({
            transaction: t,
          });

          return findResponsible;
        });

        return result;
      } catch (error) {
        // PRIORITARIO Create error manager to handle internal messages or retries or others
        console.log(error);
        throw new Error("error");
      }
    },
  },
};
