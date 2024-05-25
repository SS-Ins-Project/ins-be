const express = require('express');
//const cors = require('cors');
const app = express();
const PORT = 443;

//app.use(cors({ origin: 'https://localhost' }));
app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Started Working, Express!');
});