// routes/tariff
const express = require('express');
const router = express.Router();
const tariffController = require('../controllers/tariffController');

router.use(express.json());
router.post('/processAnswers', tariffController.processAnswers);

module.exports = router;