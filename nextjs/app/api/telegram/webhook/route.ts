import { Downloader } from '../../../services/Downloader';
// pages/api/fetchPinterestImage.js

import { NextRequest, NextResponse } from 'next/server';


const testURLS = [
  "https://www.tiktok.com/@mavi.iva/video/7437591845573496072?is_from_webapp=1",
  "https://www.pinterest.com/pin/AbxLdQEOr_1TTkCGEdVx_nrR_WxltINkRZBVa-rk07QfUA4RIXse2pvQkKxxqthqgWk4RFfAdLRo4_uCGFTJkao/"
]


export async function POST(req: NextRequest,) {
  const url = new URL(req.url as string).searchParams.get('url'); 
  // if (typeof url !== 'string') {
  //   return new Response(JSON.stringify({ error: 'URL parameter is required and must be a valid string' }), { 
  //     status: 400,
  //     headers: { 'Content-Type': 'application/json' }
  //   });
  // }
  const update =  req.body



  // if (!update?.message){
  //   cons
  // }



  let downloader = new Downloader(testURLS[0])
  let result = await downloader.getSource()
  return new Response(
    JSON.stringify(result),
    {
      status: 200,
      headers: {  'Content-Type': 'application/json', },
    })



}

