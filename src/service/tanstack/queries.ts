import { useMutation } from "@tanstack/react-query";
import { footballBetService } from "./service";

export const FOOTBALL_BET_QUERY = () => {    
    return useMutation({
        mutationFn: ({data}:any) => footballBetService(data),
    })
};

// export const VOUCHER_DETAIL_QUERY:any = ({id}:any) => {
//   return useQuery({
//     queryKey: ["voucher-detail",id],
//     queryFn: ()=> fetchVoucherDetailService(id),
//     enabled: true,
//     gcTime: 0,
//     staleTime: 0,
//     networkMode: 'offlineFirst',
//   });
// };