const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./user')(sequelize, Sequelize);
db.Group = require('./group')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);
db.Question = require('./question')(sequelize, Sequelize);
db.Semester_summary = require('./semester_summary')(sequelize, Sequelize);
db.Semester_purpose = require('./semester_purpose')(sequelize, Sequelize);
db.Semester_content = require('./semester_content')(sequelize, Sequelize);

db.Question.hasMany(db.Comment, {foreignKey: 'questioner', sourceKey: 'id'});   //1:n
db.Comment.belongsTo(db.Question, {foreignKey: 'questioner', targetKey: 'id'});

module.exports = db;