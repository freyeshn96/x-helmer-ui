import { create } from "zustand";

interface State {
    isLeftAsideCollapsed: boolean;
    setIsLeftAsideCollapsed: (collapsed: boolean) => void;
    isLoadingBotResponse: boolean;
    setIsLoadingBotResponse: (val: boolean) => void;
};

export const useUIStore = create<State>((set) => ({
    isLeftAsideCollapsed: false,
    setIsLeftAsideCollapsed: (collapsed) => set({ isLeftAsideCollapsed: collapsed }),
    isLoadingBotResponse: false,
    setIsLoadingBotResponse: (val) => set({ isLoadingBotResponse: val }),
}));