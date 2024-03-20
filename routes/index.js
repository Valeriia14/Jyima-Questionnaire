const express = require("express");
const router = express.Router();

const clients = require('../controllers/client.controller');

/**
 * @method:     GET
 * @abstract:   Load of first page.
 * @returns:    views/index.ejs -> rendered
 */
router.get('/', function (req, res) {
    res.render('index');
})

/**
 * @method:     GET
 * @abstract:   When user enters his name, should previously fillout the fields;
 * @return:     User Info Object
 */
router.get("/info/:newName", clients.findOne);

/**
 * @method:     GET
 * @abstract:   Load of checkout page.
 */
router.get('/checkout.html', function (req, res) {
    res.render('checkout');
})

/**
 * @method:     GET
 * @abstract:   Get current week's scores
 */
router.get('/checkout/weekinfo/:date_string/:name_string', clients.getCurrentWeekHistory);

/**
 * @method:     GET
 * @abstract:   Load History Page
 * @returns:    views/history.ejs -> rendered
 */
router.get('/history.html', function (req, res) {
    res.render('history');
})

/**
 * @method:     POST (actually GET)
 * @abstract:   load Data
 * @returns:    return data
 */
router.post("/history", clients.loadData);

/**
 * @method:     POST
 * @abstract:   To save flow zone checking infomation in database.
 * @returns:    the result of save.
 */
router.post('/one_result', clients.create);

/**
 * @abstract:   Just for test.
 */
router.post('/send_me_error/:id', function (req, res) {
    console.log("Server: received");
    res.send({ param: req.params.id });
})

module.exports = router;