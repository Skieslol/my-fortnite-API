const { response } = require("express");
var request = require('request');

const userRoutes = (app, fs) => {
  var cron = require('node-cron');
cron.schedule('*/5 * * * *', () => {
  console.log('running a task 1 minute');
  var options = {
  'method': 'GET',
  'url': 'https://fortnite-public-service-prod.ak.epicgames.com/fortnite/api/version',
  'headers': {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  form: {
  }
};
request(options, function (error, response2) {
  if (error) throw new Error(error);
  console.log(response2.body);
var access_token = JSON.parse(response2.body).access_token;
console.log(access_token)



        fs.writeFile('./logs/latest.json', response2.body, 'utf8', (err) => {

            if (err) {
                console.log(`Error writing file: ${err}`);
            } else {
                
            }
        });  
    });
 });



    // variables
    const dataPath = './logs/latest.json';

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
    app.get('/latest', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

    // CREATE
    app.post('/latest', (req, res) => {

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
    app.put('/latest/:id', (req, res) => {

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
    app.delete('/latest/:id', (req, res) => {

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
