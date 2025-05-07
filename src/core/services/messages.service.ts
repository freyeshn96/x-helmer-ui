import { ChatMessage } from "../interfaces/chat-message.interface";

const API_URL = "https://llm-chatbot-reg-production.up.railway.app";
const AI_URL =
  "https://llm-chatbot-advanced-thinking-2-production.up.railway.app/process_query/";

const headers = {
  "Content-Type": "application/json",
  "api-key": "40b27ff5-665d-4ad6-8c06-e1ea17a3d996",
};

export const getMessagesByChat = async (chatId: string): Promise<ChatMessage[]> => {
  const response = await fetch(`${API_URL}/chats/${chatId}/messages`, {
    headers,
  });
  if (!response.ok) throw new Error("Failed to fetch messages");
  const data = await response.json();
  return data.messages ?? data;
};

export const createMessage = async ({
  chatId,
  sender,
  content,
  document,
}: {
  chatId: string;
  sender: "HUMAN" | "BOT";
  content: string;
  document: string[];
}): Promise<ChatMessage> => {
  const response = await fetch(`${API_URL}/messages/`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      chat_id: chatId,
      sender: sender.toLowerCase(),
      content,
      document,
    }),
  });

  if (!response.ok) throw new Error("Failed to create message");

  return await response.json();
};

export const sendToAI = async ({
  chatId,
  question,
  docIds,
}: {
  chatId: string;
  question: string;
  docIds: string[];
}): Promise<string> => {
  const response = await fetch(AI_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      uid: chatId,
      query: question,
      doc_id_list: docIds,
    }),
  });

  if (!response.ok) throw new Error("AI failed to respond");

  const json = await response.json();

  const ai_response =
    json.ai_response ??
    json.conversation_chain?.ai_response ??
    json.conversation_chain?.conversation_chain?.ai_response;

  if (Array.isArray(ai_response) && ai_response.length > 0) {
    return ai_response[ai_response.length - 1];
  }

  return "Sorry, no response.";
};
