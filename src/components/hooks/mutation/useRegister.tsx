import { useCallback } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router";
import { useToaster } from "@/hooks/useToaster";
import { GET_OTP_QUERY, REGISTER_QUERY } from "@/service/tanstack/queries";
import type { RegisterPayloadType } from "@/types";
import { decodeTransferInfo, encodeTransferInfo } from "@/utils/auth-crypto";


const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    phone: z.string().min(1, "Phone number is required"),
    password: z.string().min(8, "At least 8 characters"),
    confirm_password: z.string().min(8, "At least 8 characters"),
    otp_code: z.string().trim().regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
}).refine((v) => v.password === v.confirm_password, {
  path: ["confirm_password"],
  message: "Passwords do not match",
});

type RegisterFormValues = z.infer<typeof registerSchema>;

interface UseRegisterFormResult {
    form: UseFormReturn<RegisterFormValues>;
    isLoading: boolean;
    onSubmit: (values: RegisterFormValues) => void;
    getOtpHandler: (phone: string) => void;
}

export const useRegister = (): UseRegisterFormResult => {
    const navigate = useNavigate();
    const { showToast } = useToaster();

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),        
        mode: "onSubmit",
        defaultValues: {
            name: "",
            phone: "",
            password: "",
            confirm_password: "",
            otp_code: "",
        },
    });
        
    const { isPending:isLoading, mutate } = REGISTER_QUERY();
    const { isPending: isSendingOtp, mutate: sendOtp } = GET_OTP_QUERY();
    
    const handleRegister = useCallback(
        (payload: RegisterPayloadType) => {
        mutate(encodeTransferInfo(payload), {
            onSuccess: (res: any) => {
                let deData = decodeTransferInfo(res);
                if (deData?.status === "success") {

                    showToast(deData?.message, "success");
                    setTimeout(()=>{
                        navigate("/auth/login");
                    },800);
                } else{
                    
                    if(res.message === "This token is invalid") {
                        form.setError("otp_code", { type: "manual", message: "Invalid OTP" });
                    }else if(res.message === "unique validation failure") {
                        form.setError("phone", { type: "manual", message: "Phone number already registered" });
                    }else {
                        showToast(res.message || "Registration failed", "error");
                    }
                }
            },
            onError: (error: Error) => {                    
                showToast(error.message, "error");
            },
        });
        },
        [mutate, navigate, showToast]
    );

    const onSubmit = useCallback(
        (values: RegisterFormValues) => {
            handleRegister(
                { 
                    name: values.name,
                    username: values.name,
                    phone: values.phone,
                    password: values.password,
                    otp: values.otp_code,
                    password_confirmation: values.confirm_password,
                }
            );
        },
        [handleRegister]
    );

    const getOtpHandler = useCallback(
        (phone: string) => {
            if(isSendingOtp) return;
            sendOtp(encodeTransferInfo({phone}), {
                onSuccess: (res: any) => {
                    let deData = decodeTransferInfo(res);
                    
                    if (deData?.status === "success") {
                        showToast("OTP code has been sent to your phone.", "success");
                        
                    } else {
                        if(res.message === "Please Use Another Phone Number") {
                            form.setError("phone", { type: "manual", message: "Phone number already registered" });
                        }else {
                            showToast(res.message || "Failed to send OTP", "error");
                        }
                    }
                },
                onError: (error: Error) => {
                    showToast(error.message, "error");
                },
            });
        },
        [isSendingOtp, sendOtp, showToast]
    );

    return { form, isLoading, onSubmit, getOtpHandler };
};
