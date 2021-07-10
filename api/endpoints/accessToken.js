const { response } = require("express");
var request = require('request');
const status_code = 'online';

const userRoutes = (app, fs) => {
  var cron = require('node-cron');
cron.schedule('*/1 * * * *', () => {
  var options = {
  'method': 'POST',
  'url': 'https://account-public-service-prod.ol.epicgames.com/account/api/oauth/token',
  'headers': {
    'Authorization': 'basic ZWM2ODRiOGM2ODdmNDc5ZmFkZWEzY2IyYWQ4M2Y1YzY6ZTFmMzFjMjExZjI4NDEzMTg2MjYyZDM3YTEzZmM4NGQ=',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  form: {
    'grant_type': 'client_credentials'
  }
};

request(options, function (error, response2) {
  if (error) throw new Error(error);
  console.log(response2.body);
var access_token = JSON.parse(response2.body).access_token;

        fs.writeFile('./logs/accessToken.json', response2.body, 'utf8', (err) => {

            if (err) {
                console.log(`Error writing file: ${err}`);
            } else {
                
            }
        });  
    });
 });
    if (status_code == 'online')
 {
    app.get("/accessToken", function(request, response) {
    response.setHeader('Content-Type', 'application/json');
    response.sendFile(`./logs/accessToken.json`, { root: './' })
   
    
    });
    } else 
    {
      app.get("/accessToken", function(request, response) {
    response.setHeader('Content-Type', 'application/json');
    response.write('{"status": "offline"}', { root: './' })
    });
    }
}
module.exports = userRoutes;
