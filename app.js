const fs = require('fs');
const https = require('https');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 443;
const pool = require('./db');

const options = {
    key: fs.readFileSync('C:/Users/stasi/key.pem'),
    cert: fs.readFileSync('C:/Users/stasi/cert.pem')
  };

var questionnaireController = require('./controllers/questionnaireController');
var questionsController = require('./controllers/questionsController');
var optionsController = require('./controllers/optionsController');
var tariffController = require('./controllers/tariffController');

app.use(cors());
app.use(express.json());
// Start HTTPS server
https.createServer(options, app).listen(port, () => {
    console.log(`Secure server running on port ${port}`);
  });

  const http = express();
  http.use((req, res, next) => {
    if (!req.secure) {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });
  
  const httpPort = 80;
  http.listen(httpPort, () => {
    console.log(`HTTP server running on port ${httpPort}, redirecting to HTTPS`);
  });

app.use('/api/questionnaire', questionnaireController);
app.use('/api/questions', questionsController);
app.use('/api/options', optionsController);
app.use('/api/tariff', tariffController);

app.get('/', (req, res) => {
    res.send('Started Working, Express!');
});