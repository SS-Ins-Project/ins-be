// controllers/questions
const questionsService = require('../services/questionsService');

const getQuestionsByQuestionnaire = async (req, res) => {
  try {
    const questionnaireId = req.query.id;
    const result = await questionsService.getQuestionsByQuestionnaire(questionnaireId);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getQuestionsByQuestionnaireWithOptions = async (req, res) => {
  try {
    const questionnaireId = req.query.questionnaireId;
    const result = await questionsService.getQuestionsByQuestionnaireWithOptions(questionnaireId);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getQuestionsByQuestionnaire,
  getQuestionsByQuestionnaireWithOptions
};