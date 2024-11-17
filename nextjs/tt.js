const puppeteer = require('puppeteer');
const http = require("http");
const https = require("https");
const path = require("path");
const fs = require("fs");
const axios = require("axios");

// const sessionidCookie = {
//   name: 'sessionid',  // Cookie name
//   value: '630481100d0f6d7ccf035a39af10663c',  // Cookie value
//   domain: '.google.com',  // Cookie domain (make sure this matches the website you're targeting)
//   path: '/',  // Path for the cookie (usually `/` for site-wide cookies)
//   httpOnly: true,  // Cookie flag to indicate it's HttpOnly (not accessible via JavaScript)
//   secure: false,  // Use `true` if using HTTPS
//   sameSite: 'Lax'  // You can set this to 'Strict', 'Lax', or 'None' depending on your requirements
// };


(async () => {
  // Launch the browser with headless mode set to false
  const browser = await puppeteer.launch({
    headless: false,  // Set headless mode to false (visible browser window)
    args: [
      '--no-sandbox',    // Disable the sandbox (optional, useful in some environments)
      '--disable-setuid-sandbox' // Optional, for running on certain systems
    ]
  });

  const page = await browser.newPage();
  await page.setUserAgent('TikTok 26.2.0 rv:262018 (iPhone; iOS 14.4.2; en_US) Cronet');
  // await page.setCookie(sessionidCookie);
  await page.goto('https://www.tiktok.com/@mavi.iva/video/7437591845573496072?is_from_webapp=1', {
    waitUntil: "networkidle0"
  });
  await page.waitForSelector('video', { timeout: 5000 })
  const videoSrc = await page.$eval('video', video => {
    // Retrieve the source of the video
    return video.src || video.querySelector('source')?.src || '';
  });

  const videoPath = path.join(__dirname, 'downloaded_video.mp4');
  try {
    await downloadVideo(videoSrc, videoPath);
    console.log('Video downloaded successfully to:', videoPath);
  } catch (error) {
    console.error('Error downloading video:', error);
  }


  // console.log('Video Source URL:', videoSrc);

  // if (!videoSrc) {
  //   console.error('No video source found!');
  //   await browser.close();
  //   return;
  // }
  // const videoData = await downloadVideo(videoSrc);
  // const videoPath = path.join(__dirname, 'downloaded_video.mp4');
  // fs.writeFileSync(videoPath, videoData);
  // console.log(`Video saved to ${videoPath}`);

  // Serve the video to the user (or do further processing)
  // serveVideo(videoPath);


})();


const downloadVideo = async (url, filepath) => {
  const writer = fs.createWriteStream(filepath);
  const response = await axios({
    method: 'GET',
    url: url,
    responseType: 'stream',
  });
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
};