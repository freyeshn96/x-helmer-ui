import { CustomDropdownItemAction } from "@/core/components/ui/CustomDropdown/CustomDropdownItemAction";
import { CustomDropdownList } from "@/core/components/ui/CustomDropdown/CustomDropdownList";
import { Chat } from "@/core/interfaces/chat.interface";
import { useDeleteChat, useUpdateChatName } from "@/core/queries/chat.query";
import { useChatStore } from "@/core/stores/chat.store";
import clsx from "clsx";
import { Pencil, Save, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Props {
    chat: Chat;
}

export const ChatHistoryElement = ({ chat }: Props) => {

    const selectedChat = useChatStore((state) => state.selectedChat);
    const setSelectedChat = useChatStore((state) => state.setSelectedChat);
    
    const { mutate: deleteChat, isPending: isPendingToDelete } = useDeleteChat();
    const { mutate: updateChatName, isPending: isPendingToUpdate } = useUpdateChatName();

    const [currentChatName, setCurrentChatName] = useState(chat.chat_history_name ?? "New chat");
    const [isEditorMode, setIsEditorMode] = useState(false);

    const editorRef = useRef<HTMLInputElement | null>(null);

    const oldName = chat.chat_history_name ?? "";

    const handleClick = () => {
        setSelectedChat(chat);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentChatName(e.target.value);
    }

    const handleEditChat = () => {
        updateChatName({ chatId: chat.chat_id, chatName: currentChatName });
        setIsEditorMode(false);
    }

    const handleCancelEdit = () => {
        setCurrentChatName(oldName);
        setIsEditorMode(false);
    }

    const handleStartEditMode = () => {
        setIsEditorMode(true);
        
        console.log("Starting edit mode for chat: ", editorRef.current);
        editorRef.current?.focus();
    }

    const handleDeleteChat = () => {
        deleteChat(chat.chat_id);
    }

    useEffect(() => {
        if (isEditorMode && editorRef.current) {
            editorRef.current.focus();
        }
    }, [isEditorMode]);
    
    return (
        <div className={clsx(
            "font-semibold p-1",
            "flex rounded-md border border-gray-300 text-sm font-medium text-gray-700 shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            selectedChat?.chat_id === chat.chat_id ? "bg-blue-200" : "bg-white",
        )}>
           {!isEditorMode && ( <div className="w-full flex flex-row justify-between items-center">
                <button className="w-full h-full text-left  cursor-pointer" onClick={handleClick}>{chat.chat_history_name ?? "New chat"}</button>
                {(isPendingToDelete) && <span className="text-black">Deleting...</span>}
                {(isPendingToUpdate) && <span className="text-black">Updating...</span>}
                {!isEditorMode && (<div className="cursor-pointer">
                    <CustomDropdownList icon={<Pencil size={16}></Pencil>}>
                        <CustomDropdownItemAction text="Rename" onClick={handleStartEditMode} icon={<Pencil size={16}></Pencil>}></CustomDropdownItemAction>
                        <CustomDropdownItemAction text="Delete" onClick={handleDeleteChat} icon={<Trash2 size={16}></Trash2>}></CustomDropdownItemAction>
                    </CustomDropdownList>
                </div>)}      
            </div>)}

            {isEditorMode && (<div className="w-full flex flex-row justify-between items-center">
                <input type="text" ref={editorRef} value={currentChatName} onChange={handleInputChange} className="w-full h-full text-left  cursor-pointer" />
                <div className="flex flex-row gap-2">
                    <button onClick={handleEditChat} className="cursor-pointer"><Save></Save></button>
                    <button onClick={handleCancelEdit} className="cursor-pointer"><X></X></button>
                </div>
            </div>)}
        </div>
    );
}