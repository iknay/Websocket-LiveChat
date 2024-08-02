import { create } from "zustand";

export interface chatroomState {
  username: string;
  setUsername: (username: string) => void;
  chatroomName: string;
  setChatroomName: (chatroomName: string) => void;
  messageData: any[];
  setMessageData: (messageData: any[]) => void;
  addMessage: (message: any) => void;
}

export const useChatroomStore = create<chatroomState>((set) => ({
  username: "",
  setUsername: (username) => set({ username }),
  chatroomName: "",
  setChatroomName: (chatroomName) => set({ chatroomName: chatroomName }),
  messageData: [],
  setMessageData: (messageData) => set({ messageData }),
  addMessage: (message) =>
    set((state) => ({ messageData: [...state.messageData, message] })),
}));
