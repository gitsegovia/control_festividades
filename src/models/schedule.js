import { BOOLEAN, INTEGER, Model, STRING, UUID, UUIDV4 } from "sequelize";

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
      serial: {
        allowNull: false,
        type: INTEGER,
        defaultValue: 0
      }
    },
    {
      sequelize,
      modelName: "Schedule",
    }
  );

  return Schedule;
};
