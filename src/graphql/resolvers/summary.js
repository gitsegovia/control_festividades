import { getNumberFormatedText } from "../../utils/functions";
import sequelize from "sequelize";

export default {
  Query: {
    summaryListAllByEvent: async (_, { search }, { models }) => {
      const { eventId } = search;
      const options = search?.options ?? null;

      const optionsFind = {
        where: {
          eventId: eventId,
        },
        include: [
          {
            model: models.Schedule,
            as: "Schedule",
          },
          {
            model: models.Event,
            as: "Event",
          },
          {
            model: models.Activity,
            as: "Activity",
            include: {
              model: models.Category,
              as: "Category",
            },
          },
          {
            model: models.TouristicPlace,
            as: "TouristicPlace",
            include: {
              model: models.Parish,
              as: "Parish",
              include: {
                model: models.Municipality,
                as: "Municipality",
              },
            },
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

      const summaries = await models.Summary.findAll(optionsFind);

      const infoPage = {
        count: summaries.length,
        pages: 1,
        current: 1,
        next: false,
        prev: false,
      };

      return {
        infoPage,
        results: summaries,
      };
    },
    codeReportListAllByEvent: async (_, { search }, { models }) => {
      const { eventId } = search;
      const options = search?.options ?? null;

      const optionsFind = {
        where: {
          eventId: eventId,
        },
        attributes: [
          [sequelize.fn("DISTINCT", sequelize.col("codeReport")), "codeReport"],
        ],
        distinct: true,
      };

      const reportesDistintos = await models.Summary.findAll({
        where: {
          eventId: eventId,
        },
        attributes: [
          [sequelize.fn("DISTINCT", sequelize.col("codeReport")), "codeReport"],
        ],
        include: [
          {
            model: models.Event,
            as: "Event",
            attributes: ["name"],
          },
          {
            model: models.Schedule,
            as: "Schedule",
            attributes: ["hour"],
          },
        ],
        raw: true,
        group: ["Summary.codeReport", "Event.id", "Schedule.id"],
      });

      console.error("LISTADO DE CODIGOS", reportesDistintos);

      const summaries = await models.Summary.findAll(optionsFind);

      const infoPage = {
        count: summaries.length,
        pages: 1,
        current: 1,
        next: false,
        prev: false,
      };

      return {
        infoPage,
        results: summaries,
      };
    },
  },
  Mutation: {
    createSummary: async (_, { input }, { models }) => {
      try {
        const {
          eventId,
          scheduleId,
          touristicPlaceId,
          dateRegister,
          listSummary,
          listSummaryPublicEntity,
          listSummaryToll,
        } = input;

        const eventExist = await models.Event.findByPk(eventId);

        if (!eventExist) {
          throw "Event not found";
        }

        const registerSummaryCount = `${eventExist.name[0]}${
          eventExist.year
        }-${getNumberFormatedText(eventExist.countSummary + 1)}-${Math.floor(
          Math.random() * 10
        )}`;

        const result = await models.sequelizeInst.transaction(async (t) => {
          if (listSummary && listSummary.length > 0) {
            const inpSummary = listSummary.map((v) => {
              return {
                eventId,
                scheduleId,
                touristicPlaceId,
                quantity: v.quantity,
                dateRegister,
                codeReport: registerSummaryCount,
                activityId: v.activityId,
              };
            });

            const activity = await models.Summary.bulkCreate(inpSummary, {
              transaction: t,
            });
          }

          if (listSummaryPublicEntity && listSummaryPublicEntity.length > 0) {
            const inpSummaryPublicEntity = listSummaryPublicEntity.map((v) => {
              return {
                eventId,
                scheduleId,
                dateRegister,
                codeReport: registerSummaryCount,
                touristicPlaceId,
                attended: v.attended,
                publicEntityId: v.publicEntityId,
              };
            });

            const entity = await models.SummaryPublicEntity.bulkCreate(
              inpSummaryPublicEntity,
              {
                transaction: t,
              }
            );
          }

          if (listSummaryToll && listSummaryToll.length > 0) {
            const inpSummaryToll = listSummaryToll.map((v) => {
              return {
                eventId,
                scheduleId,
                dateRegister,
                codeReport: registerSummaryCount,
                touristicPlaceId,
                incoming: v.incoming,
                outgoing: 0,
                tollId: v.tollId,
              };
            });

            const toll = await models.SummaryToll.bulkCreate(inpSummaryToll, {
              transaction: t,
            });
          }

          eventExist.countSummary = eventExist.countSummary + 1;
          await eventExist.save({
            transaction: t,
          });

          return registerSummaryCount;
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
