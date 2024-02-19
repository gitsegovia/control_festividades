import { Model, UUID, UUIDV4, STRING } from "sequelize";

export default (sequelize) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Activity, {
        foreignKey: {
          name: "activityId",
          field: "activityId",
        },
        as: "Activity",
      });
    }
  }

  Category.init(
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
      modelName: "Category",
    }
  );

  return Category;
};
