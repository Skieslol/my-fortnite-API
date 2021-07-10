const { response } = require("express");
var request = require('request');

const userRoutes = (app, fs) => {
  var cron = require('node-cron');
cron.schedule('*/5 * * * *', () => {
  console.log('running a task 1 minute');

    var authRequest = {//request variable
        
        'method': 'GET',//you need to send a post request for a auth code
        'url': 'https://FloralwhiteUnfortunateApplicationpackage.glitchlux1.repl.co',//just the url
        'headers': {
          },
        form: {//request body
          
        }
      };
      request(authRequest, function (error, response) {
        if (error) throw new Error(error);
        var dmdata = '{"Donald Mustard twitter data":' + response.body + '}';

        fs.writeFile('./logs/dm.json', dmdata, 'utf8', (err) => {

            if (err) {
                console.log(`Error writing file: ${err}`);
            } else {
                
            }
         }); 
    });
});



    // variables
    const dataPath = './logs/dm.json';

    // helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    app.get("/donaldmustard", function(request, response) {
    response.setHeader('Content-Type', 'application/json');
    response.sendFile(dataPath, { root: './' })
    });
 };


module.exports = userRoutes;
