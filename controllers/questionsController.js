// questions.js
const express = require("express");
const router = express.Router();
const pool = require("./../db");
const { all } = require("./questionnaireController");

router.use(express.json());
router.get("/getQuestionsByQuestionnaire", async (req, res) => {
  try {
    const questionnaireId = req.query.id;
    console.log(req.params);
    const result = await pool.query(
      'SELECT "question_id", "question_name",' +
        '"question_hint", "answer_type", "question_required", "questionnaire_id", ' +
        '"dependent_question", "question_position" FROM "OINS_SS".questionnaire_questions WHERE questionnaire_id = $1;',
      [questionnaireId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/getQuestionsByQuestionnaireWithOptions", async (req, res) => {
    try {
      const questionnaireId = req.query.questionnaireId;
      console.log(req.params);
      const allQuestions = await pool.query(
        'SELECT "question_id", "question_name",' +
          '"question_hint", "answer_type", "question_required", "questionnaire_id", ' +
          '"dependent_question", "question_position" FROM "OINS_SS".questionnaire_questions WHERE questionnaire_id = $1;',
        [questionnaireId]
      );
      const allOptions = await pool.query('SELECT "answer_option_id", "answer_name", "question_id" FROM "OINS_SS".answer_options');

      const result = allQuestions.rows.map(question => {
        if(question.answer_type === 'SELECT') {
           const questionOptions = allOptions.rows.filter(option => option.question_id === question.question_id);
           return {
            ...question,
            options: questionOptions.slice(0, 10),
            totalOptionsCount: questionOptions.length
           }
        } else {
          return question;
        }
      })


      res.json(result);

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
});
  

module.exports = router;
