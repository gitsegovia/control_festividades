export default {
  Query: {
    summaryTollListAllByEvent: async (_, { search }, { models }) => {
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
            model: models.Toll,
            as: "Toll",
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

      const summaries = await models.SummaryToll.findAll(optionsFind);

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
};
