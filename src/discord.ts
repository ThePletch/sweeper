import type { APIMessage, RESTPutAPIApplicationCommandsJSONBody } from 'discord-api-types/v10';
import 'dotenv/config';
import fetch from 'node-fetch';

const DISCORD_URL = "https://discord.com/api/v10";

type RequestMethod = "get" | "post" | "put" | "patch" | "delete";
type RequestBody = Record<string, any>;

export function messageLink(
  serverId: string,
  channelId: string,
  messageId: string,
): string {
  return `https://discord.com/channels/${serverId}/${channelId}/${messageId}`
}

export class DiscordClient {
  constructor(private token: string, private appId: string) {}

  sendMessage(channelId: string, content: string): Promise<APIMessage> {
    return this.request<APIMessage>(`channels/${channelId}/messages`, "post", {
      content,
    });
  }

  updateMessage(
    channelId: string,
    messageId: string,
    newContent: string
  ): Promise<APIMessage> {
    return this.request<APIMessage>(
      `channels/${channelId}/messages/${messageId}`,
      "patch",
      {
        content: newContent,
      }
    );
  }

  updateInteractionResponse(
    applicationId: string,
    token: string,
    newContent: string,
  ): Promise<APIMessage> {
    return this.request<APIMessage>(
      `webhooks/${applicationId}/${token}/messages/@original`,
      "patch",
      {
        content: newContent,
      }
    );
  }

  installGlobalCommands(
    commands: RESTPutAPIApplicationCommandsJSONBody,
  ): Promise<void> {
    return this.request(
      `applications/${this.appId}/commands`,
      'put',
      commands
    )
  }

  private async request<ResponseType>(
    path: string,
    method: RequestMethod,
    body: RequestBody | null = null
  ): Promise<ResponseType> {
    const response = await fetch(new URL(path, DISCORD_URL), {
      method,
      headers: {
        Accept: 'application/json',
        Authorization: `Bot ${this.token}`,
        'Content-Type': 'application/json; charset=UTF-8',
        'User-Agent': 'DiscordBot (shay-channel-sweeper, 1.0.0)',
      },
      body: JSON.stringify(body),

    });

    if (response.ok) {
      return response.json() as Promise<ResponseType>;
    }

    return Promise.reject({
      status: response.status,
      text: response.statusText,
    });
  }
}
