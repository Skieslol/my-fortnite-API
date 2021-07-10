const { response } = require("express");
var request = require('request');

const userRoutes = (app, fs) => {
  var cron = require('node-cron');
cron.schedule('*/5 * * * *', () => {
  console.log('running a task 1 minute');
  

    var authRequest = {//request variable
        'method': 'GET',//you need to send a post request for a auth code
        'url': 'https://api.glitchlux1.repl.co/accessToken',//just the url
        'headers': {
          'Content-Type': 'application/x-www-form-urlencoded'//you need this or else it wont work
        },
        form: {//request body
        }
      };
 
      request(authRequest, function (error, response) {
        if (error) throw new Error(error);



        var access_token = JSON.parse(response.body).access_token;



  
var authRequest2 = {//request variable
  'method': 'GET',//you need to send a post request for a auth code
  'url': 'https://fortnite-public-service-prod11.ol.epicgames.com/fortnite/api/cloudstorage/system/',//just the url
  'headers': {
    'Authorization': 'bearer ' + access_token,//pc game clients id and secrets encoded in base64
    //so ec684b8c687f479fadea3cb2ad83f5c6	e1f31c211f28413186262d37a13fc84d encoded in base64
    //got the Auth Client from here https://github.com/MixV2/EpicResearch/blob/master/docs/auth/auth_clients.md so credits to mix and all the other people who contributed
    'Content-Type': 'application/x-www-form-urlencoded'//you need this or else it wont work
  },
  form2: {//request body-     
    
  }
};
request(authRequest2, function (error2, response2) {
  if (error2) throw new Error(error2);//if there is a error

//https://attacomsian.com/blog/nodejs-read-write-json-files
fs.writeFile('./logs/cloudstorage.json', response2.body, 'utf8', (err) => {

  if (err) {
      console.log(`Error writing file: ${err}`);
  } else {
      console.log(`generated cloudstorage successfully`);
  }
         }); 
    });
});
});



    // variables
    const dataPath = './logs/cloudstorage.json';

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

    app.get("/cloudstorage", function(request, response) {
    response.setHeader('Content-Type', 'application/json');
    response.sendFile(dataPath, { root: './' })
    });
 };


module.exports = userRoutes;
