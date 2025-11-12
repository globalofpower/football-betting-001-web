import { useCallback } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router";
import { useToaster } from "@/hooks/useToaster";
import { CHANGE_PASSWORD_QUERY } from "@/service/tanstack/queries";
import type { ChangePasswordPayloadType } from "@/types";
import { decodeTransferInfo, encodeTransferInfo } from "@/utils/auth-crypto";

const schema = z.object({
    old_password: z.string().min(8, "At least 8 characters"),
    new_password: z.string().min(8, "At least 8 characters"),
    confirm_password: z.string().min(8, "At least 8 characters"),
}).refine((v) => v.new_password === v.confirm_password, {
  path: ["confirm_password"],
  message: "Passwords do not match",
});

type ChangePasswordFormValues = z.infer<typeof schema>;

interface UseChangePasswordFormResult {
    form: UseFormReturn<ChangePasswordFormValues>;
    isLoading: boolean;
    onSubmit: (values: ChangePasswordFormValues) => void;
}

export const useChangePassword = (): UseChangePasswordFormResult => {
    const navigate = useNavigate();
    const { showToast } = useToaster(); 

    const form = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(schema),        
        mode: "onSubmit",
        defaultValues: {
            old_password: "",
            new_password: "",
            confirm_password: "",
        },
    });
    const { isPending:isLoading, mutate } = CHANGE_PASSWORD_QUERY();
    
    const handleChangePassword = useCallback((payload: ChangePasswordPayloadType) => {
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
                }
            },
            onError: (error: Error) => {                    
                showToast(error.message, "error");
            },
        });
    },[mutate, navigate, showToast]);

    const onSubmit = useCallback((values: ChangePasswordFormValues) => {
        handleChangePassword(
            { 
                old_password: values.old_password,
                password: values.new_password,
                password_confirmation: values.confirm_password,
            }
            
        );
    },[handleChangePassword]);

    return { form, isLoading, onSubmit };
};
