import { Model, UUID, UUIDV4, BOOLEAN, DATEONLY, STRING } from "sequelize";

export default (sequelize) => {
  class SummaryPublicEntity extends Model {
    static associate(models) {
      SummaryPublicEntity.belongsTo(models.PublicEntity, {
        foreignKey: {
          name: "publicEntityId",
          field: "publicEntityId",
        },
        as: "PublicEntity",
      });
      SummaryPublicEntity.belongsTo(models.Event, {
        foreignKey: {
          name: "eventId",
          field: "eventId",
        },
        as: "Event",
      });
      SummaryPublicEntity.belongsTo(models.Schedule, {
        foreignKey: {
          name: "scheduleId",
          field: "scheduleId",
        },
        as: "Schedule",
      });
      SummaryPublicEntity.belongsTo(models.TouristicPlace, {
        foreignKey: {
          name: "touristicPlaceId",
          field: "touristicPlaceId",
        },
        as: "TouristicPlace",
      });
    }
  }

  SummaryPublicEntity.init(
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: UUID,
        defaultValue: UUIDV4,
      },
      attended: {
        allowNull: false,
        type: BOOLEAN,
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
      modelName: "SummaryPublicEntity",
    }
  );

  return SummaryPublicEntity;
};
