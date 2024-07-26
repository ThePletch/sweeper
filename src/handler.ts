import type { APIChatInputApplicationCommandGuildInteraction } from "discord-api-types/v10";
import type { Response } from 'express';
import { DiscordClient } from "./discord.js";
import { CommandRegistry } from "./types.js";

export class InteractionHandler {
  constructor(private discordClient: DiscordClient, private commands: CommandRegistry) {
    discordClient.installGlobalCommands(Object.entries(commands).map(
      ([commandName, commandDefinition]) => (
        {
          ...commandDefinition,
          name: commandName,
        }
      )
    ));
  }

  handleInteraction(
    interaction: APIChatInputApplicationCommandGuildInteraction,
    response: Response,
  ): void | Promise<void> {
    if (!(interaction.data.name in this.commands)) {
      throw new Error(`No interaction defined for command name ${interaction.data.name}`);
    }

    return this.commands[interaction.data.name].handler(interaction, response, this.discordClient);
  }
}
