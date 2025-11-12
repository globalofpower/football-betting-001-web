import { useCallback} from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router";
import { useToaster } from "@/hooks/useToaster";
import { DEPOSIT_QUERY} from "@/service/tanstack/queries";

import { decodeTransferInfo, encodeTransferInfo } from "@/utils/auth-crypto";
import type { DepositPayloadType } from "@/types";
import { useAuth } from "@/auth/AuthContext";
import useFetchWallet from "../useFetchWallet";

const schema = z.object({
    payment_provider_id: z.string().min(1, "Select Payment Account"),
    amount: z.string().trim().min(1, "Amount is required").regex(/^\d+$/, "Amount must be a number").refine((val) => {
        const num = Number(val);
        return num >= 1 && num <= 100000000;
    }, "Amount must be between 1,000 and 1,000,000"),
    transaction_no: z.string().trim().regex(/^\d{6}$/, "Transaction No must be exactly 6 digits"),
})

type DepositFormValues = z.infer<typeof schema>;

interface UseDepositFormResult {
    form: UseFormReturn<DepositFormValues>;
    isLoading: boolean;
    onSubmit: (values: DepositFormValues) => void;
}

export const useDeposit = (): UseDepositFormResult => {
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
            transaction_no: "",
        },
    });
    const { isPending: isLoading, mutate: deposit } = DEPOSIT_QUERY();
    const handleDeposit = useCallback((payload: DepositPayloadType) => {
        deposit(encodeTransferInfo(payload), {
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
    },[deposit, navigate, showToast]);
    
    const onSubmit = useCallback((values: DepositFormValues) => {
        console.log(values);
        
        if(!auth || !auth?.user_id) return;
        if(!wallet)
        handleDeposit(
            { 
                user_id: auth.user_id, 
                amount: Number(values.amount),
                transaction_no: values.transaction_no,
                payment_provider_id: values.payment_provider_id,
                initial_balance: wallet.amount,
            }
        );
    },[handleDeposit]);
    
    return {form, isLoading, onSubmit}
};
