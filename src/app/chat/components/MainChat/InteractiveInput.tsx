"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { useChatStore } from "@/core/stores/chat.store";
import { useBotResponse, useCreateMessage, useFetchMessagesByChat } from "@/core/queries/messages.query";
import { ChatMessage } from "@/core/interfaces/chat-message.interface";
import { useDocumentStore } from "@/core/stores/document.store";
import { useStartChat } from "@/core/queries/chat.query";
import { useAuth } from "@/core/hooks/useAuth";
import { Chat } from "@/core/interfaces/chat.interface";
import { useUIStore } from "@/core/stores/ui.store";

interface Props {
  placeholder?: string;
  className?: string;
  inputClass?: string;
}

export const InteractiveInput = ({ placeholder, className, inputClass }: Props) => {
  const { selectedChat, setSelectedChat } = useChatStore();
  const { selectedDocuments } = useDocumentStore();
  const { userId } = useAuth();
  const { mutateAsync: startChat } = useStartChat();

  const [input, setInput] = useState("");
  const { setIsLoadingBotResponse } = useUIStore();

  const queryClient = useQueryClient();
  const { refetch } = useFetchMessagesByChat(selectedChat?.chat_id);
  const createMessage = useCreateMessage();
  const botResponse = useBotResponse();



  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedChat?.isNewChat) {

      const response: Chat = await startChat(userId ?? "");

      if (response) {

        const chatUpdated = selectedChat;
        chatUpdated.chat_id = response?.chat_id;
        chatUpdated.isNewChat = false;

        console.log("selectece chat sdasd: ", chatUpdated)

        queryClient.setQueryData(["chats", userId], (oldChats: Chat[] | undefined) => {
          return [chatUpdated, ...(oldChats?.filter(x => !x.isNewChat) ?? [])];
        });

        setSelectedChat(chatUpdated);
      }
    }

    if (!input.trim() || !selectedChat || selectedDocuments.length === 0)
      return;

    const tempId = uuidv4();
    const userMessage: ChatMessage = {
      id: tempId,
      chat_id: selectedChat.chat_id,
      sender: "human",
      content: input,
      created_at: new Date().toISOString(),
      document_name: selectedDocuments.map((doc) => doc.doc_id),
    };

    queryClient.setQueryData<ChatMessage[]>(["messages", selectedChat], (old) =>
      old ? [...old, userMessage] : [userMessage]
    );

    setInput("");

    setIsLoadingBotResponse(true);
    try {
      await createMessage.mutateAsync({
        chatId: selectedChat.chat_id,
        sender: "HUMAN",
        content: input,
        document: selectedDocuments.map((doc) => doc.doc_id),
      });

      const aiReply = await botResponse.mutateAsync({
        chatId: selectedChat.chat_id,
        question: input,
        docIds: selectedDocuments.map((doc) => doc.doc_id),
      });

      await createMessage.mutateAsync({
        chatId: selectedChat.chat_id,
        sender: "BOT",
        content: aiReply,
        document: selectedDocuments.map((doc) => doc.doc_id),
      });

      await refetch();
      setIsLoadingBotResponse(false);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <form
      onSubmit={handleSend}
      className={`w-full flex items-center bg-white rounded-lg border border-gray-300 px-3 py-6 shadow-sm ${className}`}
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={selectedDocuments.length == 0 ? "Select one o more documents." : placeholder ?? ""}
        className={`flex-1 outline-none text-[25px] leading-[30px] font-exo2 text-black placeholder:text-black placeholder:opacity-50 placeholder:font-exo2 placeholder:text-[25px] placeholder:leading-[30px] ${inputClass ?? ''}`}
        disabled={!selectedChat || selectedDocuments.length === 0}
      />

      <button
        type="submit"
        disabled={!input.trim() || selectedDocuments.length === 0}
        className="ml-2 text-blue-600 disabled:opacity-50"
      >
        <Send size={18} />
      </button>
    </form>
  );
};
