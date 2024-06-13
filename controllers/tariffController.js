// controllers/tariff
const tariffService = require('../services/tariffService');

const processAnswers = async (req, res) => {
  try {
    const answers = req.body;
    if (!Array.isArray(answers)) {
      return res.status(400).send('Invalid input, expected an array of objects');
    }
    const result = await tariffService.processAnswers(answers);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  processAnswers
};