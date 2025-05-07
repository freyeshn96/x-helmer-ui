import { create } from "zustand";
import { Chat } from "../interfaces/chat.interface";

interface Document {
  name: string;
  doc_id: string;
}

interface ChatStore {
  selectedChat?: Chat;
  chats: Chat[];
  setSelectedChat: (chat: Chat) => void;
  setChats: (chats: Chat[]) => void;
  addChat: (chat: Chat) => void;
  deleteChat: (chatId: string) => void;
  cleanChats: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  selectedChat: undefined,
  chats: [],
  setSelectedChat: (chat) => set({ selectedChat: chat }),
  setChats: (chats) => set({ chats }),
  addChat: (chat: Chat) => set((state) => ({ chats: [...state.chats, chat] })),
  deleteChat: (chatId: string) => set((state) => ({ chats: state.chats.filter(chat => chat.chat_id !== chatId) })),
  cleanChats: () => set({ chats: [] }),
}));
