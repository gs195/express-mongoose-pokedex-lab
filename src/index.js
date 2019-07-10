// require('dotenv').config();
require('./utils/db');

const app = require('./app');
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));