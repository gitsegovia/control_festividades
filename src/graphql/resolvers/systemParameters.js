export default {
  Query: {
    stateListAll: async (_, { search }, { models }) => {
      const options = search?.options ?? null;

      const optionsFind = {
        include: [
          {
            model: models.Municipality,
            as: "Municipality",
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

      const states = await models.State.findAll(optionsFind);

      const infoPage = {
        count: states.length,
        pages: 1,
        current: 1,
        next: false,
        prev: false,
      };

      return {
        infoPage,
        results: states,
      };
    },
    municipalityListAll: async (_, { search }, { models }) => {
      const options = search?.options ?? null;
      const stateId = search?.stateId ?? undefined;
      const optionsFind = {
        include: [
          {
            model: models.Parish,
            as: "Parish",
          },
        ],
      };

      if (stateId) {
        optionsFind.where = {
          stateId,
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

      const municipalities = await models.Municipality.findAll(optionsFind);

      const infoPage = {
        count: municipalities.length,
        pages: 1,
        current: 1,
        next: false,
        prev: false,
      };

      return {
        infoPage,
        results: municipalities,
      };
    },
    parishListAll: async (_, { search }, { models }) => {
      const options = search?.options ?? null;
      const municipalityId = search?.municipalityId ?? undefined;

      const optionsFind = {
        include: [
          {
            model: models.TouristicPlace,
            as: "TouristicPlace",
          },
        ],
      };

      if (municipalityId) {
        optionsFind.where = {
          municipalityId,
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

      const parish = await models.Parish.findAll(optionsFind);

      const infoPage = {
        count: parish.length,
        pages: 1,
        current: 1,
        next: false,
        prev: false,
      };

      return {
        infoPage,
        results: parish,
      };
    },
    touristicPlaceListAll: async (_, { search }, { models }) => {
      const options = search?.options ?? null;
      const parishId = search?.parishId ?? undefined;

      const optionsFind = {
        include: [
          {
            model: models.Responsible,
            as: "Responsible",
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
    responsibleListAll: async (_, { search }, { models }) => {
      const options = search?.options ?? null;
      //PRIORITARIO arreglar consulta para que busque las options y filter y segun eso haga las busquedas
      const optionsFind = {
        include: [
          {
            model: models.TouristicPlace,
            as: "TouristicPlace",
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
    scheduleListAll: async (_, { search }, { models }) => {
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

      const schedule = await models.Schedule.findAll(optionsFind);

      const infoPage = {
        count: schedule.length,
        pages: 1,
        current: 1,
        next: false,
        prev: false,
      };

      return {
        infoPage,
        results: schedule,
      };
    },
    categoryListAll: async (_, { search }, { models }) => {
      const options = search?.options ?? null;
      //PRIORITARIO arreglar consulta para que busque las options y filter y segun eso haga las busquedas
      const optionsFind = {
        include: [
          {
            model: models.Activity,
            as: "Activity",
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

      const categories = await models.Category.findAll(optionsFind);

      const infoPage = {
        count: categories.length,
        pages: 1,
        current: 1,
        next: false,
        prev: false,
      };

      return {
        infoPage,
        results: categories,
      };
    },
    activityListAll: async (_, { search }, { models }) => {
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

      const activities = await models.Activity.findAll(optionsFind);

      const infoPage = {
        count: activities.length,
        pages: 1,
        current: 1,
        next: false,
        prev: false,
      };

      return {
        infoPage,
        results: activities,
      };
    },
  },
  Mutation: {
    createState: async (_, { input }, { models }) => {
      try {
        const { name, code, iso } = input;

        const result = await models.sequelizeInst.transaction(async (t) => {
          const inpState = {
            name,
          };

          if (code) inpState.code = code;
          if (iso) inpState.iso = iso;

          const state = await models.State.create(
            {
              ...inpState,
            },
            { transaction: t }
          );

          return state;
        });

        return result;
      } catch (error) {
        // PRIORITARIO Create error manager to handle internal messages or retries or others
        console.log(error);
        throw new Error("error");
      }
    },
    createMunicipality: async (_, { input }, { models }) => {
      try {
        const { stateId, name, code } = input;

        const result = await models.sequelizeInst.transaction(async (t) => {
          const inpMunicipality = {
            stateId,
            name,
          };

          if (code) inpMunicipality.code = code;

          const municipality = await models.Municipality.create(
            {
              ...inpMunicipality,
            },
            { transaction: t }
          );

          return municipality;
        });

        return result;
      } catch (error) {
        // PRIORITARIO Create error manager to handle internal messages or retries or others
        console.log(error);
        throw new Error("error");
      }
    },
    createParish: async (_, { input }, { models }) => {
      try {
        const { municipalityId, name, code } = input;

        const result = await models.sequelizeInst.transaction(async (t) => {
          const inpParish = {
            municipalityId,
            name,
          };

          if (code) inpParish.code = code;

          const parish = await models.Parish.create(
            {
              ...inpParish,
            },
            { transaction: t }
          );

          return parish;
        });

        return result;
      } catch (error) {
        // PRIORITARIO Create error manager to handle internal messages or retries or others
        console.log(error);
        throw new Error("error");
      }
    },
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
    createResponsible: async (_, { input }, { models }) => {
      try {
        const { touristicPlaceId, name, phone } = input;

        const result = await models.sequelizeInst.transaction(async (t) => {
          const inpResponsible = {
            touristicPlaceId,
            name,
            phone,
          };

          const responsible = await models.Responsible.create(
            {
              ...inpResponsible,
            },
            { transaction: t }
          );

          return responsible;
        });

        return result;
      } catch (error) {
        // PRIORITARIO Create error manager to handle internal messages or retries or others
        console.log(error);
        throw new Error("error");
      }
    },
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
          eventExist.save();

          return eventExist;
        });

        return result;
      } catch (error) {
        // PRIORITARIO Create error manager to handle internal messages or retries or others
        console.log(error);
        throw new Error(error);
      }
    },
    createSchedule: async (_, { input }, { models }) => {
      try {
        const { hour } = input;

        const result = await models.sequelizeInst.transaction(async (t) => {
          const inpSchedule = {
            hour,
          };

          const event = await models.Schedule.create(
            {
              ...inpSchedule,
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
    createCategory: async (_, { input }, { models }) => {
      try {
        const { name } = input;

        const result = await models.sequelizeInst.transaction(async (t) => {
          const inpCategory = {
            name,
          };

          const category = await models.Category.create(
            {
              ...inpCategory,
            },
            { transaction: t }
          );

          return category;
        });

        return result;
      } catch (error) {
        // PRIORITARIO Create error manager to handle internal messages or retries or others
        console.log(error);
        throw new Error("error");
      }
    },
    createActivity: async (_, { input }, { models }) => {
      try {
        const { categoryId, name } = input;

        const result = await models.sequelizeInst.transaction(async (t) => {
          const inpActivity = {
            categoryId,
            name,
          };

          const activity = await models.Activity.create(
            {
              ...inpActivity,
            },
            { transaction: t }
          );

          return activity;
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
