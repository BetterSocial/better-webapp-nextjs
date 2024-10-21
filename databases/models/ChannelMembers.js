"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ChannelMembers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ChannelMembers.init(
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
        user_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        anon_user_info_color_name: DataTypes.STRING,
        anon_user_info_color_code: DataTypes.STRING,
        anon_user_info_emoji_name: DataTypes.STRING,
        anon_user_info_emoji_code: DataTypes.STRING,
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
      modelName: "ChannelMembers",
      tableName: "channel_members",
      timestamps: true,
    }
  );
  return ChannelMembers;
};
