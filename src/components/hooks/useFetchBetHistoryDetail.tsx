import { useToaster } from "@/hooks/useToaster";
import { GET_BET_LIST_DATA } from "@/service/graphql/queries";
import { GET_BET_LIST_DATA_SERVICE } from "@/service/graphql/queryService";
import { graphqlAuthError } from "@/utils/auth";
// import { VOUCHER_DETAIL_QUERY } from "@/service/tanstack/queries";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export const useFetchBetHistoryDetail = () => {
    const {id} = useParams();
    const { showToast } = useToaster();
    const [voucher,setVoucher] = useState<any>([]);
    const {loading, error, data}:any = GET_BET_LIST_DATA_SERVICE(GET_BET_LIST_DATA, id);


    useEffect(()=>{
        const isAuthError = graphqlAuthError.some(msg => error?.message?.includes(msg));
        if (isAuthError) {
            return showToast("Invalid Auth",'error');
        };
    },[error]);
    
    useEffect(() => {
        if (data) {
            if (data?.betting) {
                setVoucher(data?.betting);
            } else {
                setVoucher([]);
            };
        };
    }, [data]);
    
    return {data: voucher, loading}
}