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

            if (active === true) {
              await models.Toll.update(
                { active: false },
                {
                  transaction: t,
                }
              );
            }

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

            if (active === true) {
              await models.Toll.update(
                { active: false },
                {
                  transaction: t,
                }
              );
            }

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
          await models.Toll.update(
            { active: false },
            {
              where: {
                active: true,
              },
              transaction: t,
            }
          );

          tollExist.active = true;
          tollExist.save();

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
          await tollExist.save();

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
