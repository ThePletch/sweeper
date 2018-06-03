// server ts (compiles to server.js)
// where your node app starts

// init project
import * as express from 'express';
let app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (request: express.Request, response: express.Response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
let listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
