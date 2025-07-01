const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3333;

app.use(express.static(path.join(__dirname)));   // sirve index.html root
app.get('/health', (_, res) => res.send('OK'));  // endpoint de health-check

app.listen(port, () => console.log(`App escuchando en http://0.0.0.0:${port}`));
