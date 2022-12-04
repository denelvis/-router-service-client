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

  public async registerVideos(videos: IVideoFile[]): Promise<string[] | void> {
    const wsClient = this.wss;

    wsClient.on("open", () => {
      wsClient.send(JSON.stringify({ id: routerClientId, files: videos }));

      wsClient.onmessage = (msg) => {
        const routeStrings: Record<string, string[]> = JSON.parse(
          msg.data.toString()
        );
        if (Object.keys(routeStrings).includes("routerServersUrls")) {
          return routeStrings.routerServersUrls;
        }
      };
    });
  }

  public async findVideo(videoId: string): Promise<string[] | void> {
    const wsClient = this.wss;

    wsClient.on("open", () => {
      wsClient.send(JSON.stringify({ find: videoId }));

      wsClient.onmessage = (msg) => {
        const holder: Record<string, string[]> = JSON.parse(
          msg.data.toString()
        );
        if (Object.keys(holder).includes("holderFileServiceUrls")) {
          return holder.holderFileServiceUrls;
        }
      };
    });
  }
}
