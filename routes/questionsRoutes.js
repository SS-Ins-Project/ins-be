// routes/questions
const express = require('express');
const router = express.Router();
const questionsController = require('../controllers/questionsController');

router.use(express.json());

router.get('/getQuestionsByQuestionnaire', questionsController.getQuestionsByQuestionnaire);
router.get('/getQuestionsByQuestionnaireWithOptions', questionsController.getQuestionsByQuestionnaireWithOptions);

module.exports = router;