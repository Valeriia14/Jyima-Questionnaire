module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("client", {
        Name: {
            type: Sequelize.STRING
        },
        Date: {
            type: Sequelize.DATEONLY
        },
        Birthday: {
            type: Sequelize.DATEONLY
        },
        Age: {
            type: Sequelize.INTEGER
        },
        Height: {
            type: Sequelize.INTEGER
        },
        Weight: {
            type: Sequelize.INTEGER
        },
        GenderB: {
            type: Sequelize.STRING
        },
        GenderC: {
            type: Sequelize.STRING
        },
        Ethnicity: {
            type: Sequelize.STRING
        },
        Birthplace: {
            type: Sequelize.STRING
        },
        Fitness: {
            type: Sequelize.STRING
        },
        Stress: {
            type: Sequelize.STRING
        },
        FavouriteWorkouts: {
            type: Sequelize.STRING
        },
        FinalScore: {
            type: Sequelize.FLOAT
        },
    });

    return Client;
};