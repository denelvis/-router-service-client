import { WebSocket } from "ws";

import { IVideoFile } from "./interfaces";
import { routerClientId } from "./locals/index";

export class RouterClientService {
  private declare readonly url: string;

  private declare wss: WebSocket;

  constructor(url: string) {
    this.url = url;
    this.wss = new WebSocket(url);
  }

  public async registerVideos(videos: IVideoFile[]) {
    const wsClient = this.wss;
    const routes: string[] = [];

    wsClient.on("open", () => {
      wsClient.send(JSON.stringify({ id: routerClientId, files: videos }));

      wsClient.onmessage = (msg) => {
        const routeStrings: string[] = JSON.parse(msg.data.toString());
        if (Object.keys(routeStrings).includes("routerServersUrls")) {
          routes.push(...routeStrings);
        }
      };
    });
  }
}
