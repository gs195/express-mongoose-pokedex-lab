const express = require('express');
const pokemonRoute = require('./routes/pokemon.route');

const app = express();

app.use(express.json());
app.get('/', (req, res) => res.send('Hello world'));
app.use('/pokemon', pokemonRoute);

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.log('error', err);
  return res.sendStatus(500);
});

module.exports = app;
