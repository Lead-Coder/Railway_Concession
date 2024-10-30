module.exports = (sequelize, Sequelize) => {
    const Officer = sequelize.define("officer", {
        officer_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        officer_age: {
            type: Sequelize.INTEGER
        },
        salary: {
            type: Sequelize.FLOAT
        },
        password: { // Add password field for authentication
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Officer;
};
