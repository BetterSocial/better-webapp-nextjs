"use strict";

const ChannelMembers = require('./ChannelMembers')
const ChannelMessages = require('./ChannelMessages')
const Channels = require('./Channels')
const ChatAnonUserInfo = require('./ChatAnonUserInfo')
const DomainPage = require('./DomainPage')
const Locations = require('./Locations')
const PollingOption = require('./PollingOption')
const Topics = require('./Topics')
const User = require('./User')
const UserBlockedUser = require('./UserBlockedUser')
const UserFollowUser = require('./UserFollowUser')
const UserLocation = require('./UserLocation')

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/database.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.url, config);
}

db.ChannelMembers = ChannelMembers(sequelize, Sequelize.DataTypes)
db.ChannelMessages = ChannelMessages(sequelize, Sequelize.DataTypes)
db.Channels = Channels(sequelize, Sequelize.DataTypes)
db.ChatAnonUserInfo = ChatAnonUserInfo(sequelize, Sequelize.DataTypes)
db.DomainPage = DomainPage(sequelize, Sequelize.DataTypes)
db.Locations = Locations(sequelize, Sequelize.DataTypes)
db.PollingOption = PollingOption(sequelize, Sequelize.DataTypes)
db.Topics = Topics(sequelize, Sequelize.DataTypes)
db.User = User(sequelize, Sequelize.DataTypes)
db.UserBlockedUser = UserBlockedUser(sequelize, Sequelize.DataTypes)
db.UserFollowUser = UserFollowUser(sequelize, Sequelize.DataTypes)
db.UserLocation = UserLocation(sequelize, Sequelize.DataTypes)

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
