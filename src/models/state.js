import { Model, UUID, UUIDV4, INTEGER, STRING } from "sequelize";

export default (sequelize) => {
  class State extends Model {
    static associate(models) {
      // Rest of the associations...
      State.hasMany(models.Municipality, {
        foreignKey: {
          name: "stateId",
          field: "stateId",
        },
        as: "Municipality",
      });
    }
  }

  State.init(
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
      iso: {
        allowNull: true,
        type: STRING,
      },
    },
    {
      sequelize,
      modelName: "State",
    }
  );

  return State;
};
