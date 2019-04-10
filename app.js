const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
require('dotenv').config();

const app = express();
const routes = require('./src/routes/routeIndex');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
require('./passport.config')(passport);
app.use(routes);
app.use(express.static(path.join('client', 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App listening on port ${port}.`));