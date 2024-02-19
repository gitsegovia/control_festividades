import { Model, UUID, UUIDV4, INTEGER, STRING } from "sequelize";

export default (sequelize) => {
  class Parish extends Model {
    static associate(models) {
      // Rest of the associations...
      Parish.belongsTo(models.Municipality, {
        foreignKey: {
          name: "municipalityId",
          field: "municipalityId",
        },
        as: "Municipality",
      });
      Parish.hasMany(models.TouristicPlace, {
        foreignKey: {
          name: "parishId",
          field: "parishId",
        },
        as: "TouristicPlace",
      });
    }
  }

  Parish.init(
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: UUID,
        defaultValue: UUIDV4,
      },
      code: {
        allowNull: true,
        type: INTEGER,
      },
      name: {
        allowNull: false,
        type: STRING,
      },
    },
    {
      sequelize,
      modelName: "Parish",
    }
  );

  return Parish;
};
