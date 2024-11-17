import { downloadFromInstagram } from "./Instagram"
import { downloadFromPinterest } from "./Pinterest"
import { downloadFromTiktok } from "./Tiktok"
import { downloadFromYoutube } from "./Youtube"

export interface IDownloader {
  getSource(url: string): Promise<any>
  getMetaData?(url: string): Promise<any>
}


export class Downloader implements IDownloader {

  #url: string
  constructor(url: string) {
    this.#url = url
  }

  async getSource() {
    const domain = new URL(this.#url).hostname.toLowerCase()
    let source
    if (domain.includes('tiktok.com')) {
      source = await downloadFromTiktok(this.#url);
    } else if (domain.includes('pinterest.com')) {
      source = await downloadFromPinterest(this.#url);
    } else if (domain.includes('youtube.com') || domain.includes('youtu.be')) {
      source = await downloadFromYoutube(this.#url);
    } else if (domain.includes('instagram.com')) {
      source = await downloadFromInstagram(this.#url);
    } else {
      console.log('Unsupported video platform');
    }

    if (source) {
      return {
        "message": "success",
        "source": source
      }
    } else {
      return {
        "message": "failed",
        "source": null
      }
    }



  }
}