import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ChatMessage } from "../interfaces/chat-message.interface";
import { createMessage, getMessagesByChat, sendToAI } from "../services/messages.service";

export const useFetchMessagesByChat = (chatId?: string | null) => {
    return useQuery<ChatMessage[], Error>({
        queryKey: ["messages", chatId],
        queryFn: () => getMessagesByChat(chatId!),
        enabled: !!chatId,
    });
};

export const useCreateMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createMessage,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["messages", variables.chatId],
            });
        },
    });
};

export const useBotResponse = () => {
    return useMutation({
        mutationFn: sendToAI,
    });
};
