// DB에서 입출력 가능케 한다.
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Sequelize = Sequelize;
db.Sequelize = Sequelize;
db.User = require('./user')(sequelize, Sequelize);
db.Group = require('./group')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);
db.Question = require('./question')(sequelize, Sequelize);

db.Question.hasMany(db.Comment, {foreignKey: 'questioner', sourceKey: 'id'});
db.Comment.belongsTo(db.Question, {foreignKey: 'questioner', targetKey: 'id'});

module.exports = db;
