// server ts (compiles to server.js)
// where your node app starts

// init project
import * as express from "express";
import { InteractionType } from 'discord-interactions';

const app: express.Application = express();

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.post(
  "/interactions",
  (request: express.Request, response: express.Response) => {
    if (req.body.type === InteractionType.APPLICATION_COMMAND)
    response.sendFile(__dirname + "/views/index.html");
  }
);

// listen for requests :)
const port: string = process.env.PORT || "3000";
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
