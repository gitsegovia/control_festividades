import moment from "moment";
import { Op } from "sequelize";

export default {
  Query: {
    touristicPlaceListAll: async (_, { search }, { models }) => {
      const options = search?.options ?? null;
      const parishId = search?.parishId ?? undefined;

      const optionsFind = {
        include: [
          {
            model: models.Responsible,
            as: "Responsibles",
          },
        ],
      };

      if (parishId) {
        optionsFind.where = {
          parishId,
        };
      }

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

      const touristicPlace = await models.TouristicPlace.findAll(optionsFind);

      const infoPage = {
        count: touristicPlace.length,
        pages: 1,
        current: 1,
        next: false,
        prev: false,
      };

      return {
        infoPage,
        results: touristicPlace,
      };
    },
    touristicPlaceReport: async (_, { search }, { models }) => {
      const options = search?.options ?? null;
      const eventId = search?.eventId ?? undefined;
      const day = search?.day ?? undefined;
      const pc = search?.pc ?? undefined;

      const dayEndOf = moment(day).endOf("day");
      const dayStartOf = moment(day).startOf("day");

      const listTouristicPlace = [];

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

      const touristicPlace = await models.TouristicPlace.findAll({
        include: {
          model: models.Responsible,
          as: "Responsibles",
        },
      });

      /*const categories = await models.Category.findAll();

      const summaries = await models.Summary.findAll({
        where: {
          eventId: eventActiveId,
          createdAt: {
            [Op.gte]: nowStartOf,
          },
          createdAt: {
            [Op.lte]: nowEndOf,
          },
        },
        include: [
          {
            model: models.Activity,
            as: "Activity",
            include: {
              model: models.Category,
              as: "Category",
            },
          },
          {
            model: models.Schedule,
            as: "Schedule"
          },
        ],
      });*/

      for (const place of touristicPlace) {
        const categories = await models.Category.findAll({
          where: {
            active: true,
            pc: pc ?? false,
          },
          include: {
            model: models.Activity,
            as: "Activity",
            include: {
              model: models.Summary,
              as: "Summary",
              include: {
                model: models.Schedule,
                as: "Schedule",
              },
              where: {
                touristicPlaceId: place.id,
                eventId: eventActiveId,
                dateRegister: {
                  [Op.and]: {
                    [Op.gte]: dayStartOf,
                    [Op.lte]: dayEndOf,
                  },
                },
              },
            },
          },
        });

        listTouristicPlace.push({
          id: place.id,
          name: place.name,
          Responsibles: place.Responsibles,
          Category: categories,
        });
      }

      return listTouristicPlace;
    },
  },
  Mutation: {
    createTouristicPlace: async (_, { input }, { models }) => {
      try {
        const { parishId, name } = input;

        const result = await models.sequelizeInst.transaction(async (t) => {
          const inpTouristicPlace = {
            parishId,
            name,
          };

          const touristicPlace = await models.TouristicPlace.create(
            {
              ...inpTouristicPlace,
            },
            { transaction: t }
          );

          return touristicPlace;
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
