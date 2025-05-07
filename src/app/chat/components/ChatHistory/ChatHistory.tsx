import { useAuth } from "@/core/hooks/useAuth";
import { useFetchChatsByUser } from "@/core/queries/chat.query";
import { useUIStore } from "@/core/stores/ui.store";
import { v4 as uuidv4 } from "uuid";
import { useQueryClient } from "@tanstack/react-query";
import { Chat } from "@/core/interfaces/chat.interface";
import clsx from "clsx";
import { InputButton } from "@/core/components/ui/InputButton/InputButton";
import { Plus } from "lucide-react";
import { ChatHistoryElement } from "./ChatHistoryElement";
import { useChatStore } from "@/core/stores/chat.store";

interface Props {
    className?: string;
}
export const ChatHistory = ({ className }: Props) => {

    const { userId } = useAuth();
    const { data: chats, isLoading } = useFetchChatsByUser(userId ?? ""); // Replace "userId" with the actual user ID
    const setSelectedChat = useChatStore(state => state.setSelectedChat);

    const isLeftAsideCollapsed = useUIStore((state) => state.isLeftAsideCollapsed);
    const queryClient = useQueryClient();

    const handleCreateNewChat = () => {

        if( chats?.some(x => x.isNewChat) ) {
            return;
        }

        const currentChats = chats;
        const newChat: Chat = {
            chat_id: uuidv4(),
            chat_history_name: 'New chat',
            first_message: undefined,
            isNewChat: true
        };

 
        queryClient.setQueryData(["chats", userId], () => ([
            newChat,
            ...(currentChats ?? []),
        ]))

        setSelectedChat(newChat)
    }

    return (
        <div className={clsx(className ?? "mt-4 mb-4")}>
            <div className={clsx("flex flex-row", isLeftAsideCollapsed ? "justify-center" : "justify-between items-center", "justify-between items-center")}>
                <span className="text-black font-semibold text-xl" hidden={isLeftAsideCollapsed}>Chats</span>
                <InputButton showOnlyIcon={true} className={clsx(isLeftAsideCollapsed ? "" : "!bg-transparent border-none shadow-none")} text="New chat" icon={<Plus></Plus>} onClick={handleCreateNewChat}>

                </InputButton>
            </div>

            {!isLeftAsideCollapsed && (<div className="flex flex-col w-full gap-2 h-full">
                {isLoading && <span className="text-black">Loading chats...</span>}
                {chats && chats.length === 0 && <span className="text-black">No chats found for {userId}</span>}
                <div className="w-full  grid grid-cols-1 grid-rows-4 gap-2 ">
                    {chats?.map((chat) => (<ChatHistoryElement key={chat.chat_id} chat={chat}></ChatHistoryElement>))}
                </div>
            </div>)}
        </div>
    );
}