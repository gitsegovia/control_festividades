import { Model, UUID, UUIDV4, STRING, INTEGER, BOOLEAN } from "sequelize";

export default (sequelize) => {
  class Event extends Model {
    static associate(models) {
      Event.hasMany(models.Summary, {
        foreignKey: {
          name: "eventId",
          field: "eventId",
        },
        as: "Summary",
      });
    }
  }

  Event.init(
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: UUID,
        defaultValue: UUIDV4,
      },
      name: {
        allowNull: false,
        type: STRING,
      },
      year: {
        allowNull: false,
        type: INTEGER,
      },
      countSummary: {
        allowNull: false,
        type: INTEGER,
        defaultValue: 0,
      },
      active: {
        allowNull: false,
        type: BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Event",
    }
  );

  return Event;
};
