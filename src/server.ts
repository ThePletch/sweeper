import express from "express";
import {
  type APIChatInputApplicationCommandGuildInteraction,
  InteractionResponseType,
  InteractionType,
} from "discord-api-types/v10";

import { DiscordClient } from "./discord.js";
import { commands } from "./commands.js";
import { InteractionHandler } from "./handler.js";
import { verifyHeadersMiddleware } from "./crypto.js";

const app: express.Application = express();

const client = new DiscordClient(
  process.env.DISCORD_TOKEN,
  process.env.APP_ID,
);

const interactionHandler = new InteractionHandler(client, commands);

app.use(express.raw());
app.use(express.json());


app.use(verifyHeadersMiddleware);

app.post(
  "/interactions",
  (request: express.Request, response: express.Response) => {
    if (request.body.type === InteractionType.Ping) {
      return response.send({
        type: InteractionResponseType.Pong,
      });
    }

    if (
      request.body.type === InteractionType.ApplicationCommand
    ) {
      const body: APIChatInputApplicationCommandGuildInteraction = request.body;
      return interactionHandler.handleInteraction(body, response);
    }
  }
);

const port: string = process.env.PORT || "3000";
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});


