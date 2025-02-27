import { Model, UUID, UUIDV4, INTEGER, DATEONLY } from "sequelize";

export default (sequelize) => {
  class SummaryToll extends Model {
    static associate(models) {
      SummaryToll.belongsTo(models.Toll, {
        foreignKey: {
          name: "tollId",
          field: "tollId",
        },
        as: "Toll",
      });
      SummaryToll.belongsTo(models.Event, {
        foreignKey: {
          name: "eventId",
          field: "eventId",
        },
        as: "Event",
      });
      SummaryToll.belongsTo(models.Schedule, {
        foreignKey: {
          name: "scheduleId",
          field: "scheduleId",
        },
        as: "Schedule",
      });
      SummaryToll.belongsTo(models.TouristicPlace, {
        foreignKey: {
          name: "touristicPlaceId",
          field: "touristicPlaceId",
        },
        as: "TouristicPlace",
      });
    }
  }

  SummaryToll.init(
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: UUID,
        defaultValue: UUIDV4,
      },
      incoming: {
        allowNull: false,
        type: INTEGER,
      },
      outgoing: {
        allowNull: false,
        type: INTEGER,
      },
      dateRegister: {
        allowNull: true,
        type: DATEONLY,
      },
      codeReport: {
        allowNull: true,
        type: STRING,
      },
    },
    {
      sequelize,
      modelName: "SummaryToll",
    }
  );

  return SummaryToll;
};
