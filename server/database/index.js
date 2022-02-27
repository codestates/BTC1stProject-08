const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const basename = path.basename(__filename);
const config = require(__dirname + '/../config/key');
const db = {};

const sequelize = new Sequelize(config.mysql_URI.database, config.mysql_URI.user, config.mysql_URI.password, {
    host: config.mysql_URI.host,
    port: config.mysql_URI.port,
    dialect: 'mysql',
});

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, DataTypes);
        db[model.name] = model;
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
