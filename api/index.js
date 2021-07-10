//JavaScript is not my strong suit but i hope you find this usefull
const express = require('express');
const bodyParser = require('body-parser');
const website = express();
const fs = require('fs');
//you can use any port
const port = ('4536');

website.use(bodyParser.json());
website.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./endpoints/endpoints.js')(website, fs);

const server = website.listen(port, () => {
    console.log("listening on port " + port);
});