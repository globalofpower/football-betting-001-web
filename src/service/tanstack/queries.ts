import { useMutation, useQuery } from "@tanstack/react-query";
import { changePasswordService, depositService, fetchBannerService, fetchUserInfoService, forgotPasswordOtpService, fetchFixtureService, fetchSettingService, footballBetService, getOtpService, getPaymentHistoryService, getPaymentService, loginService, registerService, resetPasswordService, withdrawService, fetchLotteryEmergencyTimeService, fetchThreedExistAmountService, fetchThreedCloseDigitsService, fetchVoucherService, fetchVoucherDetailService, lotteryBetService, fetchLotteryHistoryService, getProviderService, getProviderConnectService, getGamesListService, initGameService, fetchLotteryLuckyDrawService, fetchGoalsService, fetchTwodExistAmountService, fetchTwodCloseDigitsService, sendFeedbackService, getWalletTransactionsService, getNotificationService, getFeedbackService} from "./service";

export const LOGIN_QUERY = () => {    
    return useMutation({
        mutationFn: (data:any) => loginService(data),
    })
};

export const REGISTER_QUERY = () => {    
    return useMutation({
        mutationFn: (data:any) => registerService(data),
    })
}

export const GET_OTP_QUERY = () => {
  return useMutation({
    mutationFn: (data:any) => getOtpService(data),
  })
}

export const FORGOT_PASSWORD_OTP_QUERY = () => {
  return useMutation({
    mutationFn: (data:any) => forgotPasswordOtpService(data),
  })
}

export const RESET_PASSWORD_QUERY = () => {
  return useMutation({
    mutationFn: (data:any) => resetPasswordService(data),
  })
}

export const CHANGE_PASSWORD_QUERY = () => {
  return useMutation({
    mutationFn: (data:any) => changePasswordService(data),
  })
}


export const BANNER_QUERY = () => {
  return useQuery({
    queryKey: ["banner"],
    queryFn: () => fetchBannerService(),
    enabled: true,
    gcTime: 1000 * 60 * 5, // 5 မိနစ်ကြာ cache ထားမယ်
    staleTime: 1000 * 60 * 1, // 1 မိနစ်ကြာ data ကို stale မဖြစ်စေဘူး , 1 မိနစ်အတွင်းဆို api ထပ်မခေါ်ဘူး refetchOnMount, refetchOnWindowFocus စတာတွေ အလုပ်လုပ်မှာမဟုတ်ဘူး
    networkMode: 'offlineFirst',
  });
};

export const USER_INFO_QUERY = () => {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: () => fetchUserInfoService(),
    enabled: false,
    gcTime: 0, 
    staleTime: 0,
    networkMode: 'offlineFirst',
  });
};

export const SEND_FEEDBACK_QUERY = () => {
  return useMutation({
    mutationFn: (data:any) => sendFeedbackService(data),
  })
}

export const GET_FEEDBACK_QUERY = () => {
  return useQuery({
    queryKey: ["feedbacks"],
    queryFn: () => getFeedbackService(),
    enabled: true,
    gcTime: 0, 
    staleTime: 0,
    networkMode: 'offlineFirst',
  });
};

export const SETTING_QUERY = () => {
  return useQuery({
    queryKey: ["setting"],
    queryFn: () => fetchSettingService(),
    enabled: false,
    gcTime: 0, 
    staleTime: 0,
    networkMode: 'offlineFirst',
  });
};

export const MATCHES_QUERY = ({isHalf,isParlay}:any) => {
  return useQuery({
    queryKey: ["matches",isHalf,isParlay],
    queryFn: () => fetchFixtureService({isHalf,isParlay}),
    enabled: true,
    gcTime: 0, 
    staleTime: 0,
    networkMode: 'offlineFirst',
  });
};

export const GOALS_QUERY:any = (payload:any) => {
  return useQuery({
    queryKey: ["goals",payload],
    queryFn: ()=> fetchGoalsService(payload),
    enabled: false,
    gcTime: 0,
    staleTime: 0,
    networkMode: 'offlineFirst',
  });
};

export const LOTTERY_EMERGENCY_TIME_QUERY = (type:any) => {
  return useQuery({
    queryKey: ["emergencyTime",type],
    queryFn: () => fetchLotteryEmergencyTimeService(type),
    enabled: true,
    gcTime: 0, 
    staleTime: 0,
    networkMode: 'offlineFirst',
  });
};

export const PAYMENT_QUERY:any = () => {
  return useQuery({
    queryKey: ["payments"],
    queryFn: getPaymentService,
    enabled: true,
    gcTime: 0,
    staleTime: 0,
    networkMode: 'offlineFirst',
  });
};

export const THREED_EXIST_AMOUNT_QUERY = (time:any) => {
  return useQuery({
    queryKey: ["threedExistAmount",time],
    queryFn: () => fetchThreedExistAmountService(time),
    enabled: true,
    gcTime: 0, 
    staleTime: 0,
    networkMode: 'offlineFirst',
  });
};

export const TWOD_EXIST_AMOUNT_QUERY = (time:any) => {
  return useQuery({
    queryKey: ["twodExistAmount",time],
    queryFn: () => fetchTwodExistAmountService(time),
    enabled: true,
    gcTime: 0, 
    staleTime: 0,
    networkMode: 'offlineFirst',
  });
};

export const DEPOSIT_QUERY = () => {
  return useMutation({
    mutationFn: (data:any) => depositService(data),
  });
};

export const WITHDRAWAL_QUERY = () => {
  return useMutation({
    mutationFn: (data:any) => withdrawService(data)
  })
};

export const PAYMENT_HISTORY_QUERY:any = (payload:any) => {
  return useQuery({
    queryKey: ["payment-history",payload],
    queryFn: ()=> getPaymentHistoryService(payload),
    enabled: true,
    gcTime: 0,
    staleTime: 0,
    networkMode: 'offlineFirst',
  })
};

export const WALLET_TRANSACTIONS_QUERY:any = (payload:any) => {
  return useQuery({
    queryKey: ["wallet-transations",payload],
    queryFn: ()=> getWalletTransactionsService(payload),
    enabled: true,
    gcTime: 0,
    staleTime: 0,
    networkMode: 'offlineFirst',
  })
};

export const NOTIFICATION_QUERY:any = () => {
  return useQuery({
    queryKey: ["notification",],
    queryFn: ()=> getNotificationService(),
    enabled: true,
    gcTime: 0,
    staleTime: 0,
    networkMode: 'offlineFirst',
  })
}

export const THREED_CLOSE_DIGITS_QUERY = (time:any) => {
  return useQuery({
    queryKey: ["threedCloseDigits",time],
    queryFn: () => fetchThreedCloseDigitsService(time),
    enabled: true,
    gcTime: 0, 
    staleTime: 0,
    networkMode: 'offlineFirst',
  });
};

export const TWO_CLOSE_DIGITS_QUERY = (time:any) => {
  return useQuery({
    queryKey: ["twodCloseDigits",time],
    queryFn: () => fetchTwodCloseDigitsService(time),
    enabled: true,
    gcTime: 0, 
    staleTime: 0,
    networkMode: 'offlineFirst',
  });
};

export const FOOTBALL_BET_QUERY = () => {    
    return useMutation({
        mutationFn: ({data, type}:any) => footballBetService(data,type),
    })
};

export const LOTTERY_BET_QUERY = () => {    
    return useMutation({
        mutationFn: ({data, time,type}:any) => lotteryBetService(data,time,type),
    })
};

export const LOTTERY_HISTORY_QUERY:any = (payload:any) => {
  return useQuery({
    queryKey: ["lottery-history",payload],
    queryFn: ()=> fetchLotteryHistoryService(payload),
    enabled: true,
    gcTime: 0,
    staleTime: 0,
    networkMode: 'offlineFirst',
  });
};

export const LOTTERY_LUCKY_DRAW_QUERY:any = ({type}:any) => {
  return useQuery({
    queryKey: ["lottery-lucky-draw",type],
    queryFn: ()=> fetchLotteryLuckyDrawService({type}),
    enabled: true,
    gcTime: 0,
    staleTime: 0,
    networkMode: 'offlineFirst',
  });
};

export const VOUCHER_QUERY:any = ({date}:any) => {
  return useQuery({
    queryKey: ["voucher",date],
    queryFn: ()=> fetchVoucherService(date),
    enabled: true,
    gcTime: 0,
    staleTime: 0,
    networkMode: 'offlineFirst',
  });
};

export const VOUCHER_DETAIL_QUERY:any = ({id}:any) => {
  return useQuery({
    queryKey: ["voucher-detail",id],
    queryFn: ()=> fetchVoucherDetailService(id),
    enabled: true,
    gcTime: 0,
    staleTime: 0,
    networkMode: 'offlineFirst',
  });
};


export const PROVIDER_QUERY:any = () => {
  return useQuery({
    queryKey: ["providers"],
    queryFn: () => getProviderService(),
    enabled: true,
    gcTime: 0,
    staleTime: 0,
    networkMode: 'offlineFirst',
  })
}

export const PROVIDER_CONNECT_QUERY:any = () => {
  return useQuery({
    queryKey: ["provider-connect"],
    queryFn: () => getProviderConnectService(),
    enabled: true,
    gcTime: 0,
    staleTime: 0,
    networkMode: 'offlineFirst',
  })
};

export const GAMES_LIST_QUERY:any = ({g_type,p_code,page, search}:any) => {
  return useQuery({
    queryKey: ["games-list",g_type,p_code,page, search],
    queryFn: () => getGamesListService(g_type,p_code,page, search),
    enabled: true,
    gcTime: 0,
    staleTime: 0,
    networkMode: 'offlineFirst',
  });
};

export const GAME_INIT_QUERY:any = () => {
  return useMutation({
        mutationFn: (data:any) => initGameService(data),
    })
}