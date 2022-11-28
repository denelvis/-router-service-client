import { WebSocket } from "ws";

export class ClientWsService {
  declare readonly url: string;

  declare wss: WebSocket;

  constructor(url: string) {
    this.url = url;
    this.wss = new WebSocket(url);
  }

  public async run() {
    const wsClient = this.wss;

    wsClient.onmessage = (msg) => {
      console.log(msg.data);
    };

    wsClient.on("open", () => setInterval(() => wsClient.send("hello"), 3000));
  }
}
