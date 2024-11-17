const  cheerio = require('cheerio')
async function download() {
  let response = await fetch("https://musicaldown.com/download", {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "max-age=0",
      "content-type": "application/x-www-form-urlencoded",
      "priority": "u=0, i",
      "sec-ch-ua": "\"Chromium\";v=\"130\", \"Google Chrome\";v=\"130\", \"Not?A_Brand\";v=\"99\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      "cookie": "session_data=663af252d2b19060e580e0860dc0a507",
      "Referer": "https://musicaldown.com/en",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": "_xKX=https%3A%2F%2Fwww.tiktok.com%2F%40mavi.iva%2Fvideo%2F7437591845573496072%3Fis_from_webapp%3D1&_mItPE=c553c4890fe1de8b2280fce5cc463ed3&verify=1",
    "method": "POST"
  })

  let html = await response.text()
  const $ = cheerio.load(htmlString);
  const href = $(".container a").first().attr('href');
  console.log(href)
  return {
    url: href
  }

}
download()

// document.querySelector(".container").getElementsByTagName("a")[0].href