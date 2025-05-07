'use client'

import AvaraLogo from "@/../public/img/avara-logo.png";
import { useUIStore } from "@/core/stores/ui.store";
import clsx from "clsx";
import { ChevronLeft, ChevronRight, LogOut, Upload, UserRoundPenIcon } from "lucide-react";
import Image from "next/image";
import { InputButton } from "../ui/InputButton/InputButton";
import { ChatHistory } from "@/app/chat/components/ChatHistory/ChatHistory";
import Link from "next/link";
import { useState } from "react";
import { UploadDocumentModal } from "@/app/chat/components/UploadDocumentModal/UploadDocumentModal";

export const ChatAside = () => {

    const setIsLeftAsideCollapsed = useUIStore((state) => state.setIsLeftAsideCollapsed);
    const isLeftAsideCollapsed = useUIStore((state) => state.isLeftAsideCollapsed);

    const [setIsModalUploadDocumentOpen] = useState<boolean>(false);

    const handleCollapsed = () => {
        setIsLeftAsideCollapsed(!isLeftAsideCollapsed);
    }

    const handleOpenModalUploadDocument = () => {
        setIsModalUploadDocumentOpen(true);
    };

    const handleCloseUploadDocumentModal = () => {
        setIsModalUploadDocumentOpen(false);
    }

    return (
        <aside className={clsx(
            "transition-all duration-300 ease-in-out p-4",
            "h-full rounded-md  border-1 border-black shadow bg-gradient flex flex-col",
            isLeftAsideCollapsed ? "w-fit !bg-white" : "w-[250px] min-w-[250px]",
        )}>
            <div className={clsx(
                "flex mb-2",
                isLeftAsideCollapsed ? "flex-col" : "flex-row",
                "h-28 flex items-center gap-2 ",

            )}>
                <Image
                    src={AvaraLogo}
                    alt="avara-logo"
                    width={65}
                    height={55}
                    priority
                />

                <span className="avara-title text-[20px] leading-6 font-[var(--font-exo2)] text-black" hidden={isLeftAsideCollapsed}>
                    AVARA LABS
                </span>

                <div className="flex flex-grow justify-end items-center">
                    {!isLeftAsideCollapsed && (<button className="cursor-pointer" onClick={handleCollapsed}><ChevronLeft className="text-black" size={32}></ChevronLeft></button>)}
                    {isLeftAsideCollapsed && (<button className="cursor-pointer" onClick={handleCollapsed}><ChevronRight className="text-black" size={32}></ChevronRight></button>)}
                </div>

            </div>

            <div className={clsx(
                "w-full h-fit mb-2",
                isLeftAsideCollapsed ? "flex flex-row justify-center" : "",
            )}>
                <InputButton showOnlyIcon={isLeftAsideCollapsed} text="Upload" className="w-full" icon={<Upload></Upload>} onClick={handleOpenModalUploadDocument}></InputButton>
                <UploadDocumentModal onClose={handleCloseUploadDocumentModal} isOpen={true}></UploadDocumentModal>
            </div>
           
           <ChatHistory className="flex flex-col flex-grow h-[90%] overflow-y-auto"></ChatHistory>

           <div className="flex flex-col w-2/3 flex-grow max-h-full gap-4 items-center justify-start">
                <Link href="api" className="w-full flex flex-row justify-between">
                    API
                </Link>
                <Link href="contact" className="w-full flex flex-row justify-between">
                    Contact

                    <UserRoundPenIcon></UserRoundPenIcon>
                </Link>
                <Link href="auth/logout" className="w-full flex flex-row justify-between">
                    Logout

                    <LogOut></LogOut>
                </Link>
           </div>
        </aside>
    );
}