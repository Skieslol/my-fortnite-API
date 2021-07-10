// import other routes
const userRoutes = require('./cloudstorage');
const oh = require('./accessToken')
const lightswitch = require('./lightswitch')
const radioStations = require('./radioStations')
const stw = require('./stw')
const freegame = require('./freegame')
const blogposts = require('./blogs')
const battlepass = require('./battlepass')
const dm = require('./dm')
const  latestversion  = require('./latestversion')
const moo = require('./moo')

const appRouter = (app, fs) => {

   
    app.get('/', (req, res) => {
      app.set('view engine', 'ejs')
        res.render('index')
    });

    //other routes
    userRoutes(app, fs);
    oh(app, fs);
    lightswitch(app, fs);
    radioStations(app, fs);  
     stw(app, fs);
      freegame(app, fs);
     blogposts(app, fs); 
     battlepass(app, fs);
     dm(app, fs);
     latestversion(app, fs);
     moo(app, fs);
};

module.exports = appRouter;