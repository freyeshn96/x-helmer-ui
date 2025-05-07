"use client";
import { useFetchMessagesByChat } from "@/core/queries/messages.query";
import { useChatStore } from "@/core/stores/chat.store";
import { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import { InteractiveInput } from "./InteractiveInput";
import { Ellipse } from "@/core/components/ui/Ellipse7/Ellipse7";
import { useUIStore } from "@/core/stores/ui.store";

const MainChat = () => {
    const selectedChat = useChatStore((state) => state.selectedChat);

    const {
        data: messages,
        isLoading,
        error,
    } = useFetchMessagesByChat(selectedChat?.chat_id ?? "");
  const { isLoadingBotResponse } = useUIStore();

    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    if (!selectedChat) {
        return (
            <div className="flex flex-1 items-center justify-center text-gray-400">
                Select a chat to get started.
            </div>
        );
    }


    if (selectedChat.isNewChat) {
        return (
            <div className="w-full h-full flex flex-row items-center justify-center">
                <div className="flex flex-col gap-8 items-center">
                    <Ellipse showAsLoading={true}></Ellipse>
                    <InteractiveInput
                        className="grandiet-interactive-input !w-full"
                        inputClass="!w-full"
                        placeholder="Write Message to Nebula"
                    />
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex flex-1 items-center justify-center text-gray-400">
                Loading conversation...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-1 items-center justify-center text-red-500">
                Write the first message to start the conversation.
            </div>
        );
    }

    if (!messages || messages.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center text-gray-400">
                No messages yet. Say something to get started!
            </div>
        );
    }

    const sortedMessages = [...messages].sort((a, b) => {
        const timeA = new Date(a.created_at).getTime();
        const timeB = new Date(b.created_at).getTime();
        if (timeA === timeB) {
            return a.id.localeCompare(b.id);
        }
        return timeA - timeB;
    });

    return (
        <div className="flex flex-col flex-1 h-full px-6 py-4">

            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                {sortedMessages.map((msg) => (
                    <ChatMessage
                        key={msg.id}
                        message={{
                            ...msg,
                            document_name: msg.document_name ?? [],
                        }}
                    />
                ))}

                {isLoadingBotResponse && <Ellipse showAsLoading={true} size="64"></Ellipse>}

                <div ref={bottomRef} />
            </div>

            <div className="mt-2 mb-4">
                <InteractiveInput
                    className="grandiet-interactive-input"
                    placeholder="Write Message to Nebula"
                />
            </div>
        </div>
    );
};

export default MainChat;
