import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Chat } from "../interfaces/chat.interface";
import { deleteChat, getChatsByUser, startChat, updateChatName } from "../services/chat.service";
import { useChatStore } from "../stores/chat.store";

interface UseStartChatOptions {
    onSuccess?: (newChat: Chat) => void;
  }

  
export const useFetchChatsByUser = (userId: string) => {
    return useQuery<Chat[], Error>({
        queryKey: ["chats", userId],
        queryFn: () => getChatsByUser(userId),
    });
}

export const useDeleteChat = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (chatId: string) => deleteChat(chatId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["chats"] });
      },
    });
  };

  export const useStartChat = () => {
     const setSelectedChat = useChatStore((state) => state.setSelectedChat);
  
    return useMutation<Chat, Error, string>({
      mutationFn: (userId: string) => startChat(userId),
      onSuccess: (newChat) => {
      
       setSelectedChat(newChat);
        // queryClient.invalidateQueries({ queryKey: ["chats", userId] });
  
      },
    });
  };
  
  export const useUpdateChatName = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({ chatId, chatName }: { chatId: string; chatName: string }) =>
        updateChatName(chatId, chatName),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["chats"] });
      },
    });
  };
  