import { downloadFromPinterest } from "./Pinterest"
import { downloadFromTiktok } from "./Tiktok"
import { downloadFromYoutube } from "./Youtube"

export interface IDownloader {
  download(url: string) : Promise<any>
  getMetaData?(url:string) : Promise<any>
}


export  class Downloader implements IDownloader {

  #url: string
  constructor(url : string) {
    this.#url= url
  }

  download()  {
    const domain = new URL(this.#url).hostname.toLowerCase()
    if (domain.includes('tiktok.com')) {
      downloadFromTiktok(videoUrl);
    } else if (domain.includes('pinterest.com')) {
      downloadFromPinterest(videoUrl);
    } else if (domain.includes('youtube.com') || domain.includes('youtu.be')) {
      downloadFromYoutube(videoUrl);
    } else if (domain.includes('instagram.com')) {
      downloadFromInstagram(videoUrl);
    } else {
      console.log('Unsupported video platform');
    }



    return new Promise((resolve, reject) => {
      resolve({this.#url})
    })
  }
}