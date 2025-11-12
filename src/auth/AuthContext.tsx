// src/auth/AuthContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getAuth, setAuth , clearAuth  } from "@/utils/auth-storage";
import { AUTH_KEY } from "@/utils/auth-storage";
import type { AuthBlob } from "@/types";

export type AuthContextValue = {
    auth: AuthBlob | null;                 // blob အပြည့်  
    isAuthenticated: boolean;              // !!token
    login: (data: AuthBlob) => void;       // whole blob ထည့်
    logout: () => void;
    patchAuth: (partial: Partial<AuthBlob>) => void; // blob အပိုင်းအစ update
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuthState] = useState<AuthBlob | null>(() => getAuth());

    // cross-tab sync (တခြား tab မှာ login/logout/update လုပ်လည်း ဒီ tab ပြောင်း)
    useEffect(() => {
        function onStorage(e: StorageEvent) {
        if (e.key === AUTH_KEY) {
            const latest: AuthBlob | null = getAuth();
            setAuthState(latest);
        }
        }
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    const value: AuthContextValue = useMemo(() => {
        const token: string | null = auth?.token ?? null;

        return {
        auth,      
        isAuthenticated: !!token,
        login: (data: AuthBlob) => {setAuthState(data); setAuth(data);},
        logout: () => {setAuthState(null); clearAuth();},
        patchAuth: (partial: Partial<AuthBlob>) =>
            setAuthState((prev: AuthBlob | null) =>
            prev ? { ...prev, ...partial } : (partial as AuthBlob)
            ),
        };
    }, [auth]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextValue => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return ctx;
}
