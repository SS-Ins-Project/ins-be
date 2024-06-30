// services/tariff
const pool = require('../db');
const { baseCoef_value, flg_0, iv_question, flg_4, flg_100, VAT_value, bgn_currency, obsolescence_value } = require('../utils/servicesConstants');

const processAnswers = async (answers) => {
  const baseCoef = baseCoef_value; // Basis coefficient
  let insValue = flg_0;
  let premiumCoef = flg_0;

  for (const answer of answers) {
    const { question_id, answer_name } = answer;
    if (question_id == iv_question) { // Insurance value
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
    premiumCoef += tariffCoef.rows
      .map((tariff) => +tariff.tariff_percentage)
      .reduce((accumulator, currentValue) => accumulator + currentValue, flg_0);
  }

  let premiums = [];

  for (let i = flg_0; i <= ins_period; i++) {
    let premium = insValue * baseCoef; // baseCoef is based on whether the car is brand new or not - 0.05/0.10
    premium += premium * (premiumCoef / flg_100); // premiumCoef is based on all discounts and loadings
    premium += premium * VAT_value; // 2% Tax
    premiums.push({
      year: i,
      insuranceValue: insValue,
      premium,
      currency: bgn_currency,
    });
    insValue -= insValue * obsolescence_value; // Obsolescence 25% per year
  }

  return premiums;
};

module.exports = {
  processAnswers
};