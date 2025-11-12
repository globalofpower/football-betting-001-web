import { getAuth } from "@/utils/auth-storage";
import { redirect } from "react-router";


export const authProtected = async () => {
    const token = getAuth()?.token;
    if (!token) return redirect("/auth/login");
    return null;
}

export const redirectIfAuthed = async() => {
    const token = getAuth()?.token;
    if (token) return redirect("/");
    return null;
}