"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Channels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Channels.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        channel_id:{
            type: DataTypes.UUID,
            allowNull: false,
        },
        created_by: {
            type: DataTypes.STRING
        },
        createdAt: {
            type: DataTypes.DATE,
            field: "created_at",
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: "updated_at",
        },
    },
    {
      sequelize,
      modelName: "Channels",
      tableName: "channels",
      timestamps: true,
    }
  );
  return Channels;
};
