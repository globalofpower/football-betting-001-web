import { useMemo, useCallback } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clearRememberMe, getRememberMe, setRememberMe } from "@/utils/auth-storage";
import { z } from "zod";
import { useNavigate } from "react-router";
import { useAuth } from "@/auth/AuthContext";
import { useToaster } from "@/hooks/useToaster";
import { LOGIN_QUERY } from "@/service/tanstack/queries";
import type { LoginDecodeResponse, LoginPayload, LoginSuccessResponse } from "@/types";
import { decodeTransferInfo, encodeTransferInfo } from "@/utils/auth-crypto";

const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(8, "At least 8 characters"),
    remember: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;
interface UseLoginFormResult {
    form: UseFormReturn<LoginFormValues>;
    isLoading: boolean;
    onSubmit: (values: LoginFormValues) => void;
}

export const useLogin = (): UseLoginFormResult => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { showToast } = useToaster();
    const remembered = getRememberMe();
    
    const defaultValues = useMemo<LoginFormValues>(() => {
        return {
            username: remembered ? remembered.username : "",
            password: remembered ? remembered.password : "",
            remember: true,
        };
    }, [remembered]);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: defaultValues,
        mode: "onSubmit",
    });
        
    const { isPending:isLoading, mutate } = LOGIN_QUERY();
    const handleLogin = useCallback(
        (payload: LoginPayload, remember: boolean | undefined) => {
        mutate(encodeTransferInfo(payload), {
            onSuccess: (res: LoginSuccessResponse) => {
                let resDecodeData:LoginDecodeResponse = decodeTransferInfo(res)
                if (resDecodeData?.status === "success") {
                    const userId = resDecodeData?.data?.user_id;
                    const token = resDecodeData?.data?.token;
                    login({
                        user_id: userId,
                        token: token,
                    });

                    if (remember) {
                        setRememberMe(payload);
                    } else {
                        clearRememberMe();
                    }
                    showToast("အကောင့်ဝင်ခြင်း အောင်မြင်ပါသည်။", "success");                    
                    setTimeout(() => {
                        navigate("/", { replace: true });
                    }, 800);
                } else {
                    showToast(res?.message || "Login failed", "error");
                }
            },
                onError: (error: Error) => {
                showToast(error.message, "error");
            },
        });
        },
        [login, mutate, navigate, showToast]
    );

    const onSubmit = useCallback(
        (values: LoginFormValues) => {
        handleLogin(
            { username: values.username, password: values.password },
            values.remember
        );
        },
        [handleLogin]
    );

    return { form, isLoading, onSubmit };
};
