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
    const routes: Set<string> = new Set();

    wsClient.on("open", () => {
      wsClient.send(JSON.stringify({ id: routerClientId, files: videos }));

      wsClient.onmessage = (msg) => {
        const routeStrings: string[] = JSON.parse(msg.data.toString());
        if (Object.keys(routeStrings).includes("routerServersUrls")) {
          routes.add(JSON.stringify(routeStrings));
        }
      };
    });
  }

  public async findVideo(videoId: string) {
    const wsClient = this.wss;
    const holderFileServiceUrls: string[] = [];

    wsClient.on("open", () => {
      wsClient.send(JSON.stringify({ find: videoId }));

      wsClient.onmessage = (msg) => {
        const holder: string[] = JSON.parse(msg.data.toString());
        if (Object.keys(holder).includes("holderFileServiceUrls")) {
          holderFileServiceUrls.push(...holder);
        }
      };
    });
  }
}
