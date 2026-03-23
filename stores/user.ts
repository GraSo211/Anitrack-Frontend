import { User } from "@/types/User";
import {create} from "zustand";

interface UserState {
    user: User | null;
    setUser: (user:User) => void;
    removeUser: ()=> void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (newUser:User) => set(() => ({ user: newUser })),
    removeUser: ()=>set(()=>({user:null}))
}));