'use client';

import { useAuth } from "@/core/hooks/useAuth";
import { ChatAside } from "./ChatAside";
import { DocumentAsideBar } from "./DocumentAsideBar/DocumentAsideBar";

interface Props {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: Props) => {

const { isLoading } = useAuth();

    if (isLoading) {
        return <div className="p-10">Loading user</div>;
    }

    return (
         <div className="h-screen w-screen bg-gradient flex flex-row gap-4 p-5 text-black justify-center">
            <ChatAside></ChatAside>
            <main className="flex-grow">
            {children}
            </main>
            <DocumentAsideBar></DocumentAsideBar>

        </div>
    );
}