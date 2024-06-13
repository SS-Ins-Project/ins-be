// controllers/questionnaire
const questionnaireService = require('../services/questionnaireService');

const getAllQuestionnaires = async (req, res) => {
  try {
    const result = await questionnaireService.getAllQuestionnaires();
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getQuestionnaireById = async (req, res) => {
  try {
    const questionnaireId = req.query.questionnaireId;
    const result = await questionnaireService.getQuestionnaireById(questionnaireId);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getAllQuestionnaires,
  getQuestionnaireById
};