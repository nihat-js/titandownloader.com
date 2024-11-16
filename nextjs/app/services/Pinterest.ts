import axios from 'axios'
import * as cheerio from 'cheerio'
import { Downloader } from './Downloader';



export default class Pinterest implements Downloader {
  async download(url: string) : Promise<any> {
      try {
        const response = await axios.get(url);
  
        const $ = cheerio.load(response.data);
        const firstImageSrc = $('img').first().attr('src');
        return {
          url: firstImageSrc
        }
      } catch (error) {
        console.error('Error fetching the page:', error);
      }
  }
}


// const url = 'https://www.pinterest.com/pin/AbxLdQEOr_1TTkCGEdVx_nrR_WxltINkRZBVa-rk07QfUA4RIXse2pvQkKxxqthqgWk4RFfAdLRo4_uCGFTJkao/';
// getFirstImageSrc(url);