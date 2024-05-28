// questions.js
const express = require("express");
const router = express.Router();
const pool = require("./../db");

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

module.exports = router;
