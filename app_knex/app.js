// app.js (ou index.js)
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./Routes/userRoutes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use('/', userRoutes);

const PORT = 80;
app.listen(PORT, () => {
  console.log(`Le serveur Express écoute sur le port ${PORT}`);
});
