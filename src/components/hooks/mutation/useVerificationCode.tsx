import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router";

import { useCombineStore } from "@/store";

const schema = z.object({
  otp_code: z.string().trim().regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
});

type VerificationCodeValues = z.infer<typeof schema>;

interface UseVerificationCodeResult {
  form: UseFormReturn<VerificationCodeValues>;
  onSubmit: (v: VerificationCodeValues) => void;
}

export const useVerificationCode = (): UseVerificationCodeResult => {
    const navigate = useNavigate();
    
    const form = useForm<VerificationCodeValues>({
        resolver: zodResolver(schema),        
        mode: "onSubmit",
        defaultValues: {
            otp_code: "",
        },
    });
    const { setOtpInfoValue } = useCombineStore();  
        
    const onSubmit = (payload:VerificationCodeValues) => {
        setOtpInfoValue({otp_code: payload.otp_code});
        navigate('/auth/reset-password');        
    }

    return { form, onSubmit };
};
