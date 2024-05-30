// questionnaire.js
const express = require('express');
const router = express.Router();
const pool = require('./../db');

router.use(express.json());
router.get('/getAllQuestionnaires', async (req, res) => {
    try {
      const result = await pool.query('SELECT "questionnaire_id", "questionnaire_type"FROM "OINS_SS".questionnaire');
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

router.get('/getQuestionnaireById', async (req, res) => {
  try {
    const questionnaireId = req.query.questionnaireId;
    const result = await pool.query('SELECT "questionnaire_id", "questionnaire_type"FROM "OINS_SS".questionnaire WHERE "questionnaire_id" = $1',
    [questionnaireId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;