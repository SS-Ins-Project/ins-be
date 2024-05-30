// options.js
const express = require('express');
const router = express.Router();
const pool = require('./../db');

router.use(express.json());

router.get('/getOptionsByQuestion', async (req, res) => {
    try {
        const questionId = req.query.questionId;
        const dependentQuestionValue = req.query.dependentQuestionValue;
        
        // Fetch the dependent question
        const dependentResult = await pool.query(
            'SELECT "dependent_question" FROM "OINS_SS".questionnaire_questions WHERE "question_id" = $1;', 
            [questionId]
        );
        const dependent = dependentResult.rows[0];
        if (dependent.dependent_question !== null && questionId == 2000000002) {
            // Logic for Make
            const makeRows = await pool.query(
                'SELECT DISTINCT "make" FROM "OINS_SS".car_data ORDER BY "make";'
            );
            const result = makeRows.rows.map(({make}) => {
                return {
                    answer_name: make,
                    questionId: questionId
                }
            })
            res.json(result);
        } else if (dependent.dependent_question && dependentQuestionValue && questionId == 2000000015) {
            // Ensure makeId is treated as text
            const modelRows = await pool.query(
                'SELECT DISTINCT "model" FROM "OINS_SS".car_data WHERE "make" = $1 ORDER BY "model";', 
                [dependentQuestionValue]
            );
            const result = modelRows.rows.map(({model}) => {
                return {
                    answer_name: model,
                    questionId: questionId
                }
            })
            res.json(result);
        } else if (dependent.dependent_question == null && !dependentQuestionValue){
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