module.exports = (sequelize, Sequelize) => {
    const College = sequelize.define("college", {
        college_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        college_address: {
            type: Sequelize.STRING
        }
    });

    return College;
};
