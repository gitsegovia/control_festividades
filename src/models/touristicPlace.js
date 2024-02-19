import { Model, UUID, UUIDV4, STRING } from "sequelize";

export default (sequelize) => {
  class TouristicPlace extends Model {
    static associate(models) {
      // Rest of the associations...
      TouristicPlace.belongsTo(models.Parish, {
        foreignKey: {
          name: "parishId",
          field: "parishId",
        },
        as: "Parish",
      });
    }
  }

  TouristicPlace.init(
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
    },
    {
      sequelize,
      modelName: "TouristicPlace",
    }
  );

  return TouristicPlace;
};
