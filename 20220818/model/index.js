
const Sequelize = require("sequelize");

const config = require('../config');

const User = require("./users");

const sequelize = new Sequelize(
                        config.dev2.database, 
                        config.dev2.user, 
                        config.dev2.password, 
                        config.dev2
                        );

const db = {};

db.sequelize = sequelize;
db.User = User;

User.init(sequelize);

module.exports = db;