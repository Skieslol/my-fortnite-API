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
  'url': 'https://lightswitch-public-service-prod06.ol.epicgames.com/lightswitch/api/service/bulk/status?serviceId=Fortnite',//just the url
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
fs.writeFile('./logs/lightswitch.json', response2.body, 'utf8', (err) => {

  if (err) {
      console.log(`Error writing file: ${err}`);
  } else {
      console.log(`generated lightswitch successfully`);
  }
          
    });
});
});
});


    // variables
    const dataPath = './logs/lightswitch.json';

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

    // READ
    app.get('/lightswitch', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

    // CREATE
    app.post('/lightswitch', (req, res) => {

        readFile(data => {
            // Note: this isn't ideal for production use. 
            // ideally, use something like a UUID or other GUID for a unique ID value
            const newUserId = Date.now().toString();

            // add the new user
            data[newUserId.toString()] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new user added');
            });
        },
            true);
    });


    // UPDATE
    app.put('/lightswitch/:id', (req, res) => {

        readFile(data => {

            // add the new user
            const userId = req.params["id"];
            data[userId] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${userId} updated`);
            });
        },
            true);
    });


    // DELETE
    app.delete('/lightswitch/:id', (req, res) => {

        readFile(data => {

            // add the new user
            const userId = req.params["id"];
            delete data[userId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${userId} removed`);
            });
        },
            true);
    });
};


module.exports = userRoutes;
