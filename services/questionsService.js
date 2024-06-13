// services/questions
const pool = require('../db');
const { answerType_select, flg_0, flg_10 } = require('../utils/servicesConstants');

const getQuestionsByQuestionnaire = async (questionnaireId) => {
  const result = await pool.query(
    'SELECT "question_id", "question_name",' +
      '"question_hint", "answer_type", "question_required", "questionnaire_id", ' +
      '"dependent_question", "question_position" FROM "OINS_SS".questionnaire_question WHERE questionnaire_id = $1;',
    [questionnaireId]
  );
  return result.rows;
};

const getQuestionsByQuestionnaireWithOptions = async (questionnaireId) => {
  const allQuestions = await pool.query(
    'SELECT "question_id", "question_name",' +
      '"question_hint", "answer_type", "question_required", "questionnaire_id", ' +
      '"dependent_question", "question_position" FROM "OINS_SS".questionnaire_question WHERE questionnaire_id = $1;',
    [questionnaireId]
  );
  const allOptions = await pool.query(
    'SELECT "answer_option_id", "answer_name", "question_id" FROM "OINS_SS".answer_option'
  );

  const result = allQuestions.rows.map((question) => {
    if (question.answer_type === answerType_select) {
      const questionOptions = allOptions.rows.filter(
        (option) => option.question_id === question.question_id
      );
      return {
        ...question,
        options: questionOptions.slice(flg_0, flg_10),
        totalOptionsCount: questionOptions.length,
      };
    } else {
      return question;
    }
  });

  return result;
};

module.exports = {
  getQuestionsByQuestionnaire,
  getQuestionsByQuestionnaireWithOptions
};