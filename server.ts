// server ts (compiles to server.js)
// where your node app starts

// init project
import * as express from "express";
import { InteractionResponseType, InteractionType } from "discord-interactions";

import { DiscordClient } from "./discord";

const app: express.Application = express();

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

const client = DiscordClient(process.env.DISCORD_TOKEN);

// http://expressjs.com/en/starter/basic-routing.html
app.post(
  "/interactions",
  (request: express.Request, response: express.Response) => {
    if (req.body.type === InteractionType.APPLICATION_COMMAND) {
      const targetChannel = req.body.data.options.find(
        (option) => option.name === "channel"
      ).value;
      client
        .sendMessage(
          targetChannel,
          `A portal is being formed... \n :portal: :arrow_right: #sneebs`
        )
        .then((targetChannelPortalResponse) => {
        
      });
      response.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: "Summoning a portal to eeeeeee...",
        },
      });
    }
  }
);

// listen for requests :)
const port: string = process.env.PORT || "3000";
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
