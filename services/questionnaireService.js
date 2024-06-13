// services/questionnaire
const pool = require('../db');

const getAllQuestionnaires = async () => {

  return await pool.query('SELECT "questionnaire_id", "questionnaire_type" FROM "OINS_SS".questionnaire');
};

const getQuestionnaireById = async (questionnaireId) => {
  return await pool.query('SELECT "questionnaire_id", "questionnaire_type" FROM "OINS_SS".questionnaire WHERE "questionnaire_id" = $1', [questionnaireId]);
};

module.exports = {
  getAllQuestionnaires,
  getQuestionnaireById
};