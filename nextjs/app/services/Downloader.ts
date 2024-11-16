export interface Downloader {
  download(url: string) : Promise<any>
  getMetaData?(url:string) : Promise<any>

}