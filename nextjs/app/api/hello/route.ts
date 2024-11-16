import Pinterest from "../../services/Pinterest"
export async function GET() {

  let result

  let result = Pinterest.fetch('https://www.pinterest.com/pin/839569555518499/')


  return new Response(JSON.stringify({
    message: 'Hello World!', 
    url: result.url
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}