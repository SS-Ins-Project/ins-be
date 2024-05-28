// options.js
const express = require('express');
const router = express.Router();
const pool = require('./../db');

router.use(express.json());

router.get('/getOptionsByQuestion', async (req, res) => {
    try {
        const questionId = req.query.questionId;
        const makeId = req.query.makeId;
        
        // Fetch the dependent question
        const dependentResult = await pool.query(
            'SELECT "dependent_question" FROM "OINS_SS".questionnaire_questions WHERE "question_id" = $1;', 
            [questionId]
        );
        const dependent = dependentResult.rows[0];
        if (dependent.dependent_question !== null && !makeId) {
            // Logic for Make
            const result = await pool.query(
                'SELECT DISTINCT "make" FROM "OINS_SS".car_data;'
            );
            res.json(result.rows);
        } else if (dependent.dependent_question && makeId) {
            // Ensure makeId is treated as text
            const result = await pool.query(
                'SELECT "car_data_id", "make", "model", "year" FROM "OINS_SS".car_data WHERE "make" = $1;', 
                [makeId]
            );
            res.json(result.rows);
        } else if (dependent.dependent_question == null && !makeId){
            const result = await pool.query(
                'SELECT "answer_option_id", "answer_name", "question_id" FROM "OINS_SS".answer_options WHERE "question_id" = $1;', 
                [questionId]
            );
            res.json(result.rows);
        };
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;