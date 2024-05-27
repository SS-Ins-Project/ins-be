const express = require('express');
//const cors = require('cors');
const app = express();
const PORT = 443;
const pool = require('./db');

var questionnaireController = require('./controllers/questionnaireController');
//app.use(cors({ origin: 'https://localhost' }));
app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
});

app.use('/api/questionnaire', questionnaireController);


app.get('/', (req, res) => {
    res.send('Started Working, Express!');
});