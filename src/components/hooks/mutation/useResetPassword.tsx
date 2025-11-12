import { useCallback } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router";
import { useToaster } from "@/hooks/useToaster";
import { RESET_PASSWORD_QUERY } from "@/service/tanstack/queries";
import type { ResetPasswordPayloadType } from "@/types";
import { decodeTransferInfo, encodeTransferInfo } from "@/utils/auth-crypto";
import { useCombineStore } from "@/store";

const schema = z.object({
    password: z.string().min(8, "At least 8 characters"),
    confirm_password: z.string().min(8, "At least 8 characters"),
}).refine((v) => v.password === v.confirm_password, {
  path: ["confirm_password"],
  message: "Passwords do not match",
});

type ResetPasswordFormValues = z.infer<typeof schema>;

interface UseResetPasswordFormResult {
    form: UseFormReturn<ResetPasswordFormValues>;
    isLoading: boolean;
    onSubmit: (values: ResetPasswordFormValues) => void;
}

export const useResetPassword = (): UseResetPasswordFormResult => {
    const navigate = useNavigate();
    const { showToast } = useToaster();

    const form = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(schema),        
        mode: "onSubmit",
        defaultValues: {
            password: "",
            confirm_password: "",
        },
    });
    const { otpInfoValue } = useCombineStore();  
    const { isPending:isLoading, mutate } = RESET_PASSWORD_QUERY();
    
    const handleResetPassword = useCallback((payload: ResetPasswordPayloadType) => {
        mutate(encodeTransferInfo(payload), {
            onSuccess: (res: any) => {
                let deData = decodeTransferInfo(res);
                if (deData?.status === "success") {
                    showToast(deData?.message, "success");
                    setTimeout(()=>{
                        navigate("/auth/login");
                    },800);
                } else{
                    showToast(res.message, "error");
                    setTimeout(()=>{
                        navigate("/auth/forgot-password");
                    },1000);
                }
            },
            onError: (error: Error) => {                    
                showToast(error.message, "error");
            },
        });
    },[mutate, navigate, showToast]);

    const onSubmit = useCallback((values: ResetPasswordFormValues) => {
        handleResetPassword(
            { 
                phone: otpInfoValue.phone,
                token: otpInfoValue.otp_code,
                password: values.password,
                password_confirmation: values.confirm_password,
            }
            
        );
    },[handleResetPassword]);

    return { form, isLoading, onSubmit };
};
