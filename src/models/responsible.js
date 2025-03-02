import { Model, UUID, UUIDV4, STRING, BOOLEAN  } from "sequelize";

export default (sequelize) => {
  class Responsible extends Model {
    static associate(models) {
      // Rest of the associations...
      Responsible.belongsToMany(models.TouristicPlace, {
        through: models.ResponsibleTouristic,
      });
      Responsible.hasOne(models.User, {
        foreignKey: {
          name: "responsibleId",
          field: "responsibleId",
        },
        as: "User",
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
      dni: {
        allowNull: false,
        type: STRING,
        defaultValue: "0000000",
      },
      name: {
        allowNull: false,
        type: STRING,
      },
      phone: {
        allowNull: false,
        type: STRING,
      },
      permission: {
        allowNull: false,
        type: STRING,
        defaultValue: ""
      },
      main: {
        allowNull: false,
        type: BOOLEAN,
        defaultValue: false,
      }
    },
    {
      sequelize,
      modelName: "Responsible",
    }
  );

  return Responsible;
};
