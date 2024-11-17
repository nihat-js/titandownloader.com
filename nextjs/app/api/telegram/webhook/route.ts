import { sendImageToTelegram, sendMessage } from '@/app/services/Telegram';
import { Downloader } from '../../../services/Downloader';
// pages/api/fetchPinterestImage.js

import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { downloadFromPinterest } from '@/app/services/Pinterest';


// update_id: 833496806,
//     message: {
//       message_id: 10,
//       from: [Object],
//       chat: [Object],
//       date: 1731867180,
//       text: 'b'
//     }

const testURLS = [
  "https://www.tiktok.com/@mavi.iva/video/7437591845573496072?is_from_webapp=1",
  "https://www.pinterest.com/pin/AbxLdQEOr_1TTkCGEdVx_nrR_WxltINkRZBVa-rk07QfUA4RIXse2pvQkKxxqthqgWk4RFfAdLRo4_uCGFTJkao/",
  "https://www.instagram.com/p/DBcMoujt-tn/",
]


export async function POST(req: NextRequest,) {

  const url = new URL(req.url as string).searchParams.get('url');
  const data = await req.json();


  const { text, from, chat } = data.message
  console.log(`Received message from ${from.first_name} (@${from.username}): ${text}`);
  let replyText = `Hi ${from.first_name}, you said: ${text}`;

  if (text.toLowerCase() === '/start') {
    replyText = 'Hi you can send me Pinterest,Tiktok links and I will download the video for you!';
    await sendMessage(chat.id, replyText)
    return new Response("Ok")
  } else if (text.toLowerCase() === '/end') {
    return new Response("Ok")
  }


  // let downloader = new Downloader(text)
  // let source = await downloader.getSource()
  let source = await downloadFromPinterest(text)
  console.log(source)

  if (!source) {
    await sendMessage(chat.id, 'Sorry, I could not download the video. Please try again later.')
    return new Response("Ok")
  }
  await sendImageToTelegram(chat.id, source.url as string)
  return new Response("Ok")
}





// if (typeof url !== 'string') {
//   return new Response(JSON.stringify({ error: 'URL parameter is required and must be a valid string' }), {
//     status: 400,
//     headers: { 'Content-Type': 'application/json' }
//   });
// }





