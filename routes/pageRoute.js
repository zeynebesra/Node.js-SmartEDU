const express = require('express');
const pageController = require('./controllers/pageController');

const router = express.Router();

app.route('/').get(pageController.getIndexPage);
app.route('/about').get(pageController.getAboutPage);

module.exports = router;
