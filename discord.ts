const DISCORD_URL = "https://discord.com/api";

type RequestMethod = "get" | "post" | "put" | "patch" | "delete";
type RequestBody = {
  [key: string]: string;
};

export class DiscordClient {
  constructor(private token: string) {}

  sendMessage(channelId: string, message: string): Promise<Response> {
    return this.request(`channels/${channelId}/messages`, "post", {
      content: message,
    });
  }

  private request(
    path: string,
    method: RequestMethod,
    body: RequestBody | null = null
  ): Promise<Response> {
    return fetch(new URL(path, DISCORD_URL), {
      method,
      headers: {
        Authorization: `Bot ${this.token}`,
      },
      body: JSON.stringify(body),
    });
  }
}
