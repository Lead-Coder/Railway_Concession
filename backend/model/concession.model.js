module.exports = (sequelize, Sequelize) => {
    const Concession = sequelize.define("concession", {
        form_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        class: {
            type: Sequelize.STRING
        },
        quota: {
            type: Sequelize.STRING
        },
        application_date: {
            type: Sequelize.DATE
        },
        from: {
            type: Sequelize.STRING
        },
        to: {
            type: Sequelize.STRING
        },
        period: {
            type: Sequelize.INTEGER
        },
        route: {
            type: Sequelize.STRING
        },
        concession_fee: {
            type: Sequelize.FLOAT
        },
        expiry_date: {
            type: Sequelize.DATE
        }
    });

    return Concession;
};
