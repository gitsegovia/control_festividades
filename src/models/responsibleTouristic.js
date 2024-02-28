import { Model } from "sequelize";

const createModel = (sequelize) => {
  class ResponsibleTouristic extends Model {
    static associate(models) {
      //relations
    }
  }

  ResponsibleTouristic.init(
    {},
    {
      sequelize,
      modelName: "ResponsibleTouristic",
      timestamps: false,
    }
  );

  return ResponsibleTouristic;
};

export default createModel;
