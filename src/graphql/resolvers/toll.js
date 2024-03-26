import moment from "moment";
import { Op } from "sequelize";

export default {
  Query: {
    tollListAll: async (_, { search }, { models }) => {
      const options = search?.options ?? null;
      //PRIORITARIO arreglar consulta para que busque las options y filter y segun eso haga las busquedas
      const optionsFind = {
        include: [
          {
            model: models.SummaryToll,
            as: "SummaryToll",
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

      const tolls = await models.Toll.findAll(optionsFind);

      const infoPage = {
        count: tolls.length,
        pages: 1,
        current: 1,
        next: false,
        prev: false,
      };

      return {
        infoPage,
        results: tolls,
      };
    },
    tollReport: async (_, { search }, { models }) => {
      const options = search?.options ?? null;
      const eventId = search?.eventId ?? undefined;
      const day = search?.day ?? undefined;

      const dayEndOf = moment(day).endOf("day");
      const dayStartOf = moment(day).startOf("day");

      let eventActiveId = eventId ?? "";

      if (!eventId) {
        const eventActive = await models.Event.findOne({
          where: {
            active: true,
          },
        });
        if (!eventActive) {
          throw new Error("Not event active");
        }
        eventActiveId = eventActive.id;
      }

      const tolls = await models.Toll.findAll({
        where: {
          active: true,
        },
        include: {
          model: models.SummaryToll,
          as: "SummaryToll",
          include: {
            model: models.Schedule,
            as: "Schedule",
          },
          where: {
            eventId: eventActiveId,
            createdAt: {
              [Op.and]: {
                [Op.gte]: dayStartOf,
                [Op.lte]: dayEndOf,
              },
            },
          },
        },
      });

      return tolls;
    },
  },
  Mutation: {
    createToll: async (_, { input }, { models }) => {
      try {
        const { id, name, year, active } = input;
        const findToll = await models.Toll.findByPk(id);

        if (findToll) {
          const result = await models.sequelizeInst.transaction(async (t) => {
            const inpToll = {
              name,
              year,
              active,
            };

            const toll = await models.Toll.update(
              {
                ...inpToll,
              },
              {
                where: {
                  id,
                },
                transaction: t,
              }
            );

            return toll;
          });

          return result;
        } else {
          const result = await models.sequelizeInst.transaction(async (t) => {
            const inpToll = {
              name,
              year,
              active,
            };

            const toll = await models.Toll.create(
              {
                ...inpToll,
              },
              { transaction: t }
            );

            return toll;
          });

          return result;
        }
      } catch (error) {
        // PRIORITARIO Create error manager to handle internal messages or retries or others
        console.log(error);
        throw new Error("error");
      }
    },
    activateToll: async (_, { tollId }, { models }) => {
      try {
        const tollExist = await models.Toll.findByPk(tollId);

        if (!tollExist) {
          throw "Toll not found";
        }

        const result = await models.sequelizeInst.transaction(async (t) => {
          tollExist.active = true;
          await tollExist.save({
            transaction: t,
          });

          return tollExist;
        });

        return result;
      } catch (error) {
        // PRIORITARIO Create error manager to handle internal messages or retries or others
        console.log(error);
        throw new Error(error);
      }
    },
    deactivateToll: async (_, { tollId }, { models }) => {
      try {
        const tollExist = await models.Toll.findByPk(tollId);

        if (!tollExist) {
          throw "Toll not found";
        }

        const result = await models.sequelizeInst.transaction(async (t) => {
          tollExist.active = false;
          await tollExist.save({
            transaction: t,
          });

          return tollExist;
        });

        return result;
      } catch (error) {
        // PRIORITARIO Create error manager to handle internal messages or retries or others
        console.log(error);
        throw new Error(error);
      }
    },
  },
};
