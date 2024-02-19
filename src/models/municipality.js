import { Model, UUID, UUIDV4, INTEGER, STRING } from "sequelize";

export default (sequelize) => {
  class Municipality extends Model {
    static associate(models) {
      // Rest of the associations...
      Municipality.belongsTo(models.State, {
        foreignKey: {
          name: "stateId",
          field: "stateId",
        },
        as: "State",
      });
      Municipality.hasMany(models.Parish, {
        foreignKey: {
          name: "municipalityId",
          field: "municipalityId",
        },
        as: "Parish",
      });
    }
  }

  Municipality.init(
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
      modelName: "Municipality",
    }
  );

  return Municipality;
};
