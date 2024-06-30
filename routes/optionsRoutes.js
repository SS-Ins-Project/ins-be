// routes/options
const express = require('express');
const router = express.Router();
const optionsController = require('../controllers/optionsController');

router.use(express.json());
/**
 * @swagger
 * /getOptionsByQuestion:
 *   get:
 *     summary: Retrieve options for a specific question
 *     parameters:
 *       - in: query
 *         name: questionId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the question
 *     responses:
 *       200:
 *         description: A list of options
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
 *                   optionText:
 *                     type: string
 *                     example: Option 1
 *                   questionId:
 *                     type: integer
 *                     example: 1
 *       400:
 *         description: Invalid question ID
 *       500:
 *         description: Internal server error
 */
router.get('/getOptionsByQuestion', optionsController.getOptionsByQuestion);

module.exports = router;