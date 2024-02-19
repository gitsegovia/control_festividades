import { Model, UUID, UUIDV4, STRING } from "sequelize";

export default (sequelize) => {
  class Schedule extends Model {
    static associate(models) {
      // Rest of the associations...
    }
  }

  Schedule.init(
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: UUID,
        defaultValue: UUIDV4,
      },
      hour: {
        allowNull: false,
        type: STRING,
      },
    },
    {
      sequelize,
      modelName: "Schedule",
    }
  );

  return Schedule;
};
