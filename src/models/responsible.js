import { Model, UUID, UUIDV4, STRING } from "sequelize";

export default (sequelize) => {
  class Responsible extends Model {
    static associate(models) {
      // Rest of the associations...
      Responsible.belongsTo(models.TouristicPlace, {
        foreignKey: {
          name: "touristicPlaceId",
          field: "touristicPlaceId",
        },
        as: "TouristicPlace",
      });
    }
  }

  Responsible.init(
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
      phone: {
        allowNull: false,
        type: STRING,
      },
    },
    {
      sequelize,
      modelName: "Responsible",
    }
  );

  return Responsible;
};
