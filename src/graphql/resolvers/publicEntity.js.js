export default {
  Query: {
    publicEntityListAll: async (_, { search }, { models }) => {
      const options = search?.options ?? null;
      //PRIORITARIO arreglar consulta para que busque las options y filter y segun eso haga las busquedas
      const optionsFind = {
        include: [
          {
            model: models.SummaryPublicEntity,
            as: "SummaryPublicEntity",
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

      const publicEntities = await models.PublicEntity.findAll(optionsFind);

      const infoPage = {
        count: publicEntities.length,
        pages: 1,
        current: 1,
        next: false,
        prev: false,
      };

      return {
        infoPage,
        results: publicEntities,
      };
    },
  },
  Mutation: {
    createPublicEntity: async (_, { input }, { models }) => {
      try {
        const { id=null, name, year, active } = input;
        
        let findPublicEntity = null;
        
        if(id!==null){
          findPublicEntity = await models.PublicEntity.findByPk(id);
        }
        console.log(findPublicEntity)
        if (findPublicEntity!==null) {
          console.log("PASO")
          const result = await models.sequelizeInst.transaction(async (t) => {
            const inpPublicEntity = {
              name,
              year,
              active,
            };

            if (active === true) {
              await models.PublicEntity.update(
                { active: false },
                {
                  where: { active: true },
                  transaction: t,
                }
              );
            }

            const publicEntity = await models.PublicEntity.update(
              {
                ...inpPublicEntity,
              },
              {
                where: {
                  id,
                },
                transaction: t,
              }
            );

            return publicEntity;
          });

          return result;
        } else {
          const result = await models.sequelizeInst.transaction(async (t) => {
            const inpPublicEntity = {
              name,
              year,
              active,
            };

            if (active === true) {
              await models.PublicEntity.update(
                { active: false },
                {                  
                  where: { active: true },
                  transaction: t,
                }
              );
            }

            const publicEvent = await models.PublicEntity.create(
              {
                ...inpPublicEntity,
              },
              { transaction: t }
            );

            return publicEvent;
          });

          return result;
        }
      } catch (error) {
        // PRIORITARIO Create error manager to handle internal messages or retries or others
        console.log(error);
        throw new Error("error");
      }
    },
    activatePublicEntity: async (_, { publicEntityId }, { models }) => {
      try {
        const publicEntityExist = await models.PublicEntity.findByPk(
          publicEntityId
        );

        if (!publicEntityExist) {
          throw "Event not found";
        }

        const result = await models.sequelizeInst.transaction(async (t) => {
          await models.PublicEntity.update(
            { active: false },
            {
              where: {
                active: true,
              },
              transaction: t,
            }
          );

          publicEntityExist.active = true;
          publicEntityExist.save();

          return publicEntityExist;
        });

        return result;
      } catch (error) {
        // PRIORITARIO Create error manager to handle internal messages or retries or others
        console.log(error);
        throw new Error(error);
      }
    },
    deactivatePublicEntity: async (_, { publicEntityId }, { models }) => {
      try {
        const publicEntityExist = await models.Event.findByPk(publicEntityId);

        if (!publicEntityExist) {
          throw "Event not found";
        }

        const result = await models.sequelizeInst.transaction(async (t) => {
          publicEntityExist.active = false;
          await publicEntityExist.save();

          return publicEntityExist;
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
