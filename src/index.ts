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

    wsClient.on("open", () =>
    // TODO read directory with torrent files and send their to service
      setInterval(
        () =>
          wsClient.send(
            JSON.stringify({
              name: "hello",
              bitrate: 123,
              extName: ".mp4",
              size: 1234,
            })
          ),
        3000
      )
    );
  }
}
