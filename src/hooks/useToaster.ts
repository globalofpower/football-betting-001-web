// src/hooks/useToast.ts
import { customToast } from "@/components/ui/custom-toast";

export const useToaster = () => {
    const showToast = (        
        message: string,
        type: "success" | "error" | "info" | "warning" = "success",        
        delay: number = 1500,
    ) => {
        customToast({message, type, delay });
    };

    return { showToast };
};
