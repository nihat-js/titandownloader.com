import axios from 'axios'
import * as cheerio from 'cheerio'
import { Downloader } from './Downloader';
import { chromium } from 'playwright';
import { Browser } from 'puppeteer';



export async function downloadFromInstagram(url: string) {

  const browser = await chromium.launch({headless: false});
  const page = await browser.newPage();
  await page.goto("https://sssinstagram.com", {  waitUntil: 'networkidle' });

  const content = await page.content();
  const $ = cheerio.load(content);

  // Extract data using cheerio if needed
  // Example: const data = $('selector').text();

  await browser.close();
  

  let response = await fetch("https://sssinstagram.com/api/convert", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      "priority": "u=1, i",
      "sec-ch-ua": "\"Chromium\";v=\"130\", \"Google Chrome\";v=\"130\", \"Not?A_Brand\";v=\"99\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "cookie": "uid=17c8241ab3bbb999; clickAds=86"
    },
    "referrerPolicy": "no-referrer",
    "body": JSON.stringify({ url,  _s: "e1ac422e98ca921340a43cd924cf6b7b592e5c1c0795630853bc2e57f4d951e9" }),
    "method": "POST"
  })
  console.log("29a geldim")
  let data = await response.json()
  let newData: any = []


  // @ts-ignore
  newData.forEach(element => {
    newData.push({
      type: element.type,
      url: element.url[0].url
    })
  });
  console.log(data)
  console.log(newData)
  return newData


}