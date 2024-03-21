import moment from "moment";
import { Op } from "sequelize";

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
    publicEntityReport: async (_, { search }, { models }) => {
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

      const entities = await models.PublicEntity.findAll({
        where: {
          active: true,
        },
        include: {
          model: models.SummaryPublicEntity,
          as: "SummaryPublicEntity",
          include: {
            model: models.Schedule,
            as: "Schedule",
          },
          where: {
            eventId: eventActiveId,
            createdAt: {
              [Op.gte]: dayStartOf,
            },
            createdAt: {
              [Op.lte]: dayEndOf,
            },
          },
        },
      });

      return entities;
    },
  },
  Mutation: {
    createPublicEntity: async (_, { input }, { models }) => {
      try {
        const { id = null, name, year, active } = input;

        let findPublicEntity = null;

        if (id !== null) {
          findPublicEntity = await models.PublicEntity.findByPk(id);
        }

        if (findPublicEntity !== null) {
          const result = await models.sequelizeInst.transaction(async (t) => {
            const inpPublicEntity = {
              name,
              year,
              active,
            };

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
          publicEntityExist.active = true;
          await publicEntityExist.save({
            transaction: t,
          });

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
          await publicEntityExist.save({
            transaction: t,
          });

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
