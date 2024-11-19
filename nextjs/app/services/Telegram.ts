import axios from "axios";
import { TELEGRAM_API_URL } from "../consts";

export async function sendMessage(chatId: string, text: string) {
  try {
    await axios.post(TELEGRAM_API_URL + "/sendMessage", {
      chat_id: chatId,
      text: text,
    });
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

export const sendSubscriptionPrompt = async (chatId: string) => {
  await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
    chat_id: chatId,
    text: "You need to subscribe to our channel to get more coins!",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Subscribe Now",
            url: "https://t.me/your_channel_link", // Your channel link here
          },
        ],
      ],
    },
  });
};

export async function sendImageToTelegram(chatId: string, imageUrl: string) {
  try {
    const response = await axios.post(TELEGRAM_API_URL + "/sendPhoto", {
      chat_id: chatId,
      photo: imageUrl,  // URL of the image
      caption: 'Here is your Pinterest image!',  // Optional caption
    });

    console.log(response)

    // Check for a successful response
    if (response.data.ok) {
      console.log('Image sent successfully!');
    } else {
      console.error('Failed to send image:', response.data.description);
    }
  } catch (error) {
    console.error('Error sending image:', error);
  }
}

export async function sendVideoToTelegram(chatId: string, url: string) {
  try {
    const response = await axios.post(TELEGRAM_API_URL + "/sendVideo", {
      chat_id: chatId,
      video: url,  // URL of the image
      caption: '',  // Optional caption
    });

    console.log(response)

    if (response.data.ok) {
      console.log('Image sent successfully!');
    } else {
      console.error('Failed to send image:', response.data.description);
    }
  } catch (error) {
    console.error('Error sending image:', error);
  }
}

export async function setWebhook() {
  const response = await axios.post(`${TELEGRAM_API_URL}/setWebhook`, {
    url: 'https://yourdomain.com/api/telegram-webhook', // Change to your actual domain
  });
  console.log(response.data);
}