import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize.js";

export class Team extends Model {}

Team.init(
  {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100] 
      }
    },
    description: {
        type: DataTypes.TEXT,
        validate: {
          len: [2, 255] 
        }
    }
  },
  {
    sequelize,
    modelName: 'Team',
    tableName: "team"
  },
);