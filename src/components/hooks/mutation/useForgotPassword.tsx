import { useCallback } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router";
import { useToaster } from "@/hooks/useToaster";
import { FORGOT_PASSWORD_OTP_QUERY } from "@/service/tanstack/queries";

import { decodeTransferInfo, encodeTransferInfo } from "@/utils/auth-crypto";
import { useCombineStore } from "@/store";

const schema = z.object({
  phone: z
    .string()
    .min(1, "Phone is required")
    .regex(/^0\d{8,10}$/, "Invalid phone number"),
});

type ForgotPasswordValues = z.infer<typeof schema>;

interface UseForgotPasswordResult {
  form: UseFormReturn<ForgotPasswordValues>;
  isLoading: boolean;
  onSubmit: (v: ForgotPasswordValues) => void;
}

export const useForgotPassword = (): UseForgotPasswordResult => {
    const navigate = useNavigate();
    const { showToast } = useToaster();

    const form = useForm<ForgotPasswordValues>({
        resolver: zodResolver(schema),        
        mode: "onSubmit",
        defaultValues: {
            phone: "",
        },
    });
    const { setOtpInfoValue } = useCombineStore();  
        
    const { isPending: isLoading, mutate: sendOtp } = FORGOT_PASSWORD_OTP_QUERY();

    const onSubmit = useCallback((payload:ForgotPasswordValues) => {
        if(isLoading) return;
        sendOtp(encodeTransferInfo(payload), {
            onSuccess: (res: any) => {
                let deData = decodeTransferInfo(res);            
                if (deData?.status === "success") {
                    showToast("OTP code has been sent to your phone.", "success");
                    setOtpInfoValue(payload);
                    setTimeout(()=>{
                        navigate('/auth/verify/otp');
                    },800);                    
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
    },[isLoading, sendOtp, showToast]);

    return { form, isLoading, onSubmit };
};
