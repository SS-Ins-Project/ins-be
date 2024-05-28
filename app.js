const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 443;
const pool = require('./db');

var questionnaireController = require('./controllers/questionnaireController');
var questionsController = require('./controllers/questionsController');
var optionsController = require('./controllers/optionsController');

app.use(cors());
app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
});

app.use('/api/questionnaire', questionnaireController);
app.use('/api/questions', questionsController);
app.use('/api/options', optionsController);


app.get('/', (req, res) => {
    res.send('Started Working, Express!');
});