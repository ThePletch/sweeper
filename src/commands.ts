import { ApplicationCommandOptionType, InteractionResponseType } from "discord-api-types/v10";

import { messageLink } from "./discord.js";
import type { CommandRegistry } from "./types.js";

export const commands: CommandRegistry = {
  sweep: {
    description: 'Sweep a discussion into another channel.',
    options: [
      {
        name: 'destination',
        description: 'The channel to sweep this discussion into',
        type: ApplicationCommandOptionType.Channel,
        required: true,
      }
    ] as const,
    handler: (interaction, response, discordClient) => {
      const originChannel: string = interaction.channel.id;
      const targetChannel = interaction.data.options.find(
        (option) => option.type === ApplicationCommandOptionType.Channel
      ).value;
      response.send({
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          content: "Sweeping this discussion elsewhere... 🧹",
        },
      });

      discordClient
        .sendMessage(
          targetChannel,
          `Sweeping a discussion in here... 🧹`
        )
        .then(async (message) => {
          const link = messageLink(
            interaction.guild_id,
            targetChannel,
            message.id
          );
          const originSweepMessage = await discordClient.updateInteractionResponse(
            interaction.application_id,
            interaction.token,
            `Discussion moving! 🛫\nDestination: ${link}`
          );
          const originLink = messageLink(
            interaction.guild_id,
            originChannel,
            originSweepMessage.id
          );
          return await discordClient.updateMessage(
            targetChannel,
            message.id,
            `Discussion incoming! 🛬\nOrigin: ${originLink}`
          );
        });
    }
  }
}
