// services/options
const pool = require('../db');
const { flg_0, make_question, model_question } = require('../utils/servicesConstants');

const getOptionsByQuestion = async (questionId, dependentQuestionValue) => {
  const dependentResult = await pool.query(
    'SELECT "dependent_question" FROM "OINS_SS".questionnaire_question WHERE "question_id" = $1;', 
    [questionId]
  );
  const dependent = dependentResult.rows[flg_0];

  if (dependent.dependent_question !== null && questionId == make_question) {
    const makeRows = await pool.query(
      'SELECT DISTINCT "make" FROM "OINS_SS".car_data ORDER BY "make";'
    );
    return makeRows.rows.map(({ make }) => ({
      answer_name: make,
      question_id: questionId
    }));
  } else if (dependent.dependent_question && dependentQuestionValue && questionId == model_question) {
    const modelRows = await pool.query(
      'SELECT DISTINCT "model" FROM "OINS_SS".car_data WHERE "make" = $1 ORDER BY "model";', 
      [dependentQuestionValue]
    );
    return modelRows.rows.map(({ model }) => ({
      answer_name: model,
      question_id: questionId
    }));
  } else if (dependent.dependent_question == null && !dependentQuestionValue) {
    const result = await pool.query(
      'SELECT "answer_option_id", "answer_name", "question_id" FROM "OINS_SS".answer_option WHERE "question_id" = $1;', 
      [questionId]
    );
    return result.rows;
  }
};

module.exports = {
  getOptionsByQuestion
};