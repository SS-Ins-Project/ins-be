// tariff.js
const express = require("express");
const router = express.Router();
const pool = require("./../db");

router.use(express.json());

router.post("/processAnswers", async (req, res) => {
  try {
    const answers = req.body;
    if (!Array.isArray(answers)) {
      return res
        .status(400)
        .send("Invalid input, expected an array of objects");
    }
    const baseCoef = 0.05; //Basis coefficient
    let insValue = 0;
    let premiumCoef = 0;
    for (const answer of answers) {
      console.log(answer);
      const { question_id, answer_name } = answer;
      if (question_id == 2000000016) { //Insurance value
        insValue = answer_name;
        continue;
      }
      const tariffCoef = await pool.query(
        'SELECT "tariff_criteria_id", "tariff_percentage",' +
          '"tariff_dimension", "question_id", "tariff_criteria_name"' +
          ' FROM "OINS_SS".tariff_criteria' +
          ' WHERE "question_id" = $1 AND "tariff_criteria_name" = $2;',
        [question_id, answer_name]
      );
      premiumCoef =
        premiumCoef +
        tariffCoef.rows
          .map((tariff) => +tariff.tariff_percentage)
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      console.log(premiumCoef);
    }

    let premiums = [];

    for (let i = 0; i <= 4; i++) {
      let premium = insValue * baseCoef;
      premium = premium + premium * (premiumCoef / 100);
      premium = premium + premium * 0.02; //2% Tax
      console.log('PREMIUM', premium);
      premiums.push({
        year: i,
        insuranceValue: insValue,
        premium,
        currency: "BGN",
      });
      insValue = insValue - insValue * 0.25; //Obsolescence 25% per year
    }

    res.json(premiums);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
