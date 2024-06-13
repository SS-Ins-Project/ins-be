// routes/options
const express = require('express');
const router = express.Router();
const optionsController = require('../controllers/optionsController');

router.use(express.json());
router.get('/getOptionsByQuestion', optionsController.getOptionsByQuestion);

module.exports = router;