import { useEffect, useState } from "react";
import { PAYMENT_QUERY } from "@/service/tanstack/queries";
import { decodeTransferInfo } from "@/utils/auth-crypto";

interface UsePaymentResult {
    payments: any[];
    isFetching: boolean;
}

export const usePayment = (): UsePaymentResult => {
    const [payments, setPayments] = useState<any[]>([]); 
    const { data: allPayments, isFetching } = PAYMENT_QUERY();
    useEffect(()=>{
        let deData = decodeTransferInfo(allPayments);
        if (deData?.status === 'success') {
            setPayments(deData?.data);
        }
        if (isFetching) {
            setPayments([]);
        }        
    },[allPayments]);
    
    return {payments, isFetching}
};
