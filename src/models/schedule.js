import { Model, STRING, UUID, UUIDV4, BOOLEAN } from "sequelize";

export default (sequelize) => {
  class Schedule extends Model {
    static associate(models) {
      Schedule.belongsTo(models.Summary, {
        foreignKey: {
          name: "scheduleId",
          field: "scheduleId",
        },
        as: "Summary",
      });
    }
  }

  Schedule.init(
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: UUID,
        defaultValue: UUIDV4,
      },
      hour: {
        allowNull: false,
        type: STRING,
      },
      active: {
        allowNull: false,
        type: BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Schedule",
    }
  );

  return Schedule;
};
