const { appPort, httpPort, keyPath, certPath } = require('./utils/appConstants');

const fs = require('fs');
const https = require('https');
const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swaggerConfig');

const options = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath)
  };

var questionnaireRoutes = require('./routes/questionnaireRoutes');
var questionsRoutes = require('./routes/questionsRoutes');
var optionsRoutes = require('./routes/optionsRoutes');
var tariffRoutes = require('./routes/tariffRoutes');

app.use(cors());
app.use(express.json());
// Start HTTPS server
https.createServer(options, app).listen(appPort, () => {
    console.log(`Secure server running on port ${appPort}`);
  });

  const http = express();
  http.use((req, res, next) => {
    if (!req.secure) {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });
  
  http.listen(httpPort, () => {
    console.log(`HTTP server running on port ${httpPort}, redirecting to HTTPS`);
  });

app.use('/api/questionnaire', questionnaireRoutes);
app.use('/api/questions', questionsRoutes);
app.use('/api/options', optionsRoutes);
app.use('/api/tariff', tariffRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.send('Started Working, Express!');
});