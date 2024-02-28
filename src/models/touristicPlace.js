import { Model, STRING, UUID, UUIDV4 } from "sequelize";

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
      TouristicPlace.belongsToMany(models.Responsible, {
        through: models.ResponsibleTouristic,
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
