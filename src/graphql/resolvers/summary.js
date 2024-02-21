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
  },
  Mutation: {
    createSummary: async (_, { input }, { models }) => {
      try {
        const { eventId, scheduleId, touristicPlaceId, listSummary } = input;

        if (!listSummary && listSummary.length === 0) {
          throw new Error("quantity invalid");
        }

        const result = await models.sequelizeInst.transaction(async (t) => {
          const inpSummary = listSummary.map((v) => {
            return {
              eventId,
              scheduleId,
              touristicPlaceId,
              quantity: v.quantity,
              activityId: v.activityId,
            };
          });

          const activity = await models.Summary.createBulk(inpSummary, {
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
  },
};
