import { useCallback } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router";
import { useToaster } from "@/hooks/useToaster";
import { WITHDRAWAL_QUERY } from "@/service/tanstack/queries";

import { decodeTransferInfo, encodeTransferInfo } from "@/utils/auth-crypto";
import type { WithdrawPayloadType } from "@/types";
import { useAuth } from "@/auth/AuthContext";
import useFetchWallet from "../useFetchWallet";

const schema = z.object({
    payment_provider_id: z.string().min(1, "Select Payment Method"),
    amount: z.string().trim().min(1, "Amount is required").regex(/^\d+$/, "Amount must be a number").refine((val) => {
        const num = Number(val);
        return num >= 1 && num <= 100000000;
    }, "Amount must be between 1,000 and 1,000,000"),
    phone: z.string(),
    name: z.string()
})

type DepositFormValues = z.infer<typeof schema>;

interface UseDepositFormResult {
    form: UseFormReturn<DepositFormValues>;
    isLoading: boolean;
    onSubmit: (values: DepositFormValues) => void;
}

export const useWithdraw = (): UseDepositFormResult => {
    const navigate = useNavigate();
    const { showToast } = useToaster();

    const {auth} = useAuth();
    const {data:wallet} = useFetchWallet();
    const form = useForm<DepositFormValues>({
        resolver: zodResolver(schema),        
        mode: "onSubmit",
        defaultValues: {
            amount: "",
            payment_provider_id: "",
            phone: "",
            name: ""
        },
    });
 
    const { isPending: isLoading, mutate: withdraw } = WITHDRAWAL_QUERY();
    const handleWithdraw = useCallback((payload: WithdrawPayloadType) => {
        withdraw(encodeTransferInfo(payload), {
            onSuccess: (res: any) => {
                let deData = decodeTransferInfo(res);
                if (deData?.status === "success") {
                    showToast(deData?.message, "success");
                    navigate("/profile");
                } else{
                    showToast(res.message, "error");
                }
            },
            onError: (error: Error) => {                    
                showToast(error.message, "error");
            },
        });
    },[withdraw, navigate, showToast]);
    
    const onSubmit = useCallback((values: DepositFormValues) => {
        if(!auth || !auth?.user_id) return;
        if(!wallet)
        if(wallet.amount < values.amount) {
            return showToast("ငွေထုတ်ရဲ သင့်ရှိလက်ကျန်ငွေ မလုံလောက်ပါ။","error")
        }
        handleWithdraw(
            { 
                user_id: auth.user_id, 
                amount: Number(values.amount),
                name: values.name,
                phone: values.phone,
                payment_provider_id: values.payment_provider_id,
                initial_balance: wallet.amount,
            }
        );
    },[handleWithdraw]);
    
    return { form, isLoading, onSubmit}
};
