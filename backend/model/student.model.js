module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
        uid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        dob: {
            type: Sequelize.DATE
        },
        gender: {
            type: Sequelize.STRING
        },
        age: {
            type: Sequelize.INTEGER
        },
        address: {
            type: Sequelize.STRING
        },
        street: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        phone_no: {
            type: Sequelize.STRING
        },
        email_id: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    });

    return Student;
};
