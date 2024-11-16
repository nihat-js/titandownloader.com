import { TELEGRAM_API_URL } from "@/app/consts";
import axios from "axios";

async function sendMessage(chatId: string, text: string) {
  try {
    await axios.post(TELEGRAM_API_URL + "/sendMessage", {
      chat_id: chatId,
      text: text,
    });
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

async function sendImageToTelegram(chatId : string, imageUrl : string) {
  try {
    await axios.post(TELEGRAM_API_URL, {
      chat_id: chatId,
      photo: imageUrl,
      caption: 'Here is your Pinterest image!',
    });
  } catch (error) {
    console.error('Error sending image:', error);
  }
}