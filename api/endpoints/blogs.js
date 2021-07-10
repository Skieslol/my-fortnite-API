const { response } = require("express");
var request = require('request');

const userRoutes = (app, fs) => {
  var cron = require('node-cron');
cron.schedule('*/5 * * * *', () => {
  console.log('running a task 1 minute');

    var authRequest = {//request variable
        
        'method': 'GET',//you need to send a post request for a auth code
        'url': 'https://www.epicgames.com/fortnite/api/blog/getPosts?category=&postsPerPage=5&offset=0&locale=en-US&rootPageSlug=blog',//just the url
        'headers': {
          },
        form: {//request body
         
        }
      };
      request(authRequest, function (error, response) {
        if (error) throw new Error(error);

        fs.writeFile('./logs/blogs.json', response.body, 'utf8', (err) => {

            if (err) {
                console.log(`Error writing file: ${err}`);
            } else {
                
            }
           });
    });
});



    // variables
    const dataPath = './logs/blogs.json';

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

app.get("/blogs", function(request, response) {
    response.setHeader('Content-Type', 'application/json');
    response.sendFile(dataPath, { root: './' })
    });
 };


module.exports = userRoutes;
