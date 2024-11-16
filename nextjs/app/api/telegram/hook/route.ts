// pages/api/fetchPinterestImage.js

import Pinterest from '@/app/services/Pinterest';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req: NextApiRequest, res: NextApiResponse<any>,) {
  const url = new URL(req.url as string).searchParams.get('url'); 


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

