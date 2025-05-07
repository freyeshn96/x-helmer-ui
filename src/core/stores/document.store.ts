import { create } from "zustand";
import { Document } from "@/core/interfaces/document.interface"

interface State {
    selectedDocuments: Document[];
    setSelectedDocuments: (documents: Document[]) => void;
    documents: Document[];
}

export const useDocumentStore = create<State>((set) => ({
    selectedDocuments: [],
    setSelectedDocuments: (documents: Document[]) => set({ selectedDocuments: documents }),
    documents: [],
}));
