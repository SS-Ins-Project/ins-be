// routes/questionnaire
const express = require('express');
const router = express.Router();
const questionnaireController = require('../controllers/questionnaireController');

router.use(express.json());
/**
 * @swagger
 * /getAllQuestionnaires:
 *   get:
 *     summary: Retrieve all questionnaires
 *     responses:
 *       200:
 *         description: A list of questionnaires
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
 *                   title:
 *                     type: string
 *                     example: Customer Satisfaction Survey
 *                   description:
 *                     type: string
 *                     example: A survey to gather customer feedback.
 *       500:
 *         description: Internal server error
 */
router.get('/getAllQuestionnaires', questionnaireController.getAllQuestionnaires);

/**
 * @swagger
 * /getQuestionnaireById:
 *   get:
 *     summary: Retrieve a specific questionnaire by ID
 *     parameters:
 *       - in: query
 *         name: questionnaireId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the questionnaire
 *     responses:
 *       200:
 *         description: A questionnaire object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: Customer Satisfaction Survey
 *                 description:
 *                   type: string
 *                   example: A survey to gather customer feedback.
 *       400:
 *         description: Invalid questionnaire ID
 *       500:
 *         description: Internal server error
 */
router.get('/getQuestionnaireById', questionnaireController.getQuestionnaireById);

module.exports = router;