import { Downloader } from './../../../services/Downloader';
// pages/api/fetchPinterestImage.js

import Pinterest from '@/app/services/Pinterest';
import { NextRequest, NextResponse } from 'next/server';


const testURLS = [
  "https://www.tiktok.com/@mavi.iva/video/7437591845573496072?is_from_webapp=1",
  "https://www.pinterest.com/pin/AbxLdQEOr_1TTkCGEdVx_nrR_WxltINkRZBVa-rk07QfUA4RIXse2pvQkKxxqthqgWk4RFfAdLRo4_uCGFTJkao/"
]


export async function POST(req: NextRequest,) {
  const url = new URL(req.url as string).searchParams.get('url'); 



  const update =  req.body
  // if (!update?.message){
  //   cons
  // }



  if (typeof url !== 'string') {
    return new Response(JSON.stringify({ error: 'URL parameter is required and must be a valid string' }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  let downloader = new Pinterest()
  let result = await downloader.download(url as string)
  return new Response(
    JSON.stringify(result),
    {
      status: 200,
      headers: {  'Content-Type': 'application/json', },
    })



}

