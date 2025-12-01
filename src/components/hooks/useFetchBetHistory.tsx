import { useEffect, useState } from "react";
import { useCombineStore } from "@/store";
import { useToaster } from "@/hooks/useToaster";
import { FetchBetHistory } from "@/service/graphql/queryService";
import { graphqlAuthError } from "@/utils/auth";


export const useFetchBetHistory = () => {
    const { showToast } = useToaster();
    const {date} = useCombineStore();  
    const [vouchers,setVouchers] = useState<any>([]);

    let payload = {
        page: 1,
        pageSize: 100,
        startDate: date?.start_date,
        endDate: date?.end_date,
    };
    const { loading, error, data }: any = FetchBetHistory({ payload: payload, pollInterval: 1000 * 60 });

    useEffect(()=>{
        const isAuthError = graphqlAuthError.some(msg => error?.message?.includes(msg));
        if (isAuthError) {
            return showToast("Invalid Auth",'error');
        };
    },[error]);
    
    useEffect(() => {
        if (data) {
            if (data.bettings) {
                setVouchers(data?.bettings?.data);
            } else {
                setVouchers([]);
            };
        };
    }, [data]);
    
    return {data: vouchers, loading}
};
