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
    let result
    if (domain.includes('tiktok.com')) {
      result = await downloadFromTiktok(this.#url);
    } else if (domain.includes('pinterest.com')) {
      result = await downloadFromPinterest(this.#url);
    } else if (domain.includes('youtube.com') || domain.includes('youtu.be')) {
      result = await downloadFromYoutube(this.#url);
    } else if (domain.includes('instagram.com')) {
      result = await downloadFromInstagram(this.#url);
    } else {
      console.log('Unsupported video platform');
    }

      return result



  }
}