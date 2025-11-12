// src/utils/auth-storage.ts
import type { AuthBlob } from "@/types";
import { encodeAuth, decodeAuth } from "@/utils/auth-crypto"; // your AES helpers

export const AUTH_KEY: string = "user_auth";

export function setAuth(data: AuthBlob): void {
    const encoded: string = encodeAuth(data);
    localStorage.setItem(AUTH_KEY, encoded);
}

export function getAuth(): AuthBlob | null {
    const encoded: string | null = localStorage.getItem(AUTH_KEY);
    return encoded ? (decodeAuth(encoded) as AuthBlob | null) : null;
}

export function clearAuth(): void {
    localStorage.removeItem(AUTH_KEY);
}

export const setRememberMe = (data:any) => {
    const encoded = encodeAuth(data);
    localStorage.setItem("rememberMe", encoded);
}

export const getRememberMe = () => {
    const rememberMe = localStorage.getItem("rememberMe");
    return rememberMe ? decodeAuth(rememberMe) : null;
}

export const clearRememberMe = () => {
    localStorage.removeItem("rememberMe");
}