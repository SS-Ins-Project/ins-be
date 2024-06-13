// controllers/options
const optionsService = require('../services/optionsService');

const getOptionsByQuestion = async (req, res) => {
  try {
    const { questionId, dependentQuestionValue } = req.query;
    const result = await optionsService.getOptionsByQuestion(questionId, dependentQuestionValue);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getOptionsByQuestion
};