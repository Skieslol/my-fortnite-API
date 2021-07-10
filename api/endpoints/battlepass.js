const { response } = require("express");
var request = require('request');

const userRoutes = (app, fs) => {
  var cron = require('node-cron');
cron.schedule('*/5 * * * *', () => {
  console.log('running a task 1 minute');

    var authRequest = {
        
        'method': 'GET',
        'url': 'https://www.epicgames.com/fortnite/en-US/api/battle-pass-data',
        'headers': {
          },
        form: {
          'grant_type': 'client_credentials'
        }
      };
      request(authRequest, function (error, response) {
        if (error) throw new Error(error);

        fs.writeFile('./logs/battlepass.json', response.body, 'utf8', (err) => {

            if (err) {
                console.log(`Error writing file: ${err}`);
            } else {
                
            }
           });
    });
});

     app.get("/battlepass", function(request, response) {
    response.setHeader('Content-Type', 'application/json');
    response.sendFile('./logs/battlepass.json', { root: './' })
    });
 };


module.exports = userRoutes;
