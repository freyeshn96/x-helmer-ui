import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Chat } from "../interfaces/chat.interface";
import { deleteChat, getChatsByUser, startChat, updateChatName } from "../services/chat.service";
import { useChatStore } from "../stores/chat.store";

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
  