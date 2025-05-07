import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import { X } from "lucide-react";

interface Props {
    isOpen: boolean;
    title?: string;
    children: ReactNode;
    onClose?: () => void;
}

export const ModalDialog = ({ isOpen, title, children, onClose }: Props) => {
    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog onClose={handleClose} className="relative z-50">
                {/* Background overlay */}
                <TransitionChild
                    as={Fragment}
                    enter="transition-opacity ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30  pointer-events-none" />
                </TransitionChild>

                <div className="fixed inset-0 w-screen overflow-y-auto p-4">
                    <div className="flex min-h-full items-center justify-center">
                        <TransitionChild
                            as={Fragment}
                            enter="transition ease-out duration-300"
                            enterFrom="opacity-0 translate-y-10"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-10"
                        >
                            <DialogPanel className="h-[600px] w-[900px] p-8 bg-white shadow-lg rounded-lg flex flex-col gap-4">
                                <div className="flex flex-row w-full">
                                    <div className="flex-grow">
                                        {title && (<DialogTitle className="text-xl text-black text-semibold">{title}</DialogTitle>)}
                                    </div>
                                    <button onClick={handleClose} className="cursor-pointer w-fit">
                                        <X className="text-black" />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-hidden">
                                {children}
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};
