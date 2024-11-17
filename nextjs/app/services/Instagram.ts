import { pupeteer } from 'pup';
import axios from 'axios'
import * as cheerio from 'cheerio'
import { Downloader } from './Downloader';
import { chromium } from 'playwright';




export async function downloadFromInstagram(url: string)  {

  const browser = await pupeteer.launch();
  const page = await browser.newPage();
  
  // const browser = await chromium.launch({ headless: false });

  // const context = await browser.newContext();
  // // Set the sessionid cookie to simulate being logged in
  // await context.addCookies([
  //   {
  //     name: 'sessionid',       // Cookie name
  //     value: '70667744884%3AI4JjMOsZ5WGrZc%3A8%3AAYc3hsyK2u3Y0ohkBNtrE51S5oIJvudghFZ3NDThkA', // Session ID you got from manual login
  //     domain: 'instagram.com', // The domain of the site you're logging into
  //     path: '/',               // The path for the cookie, typically '/'
  //     httpOnly: true,          // 'httpOnly' flag
  //     secure: true,            // 'secure' flag if the site uses HTTPS
  //     sameSite: 'Lax',         // SameSite policy (can be 'Strict', 'Lax', or 'None')
  //     expires: -1              // Session cookie, meaning it expires when the session ends
  //   }
  // ]);

  // const page = await context.newPage();
  // await page.goto(url)

  // await page.waitForSelector('nav');
  // await page.screenshot({ path: 'instagram_logged_in.png' });
  // await browser.close();


}