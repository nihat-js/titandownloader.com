import { sendImageToTelegram, sendMessage, sendVideoToTelegram } from '@/app/services/Telegram';
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
  console.log(`Received message from ${from.first_name} (@${from.username}) ${from.user_id} : ${text}`);
  let replyText = `Hi ${from.first_name}, you said: ${text}`;
  const coins = 5
  await sendVideoToTelegram(chat.id,"https://media.sssinstagram.com/get?__sig=f7-rFOWRFmEqLq64XST69Q&__expires=1732052109&uri=https%3A%2F%2Finstagram.fsyd14-1.fna.fbcdn.net%2Fo1%2Fv%2Ft16%2Ff1%2Fm86%2F5E4D4234E38E19549FC72F8BC2B041AC_video_dashinit.mp4%3Fstp%3Ddst-mp4%26efg%3DeyJxZV9ncm91cHMiOiJbXCJpZ193ZWJfZGVsaXZlcnlfdnRzX290ZlwiXSIsInZlbmNvZGVfdGFnIjoidnRzX3ZvZF91cmxnZW4uY2xpcHMuYzIuNzIwLmJhc2VsaW5lIn0%26_nc_cat%3D101%26vs%3D1310419950369087_743177109%26_nc_vs%3DHBksFQIYUmlnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC81RTRENDIzNEUzOEUxOTU0OUZDNzJGOEJDMkIwNDFBQ192aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dBR0lyaHZFT3NxTTRjZ0RBTnR0QUU5ODV0QnVicV9FQUFBRhUCAsgBACgAGAAbABUAACaGr4Cy8unNPxUCKAJDMywXQDEAAAAAAAAYEmRhc2hfYmFzZWxpbmVfMV92MREAdf4HAA%253D%253D%26_nc_rid%3D84b63a947a%26ccb%3D9-4%26oh%3D00_AYCK6nBRH4sh91Fm5YI6IXQrZtJ_h_zH3LFvTrPD73lBlA%26oe%3D673E3995%26_nc_sid%3Dd885a2%26dl%3D1&filename=Fikirl%C9%99riniz.mp4&ua=-&referer=https%3A%2F%2Fwww.instagram.com%2F")

  return ;

  if (text.toLowerCase() === '/start') {
    replyText = 'Hi you can send me Pinterest,Tiktok links and I will download the video for you!';
    await sendMessage(chat.id, replyText)
    return new Response("Ok")
  } else if (text.toLowerCase() === '/coins') {
    await sendMessage(chat.id, `You have ${coins} coins left`)
    return new Response("Ok")
  }


  let downloader = new Downloader(text)
  let result = await downloader.download()

  // let source = await downloader.getSource()
  // let source = await downloadFromPinterest(text)
  if (result.length == 0){
    await sendMessage(chat.id, 'Sorry, I could not download. Please try again later.')
    return new Response("Ok")
  }

  // @ts-ignore
  result.forEach(async (element) =>{
    sendVideoToTelegram(chat.id, element.url)
  })
  
    return new Response("Retrieved")
}





// if (typeof url !== 'string') {
//   return new Response(JSON.stringify({ error: 'URL parameter is required and must be a valid string' }), {
//     status: 400,
//     headers: { 'Content-Type': 'application/json' }
//   });
// }





