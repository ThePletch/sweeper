import https from "https";

const DISCORD_URL = "";

class DiscordApi {
  constructor(private token: string) {}

  private request(
    path: string,
    type: "get" | "post" | "put" | "patch" | "delete"
  ): Response {
    return https.request(
      type,
      new URL(path, DISCORD_URL).href,
      this.headers(),
    );
  }
  sendMessage;
}
