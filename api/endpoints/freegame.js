//https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?locale=en-US&country=US&allowCountries=US,CA

const { response } = require("express");
var request = require('request');

const userRoutes = (app, fs) => {
  var cron = require('node-cron');
cron.schedule('*/5 * * * *', () => {
  console.log('running a task 1 minute');

    var authRequest = {//request variable
        
        'method': 'GET',//you need to send a post request for a auth code
        'url': 'https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?locale=en-US&country=US&allowCountries=US,CA',//just the url
        'headers': {
          'referer': 'https://www.epicgames.com/store/en-US/free-games', 'authority': 'store-site-backend-static.ak.epicgames.com', 'path': '/freeGamesPromotions?locale=en-US&country=US&allowCountries=US,CA',
          'cookie': 'EPIC_DEVICE=857b0516bbfd4e349a272dac3e06997e; _tald=84b372a9-7cab-4de3-83f0-64cd8a118a72; fptctx2=taBcrIH61PuCVH7eNCyH0FWPWMZs3CpAZMKmhMiLe%252bG6lrYLALeS84hiJ4UGXd6APaXchm36S47xrXyxHycfRggn0cwBgvUhmhLKGH4jh0y6xgSgx7oc3BQsgt9YTVB2HXs8RCCmmqDbKIn1Tjo2I9gVRhIYduVx9FwSeWCRB%252f7JFX198h7G7xnunwLCkCuyS5wS9IYyCs%252f%252b280sHBpXiACfPqaEe9HBjE2FQXPFMY9A7tSLeU1vrnagOt%252bDwyUvFyKG2CkblUmHiAEv0px4wKRcA4%252f%252flrApEHre5%252bLzcPvhoE2IcNICAaHOeeOf4YzI; MUID=f6e94c13c8d44f9198a1d79da7b1dd8c; _abck=3C9FABEDFDD3BF428FB2B468F5D42247~0~YAAQ3cPFFykULB15AQAAOymZ9gbjyZd32nXF6QRt8G2cqkfWqWTnPUP6JWRfWv2e/UYUI1jQJB1MoQa/+ASMfTFzXxIPXgPuS9MAsRS9YXR6qjJSG0KsVQQ3wJdOizSaDauus2qVcBbsYZFR/YUzkR6uUiCGxCsNuawM6Dbp9W1ZgsC9BZxEt6duZcPJf8/yhbNBsW60wMCgsWTzD4rYZ5TOuFKhqpb0/c0RCHvVpPtFa7Xs5cc6kiMuBlah03i7OcRtfAeTkHsHjLuti3OxecrQjoMh7WEmEyrEIzshvjyRtBihP7Hek8ecf1f6KgVEO01rfpSk6lvNfqyp9riRusYDFYg+JiAYtTbstm5Cra3NNA8R3jhY3u0m43Tckswf69K5AlsqpuUlD3dXoh07bAsommiKpXiWCtQEEw==~-1~-1~-1; _epicSID=b97a363a71174532bb179174900e0e60; EPIC_LOCALE_COOKIE=en-US; EPIC_SSO_RM=2d3b7acb7e004716a19dbd1a3cfa9127; EPIC_SSO=2d3b7acb7e004716a19dbd1a3cfa9127; EPIC_BEARER_TOKEN=c837251772e4412b9a229aba77ccc419', 'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
          },
        form: {//request body
          
        }
      };
      request(authRequest, function (error, response) {
        if (error) throw new Error(error);

        fs.writeFile('./logs/freegame.json', response.body, 'utf8', (err) => {

            if (err) {
                console.log(`Error writing file: ${err}`);
            } else {
                
            }
          });
    });
});



    // variables
    const dataPath = './logs/freegame.json';

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

    app.get("/freegame", function(request, response) {
    response.setHeader('Content-Type', 'application/json');
    response.sendFile(dataPath, { root: './' })
    });
 };


module.exports = userRoutes;
