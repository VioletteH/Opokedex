import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize.js";

export class Team extends Model {}

Team.init(
  {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
        type: DataTypes.TEXT
    }
  },
  {
    sequelize,
    modelName: 'Team',
    tableName: "team"
  },
);