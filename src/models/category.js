import { Model, UUID, UUIDV4, STRING, INTEGER, BOOLEAN } from "sequelize";

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
      numberCat: {
        allowNull: false,
        type: INTEGER,
        defaultValue: 0
      },
      code: {
        allowNull: false,
        type: STRING,
        defaultValue: "CT-0000"
      },
      pc: {
        allowNull: false,
        type: BOOLEAN,
        defaultValue: false,
      },
    },
    {
       hooks: {
        beforeCreate: async (category) => {
          let valor = await Category.findAll({
            attributes: [
              [sequelize.fn("max", sequelize.col("numberCat")), "maxNumber"],
            ],
            raw: true,
          });
          let number = 1;
          if (valor && valor[0].maxNumber != null) {
            number += valor[0].maxNumber;
          }
          category.numberCat = number;
          category.code = `CT-${number}`;
        },
      },
      sequelize,
      modelName: "Category",
    }
  );

  return Category;
};
