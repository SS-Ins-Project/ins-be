// routes/tariff
const express = require('express');
const router = express.Router();
const tariffController = require('../controllers/tariffController');

router.use(express.json());

/**
 * @swagger
 * /processAnswers:
 *   post:
 *     summary: Process the answers and calculate the tariff
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionId:
 *                       type: integer
 *                       example: 1
 *                     answer:
 *                       type: string
 *                       example: Yes
 *     responses:
 *       200:
 *         description: Successfully processed answers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Answers processed successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */
router.post('/processAnswers', tariffController.processAnswers);

module.exports = router;