// routes/questionnaire
const express = require('express');
const router = express.Router();
const questionnaireController = require('../controllers/questionnaireController');

router.use(express.json());
console.log("Inside route");
router.get('/getAllQuestionnaires', questionnaireController.getAllQuestionnaires);
router.get('/getQuestionnaireById', questionnaireController.getQuestionnaireById);

module.exports = router;