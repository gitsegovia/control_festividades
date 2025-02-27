import { Model, UUID, UUIDV4, INTEGER, DATEONLY } from "sequelize";

export default (sequelize) => {
  class Summary extends Model {
    static associate(models) {
      Summary.belongsTo(models.Activity, {
        foreignKey: {
          name: "activityId",
          field: "activityId",
        },
        as: "Activity",
      });
      Summary.belongsTo(models.Event, {
        foreignKey: {
          name: "eventId",
          field: "eventId",
        },
        as: "Event",
      });
      Summary.belongsTo(models.Schedule, {
        foreignKey: {
          name: "scheduleId",
          field: "scheduleId",
        },
        as: "Schedule",
      });
      Summary.belongsTo(models.TouristicPlace, {
        foreignKey: {
          name: "touristicPlaceId",
          field: "touristicPlaceId",
        },
        as: "TouristicPlace",
      });
    }
  }

  Summary.init(
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: UUID,
        defaultValue: UUIDV4,
      },
      quantity: {
        allowNull: false,
        type: INTEGER,
      },
      dateRegister: {
        allowNull: true,
        type: DATEONLY
      }
    },
    {
      sequelize,
      modelName: "Summary",
    }
  );

  return Summary;
};
