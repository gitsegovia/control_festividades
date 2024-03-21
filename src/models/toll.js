import { Model, UUID, UUIDV4, STRING, BOOLEAN } from "sequelize";

export default (sequelize) => {
  class Toll extends Model {
    static associate(models) {
      Toll.hasMany(models.SummaryToll, {
        foreignKey: {
          name: "tollId",
          field: "tollId",
        },
        as: "SummaryToll",
      });
    }
  }

  Toll.init(
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
      active: {
        allowNull: false,
        type: BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Toll",
    }
  );

  return Toll;
};
