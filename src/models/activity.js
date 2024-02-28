import { Model, UUID, UUIDV4, STRING, BOOLEAN } from "sequelize";

export default (sequelize) => {
  class Activity extends Model {
    static associate(models) {
      Activity.belongsTo(models.Category, {
        foreignKey: {
          name: "categoryId",
          field: "categoryId",
        },
        as: "Category",
      });
      Activity.hasMany(models.Summary, {
        foreignKey: {
          name: "activityId",
          field: "activityId",
        },
        as: "Summary",
      });
    }
  }

  Activity.init(
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
      modelName: "Activity",
    }
  );

  return Activity;
};
