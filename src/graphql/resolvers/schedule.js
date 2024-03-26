import moment from "moment";
import { Op } from "sequelize";

export default {
    Query: {
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
        scheduleAvailablePerTouristicPlace: async (_, { search }, { models }) => {
            const { touristicPlaceId, toll } = search;;

            const scheduleAll = await models.Schedule.findAll({
                active: true,
            });

            const event = await models.Event.findOne({
                where: {
                    active: true,
                },
            });

            if (!event) {
                throw new Error("Event no active");
            }

            const nowEndOf = moment().endOf("day");
            const nowStartOf = moment().startOf("day");

            const whereCheck = {
                eventId: event.id,
                touristicPlaceId: touristicPlaceId,
                createdAt: {
                    [Op.and]: {
                        [Op.gte]: nowStartOf,
                        [Op.lte]: nowEndOf,
                    },
                },
            };

            const summary = await models.Summary.findAll({
                where: whereCheck,
            });

            const scheduleReport = [];

            summary.forEach((v) => {
                if (!scheduleReport.includes(v.scheduleId)) {
                    scheduleReport.push(v.scheduleId);
                }
            });

            if (toll) {

                const summaryToll = await models.SummaryToll.findAll({
                    where: whereCheck,
                });


                summaryToll.forEach((v) => {
                    if (!scheduleReport.includes(v.scheduleId)) {
                        scheduleReport.push(v.scheduleId);
                    }
                });
            }

            const schedule = [];

            scheduleAll.forEach((s) => {
                if (!scheduleReport.includes(s.id)) {
                    schedule.push(s);
                }
            });

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
    },
    Mutation: {
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
    },
};
