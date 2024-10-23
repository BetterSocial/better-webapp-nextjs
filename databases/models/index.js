"use strict";

const PollingOption = require('./PollingOption')
const DomainPage = require('./DomainPage')
const Channels = require('./Channels')
const ChannelMembers = require('./ChannelMembers')
const ChannelMessages = require('./ChannelMessages')

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

db.PollingOption = PollingOption(sequelize, Sequelize.DataTypes)
db.DomainPage = DomainPage(sequelize, Sequelize.DataTypes)
db.Channels = Channels(sequelize, Sequelize.DataTypes)
db.ChannelMembers = ChannelMembers(sequelize, Sequelize.DataTypes)
db.ChannelMessages = ChannelMessages(sequelize, Sequelize.DataTypes)

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
