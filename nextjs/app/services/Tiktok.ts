import * as cheerio from 'cheerio'



export async function downloadFromTiktok(url: string) {
  try {

    let response = await fetch("https://ssstik.io/abc?url=dl", {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "hx-current-url": "https://ssstik.io/",
        "hx-request": "true",
        "hx-target": "target",
        "hx-trigger": "_gcaptcha_pt",
        "priority": "u=1, i",
        "sec-ch-ua": "\"Chromium\";v=\"130\", \"Google Chrome\";v=\"130\", \"Not?A_Brand\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "Referer": "https://ssstik.io/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": "id="+url,
      "method": "POST"
    });
    let html = await response.text();
    console.log(html)
    const $ = cheerio.load(html);
    const firstImageSrc = $('a').first().attr('src');

    return {
      source: ""
    }
  } catch (error) {
    console.error('Error fetching the page:', error);
  }
}