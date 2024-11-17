import axios from 'axios'
import * as cheerio from 'cheerio'
import { Downloader } from './Downloader';




export async function downloadFromTiktok(url: string)  {
  try {
    const response = await axios.get(url);

    const $ = cheerio.load(response.data);
    const firstImageSrc = $('source').first().attr('src');
    return {
      url: firstImageSrc
    }
  } catch (error) {
    console.error('Error fetching the page:', error);
  }
}