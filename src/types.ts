import express from "express";
import nacl from "tweetnacl";

import { DiscordClient, messageLink } from "./discord.js";
import {
  type APIChatInputApplicationCommandGuildInteraction,
  ApplicationCommandOptionType,
  InteractionResponseType,
  InteractionType,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from "discord-api-types/v10";

type InteractionHandler = (
  interaction: APIChatInputApplicationCommandGuildInteraction,
  response: express.Response,
  discordClient: DiscordClient,
) => void | Promise<void>;

export type CommandDefinition = Omit<RESTPostAPIChatInputApplicationCommandsJSONBody, 'name'> & {
  handler: InteractionHandler;
}

export type CommandRegistry = Record<string, CommandDefinition>;
