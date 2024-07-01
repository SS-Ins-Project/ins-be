// routes/questions
const express = require('express');
const router = express.Router();
const questionsController = require('../controllers/questionsController');

router.use(express.json());

/**
 * @swagger
 * /getQuestionsByQuestionnaire:
 *   get:
 *     summary: Retrieve questions for a specific questionnaire
 *     parameters:
 *       - in: query
 *         name: questionnaireId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the questionnaire
 *     responses:
 *       200:
 *         description: A list of questions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   text:
 *                     type: string
 *                     example: How satisfied are you with our service?
 *                   questionnaireId:
 *                     type: integer
 *                     example: 1
 *       400:
 *         description: Invalid questionnaire ID
 *       500:
 *         description: Internal server error
 */
router.get('/getQuestionsByQuestionnaire', questionsController.getQuestionsByQuestionnaire);

/**
 * @swagger
 * /getQuestionsByQuestionnaireWithOptions:
 *   get:
 *     summary: Retrieve questions with their respective answer options for a specific questionnaire
 *     parameters:
 *       - in: query
 *         name: questionnaireId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the questionnaire
 *     responses:
 *       200:
 *         description: A list of questions with options
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   text:
 *                     type: string
 *                     example: How satisfied are you with our service?
 *                   questionnaireId:
 *                     type: integer
 *                     example: 1
 *                   options:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         optionText:
 *                           type: string
 *                           example: Very Satisfied
 *                         questionId:
 *                           type: integer
 *                           example: 1
 *       400:
 *         description: Invalid questionnaire ID
 *       500:
 *         description: Internal server error
 */
router.get('/getQuestionsByQuestionnaireWithOptions', questionsController.getQuestionsByQuestionnaireWithOptions);

module.exports = router;