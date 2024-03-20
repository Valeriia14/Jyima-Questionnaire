const db = require("../models");
const Client = db.clients;
const Op = db.Sequelize.Op;
const sequelize = require("sequelize"); // Import sequelize for additional functions

// Create and Save a new Client
exports.create = (req, res) => {
    // Validate request

    console.log(req.body);

    if (!req.body.Name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Client

    let { Name, Date, Birthday, Age, Height, Weight, GenderB, GenderC, Ethnicity, Birthplace, Fitness, Stress, FavouriteWorkouts, FinalScore } = req.body;
    FavouriteWorkouts = JSON.stringify(FavouriteWorkouts);
    const client = { Name, Date, Birthday, Age, Height, Weight, GenderB, GenderC, Ethnicity, Birthplace, Fitness, Stress, FavouriteWorkouts, FinalScore };

    // Save Client in the database
    Client.create(client)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while saving Data."
            });
        });
};


// I want to complete this function
exports.loadData = (req, res) => {
    const { nameKey, currentKey } = req.body;
    console.log(nameKey, currentKey);

    const condition = {
        attributes: ['Name', 'Age', 'Date', 'FinalScore'], // Specify the attributes to retrieve
        where: {
            Name: {
                [Op.startsWith]: nameKey // Matches records whose Name starts with nameKey
            }
        },
        order: [['id', 'DESC']], // Order by Date in descending order
        offset: parseInt(currentKey), // Starting index for pagination
        limit: 10 // Limit the number of records to at most 10
    };

    Client.findAll(condition)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving data."
            });
        })
}

exports.findOne = (req, res) => {
    const newName = req.params.newName;
    Client.findOne({ where: { Name: newName }, order: [['id', 'DESC']], })
        .then(person => {
            if (!person) {
                res.send({});
            } else {
                res.send(person);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving data.'
            });
        });
}

exports.getCurrentWeekHistory = (req, res) => {
    const date_string = req.params.date_string;
    const name_string = req.params.name_string;

    // Calculate the start and end dates of the current week
    const givenDate = new Date(date_string);
    const firstDay = new Date(givenDate.setDate(givenDate.getDate() - givenDate.getDay())); // Calculate the start of the week (Sunday)
    const lastDay = new Date(givenDate.setDate(firstDay.getDate() + 6)); // Calculate the end of the week (Saturday)

    // Format the start and end dates in the required format (YYYY-MM-DD)
    const startDate = firstDay.toISOString().split('T')[0];
    const endDate = lastDay.toISOString().split('T')[0];

    // Query the database for records within the current week
    Client.findAll({
        where: {
            Name: name_string,
            Date: {
                [Op.between]: [startDate, endDate]
            }
        },
        order: [['Date', 'ASC']], // Order by Date in ascending order
    })
        .then(persons => {
            if (!persons || persons.length === 0) {
                res.send([]);
            } else {
                res.send(persons);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving data.'
            });
        });
}

