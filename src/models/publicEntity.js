import { Model, UUID, UUIDV4, STRING, BOOLEAN } from "sequelize";

export default (sequelize) => {
  class PublicEntity extends Model {
    static associate(models) {
      PublicEntity.hasMany(models.SummaryPublicEntity, {
        foreignKey: {
          name: "publicEntityId",
          field: "publicEntityId",
        },
        as: "SummaryPublicEntity",
      });
    }
  }

  PublicEntity.init(
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
      modelName: "PublicEntity",
    }
  );

  return PublicEntity;
};
