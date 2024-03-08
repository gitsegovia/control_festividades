import { Model, UUID, UUIDV4, STRING, BOOLEAN } from "sequelize";

export default (sequelize) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Activity, {
        foreignKey: {
          name: "categoryId",
          field: "categoryId",
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
      active: {
        allowNull: false,
        type: BOOLEAN,
        defaultValue: true,
      },
      code: {
        allowNull: false,
        type: STRING,
        defaultValue: "CD-0000"
      }
    },
    {
      sequelize,
      modelName: "Category",
    }
  );

  return Category;
};
