const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//// For request analysis
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

//// Database Setting
const db = require("./models");

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });


//// view path & engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//// Static path
app.use(express.static(path.join(__dirname, 'public')));

//// Router setup
const routes = require('./routes');

app.use('/', routes);

//// Running Server
const PORT = 8083;

app.listen(PORT);
console.log('Server is listening on port http://localhost:' + PORT);
