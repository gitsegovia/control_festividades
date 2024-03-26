export default {
  Query: {
    eventListAll: async (_, { search }, { models }) => {
      const options = search?.options ?? null;
      //PRIORITARIO arreglar consulta para que busque las options y filter y segun eso haga las busquedas
      const optionsFind = {
        include: [
          {
            model: models.Summary,
            as: "Summary",
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

      const events = await models.Event.findAll(optionsFind);

      const infoPage = {
        count: events.length,
        pages: 1,
        current: 1,
        next: false,
        prev: false,
      };

      return {
        infoPage,
        results: events,
      };
    },
    eventActive: async (_, _arg, { models }) => {
      const event = await models.Event.findOne({
        where: {
          active: true,
        },
      });

      if (!event) {
        throw new Error("Event no active");
      }

      return event;
    },
  },
  Mutation: {
    createEvent: async (_, { input }, { models }) => {
      try {
        const { name, year, active } = input;

        const result = await models.sequelizeInst.transaction(async (t) => {
          const inpEvent = {
            name,
            year,
            active,
          };

          if (active === true) {
            await models.Event.update(
              { active: false },
              {
                where: {
                  active: true
                },
                transaction: t,
              }
            );
          }

          const event = await models.Event.create(
            {
              ...inpEvent,
            },
            { transaction: t }
          );

          return event;
        });

        return result;
      } catch (error) {
        // PRIORITARIO Create error manager to handle internal messages or retries or others
        console.log(error);
        throw new Error("error");
      }
    },
    activateEvent: async (_, { eventId }, { models }) => {
      try {
        const eventExist = await models.Event.findByPk(eventId);

        if (!eventExist) {
          throw "Event not found";
        }

        const result = await models.sequelizeInst.transaction(async (t) => {
          await models.Event.update(
            { active: false },
            {
              where: {
                active: true,
              },
              transaction: t,
            }
          );

          eventExist.active = true;
          await eventExist.save({
            transaction: t,
          });

          return eventExist;
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
