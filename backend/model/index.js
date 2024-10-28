const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.college = require("./college.model.js")(sequelize, Sequelize);
db.concession = require("./concession.model.js")(sequelize, Sequelize);
db.officer = require("./officer.model.js")(sequelize, Sequelize);
db.student = require("./student.model.js")(sequelize, Sequelize);

db.college.hasMany(db.student, { foreignKey: "college_id" });
db.student.belongsTo(db.college, { foreignKey: "college_id" });

db.student.hasMany(db.concession, { foreignKey: "uid" });
db.concession.belongsTo(db.student, { foreignKey: "uid" });

db.officer.hasMany(db.concession, { foreignKey: "approved_by" });
db.concession.belongsTo(db.officer, { foreignKey: "approved_by" });

module.exports = db;