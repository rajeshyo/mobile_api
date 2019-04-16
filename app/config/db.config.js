const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.user = require('../model/user.model.js')(sequelize, Sequelize);
db.role = require('../model/role.model.js')(sequelize, Sequelize);
db.apt = require('../model/apt.model.js')(sequelize, Sequelize);
//db.user_apt = require('../model/user_apartment.model.js')(sequelize, Sequelize);
db.cartype = require('../model/cartype.model.js')(sequelize, Sequelize);
db.plan = require('../model/plan.model.js')(sequelize, Sequelize);
db.planoffer = require('../model/planoffer.medel.js')(sequelize, Sequelize);
 
db.role.belongsToMany(db.user, { through: 'user_roles', foreignKey: 'roleId', otherKey: 'userId'});
db.user.belongsToMany(db.role, { through: 'user_roles', foreignKey: 'userId', otherKey: 'roleId'});



// db.user_apt.belongsToMany(db.user, { through: 'user_apt', foreignKey: 'aptIid', otherKey: 'userId'});
// db.user.belongsToMany(db.user_apt, { through: 'user_apt', foreignKey: 'userId', otherKey: 'apartmentId'});

//  db.user.hasMany(db.apt, {foreignKey: 'userId',});
//  db.apt.belongsTo(db.user, {foreignKey: 'userId'});


//db.apt.belongsToMany(db.role, { through: 'user_apt', foreignKey: 'aptId', otherKey: 'rollId'});
//db.role.belongsToMany(db.apt, { through: 'user_apt', foreignKey: 'userId', otherKey: 'aptId'});
//db.user.hasOne(db.apt);

module.exports = db;