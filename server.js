const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const insert = require('./insert/insert');
const update = require('./update/update');
const remove = require('./delete/delete');
const fetch = require('./fetch/fetch');
const auth = require('./fetch/auth');

app.use('/insert', insert);
app.use('/update', update);
app.use('/delete', remove);
app.use('/fetch', fetch);
app.use('/auth', auth);

app.listen(port, () => {
    console.log(`Server is running on port ${port} uses postman to test the api`);
});