import { fetchApi } from "..";
import { BANNER_API, CHANGE_PASSWORD_API, CONFIG_SETTING_API, DEPOSIT_API, FIRST_CHANGE_PASSWORD_API, FIXTURES_API, FOOTBALL_BET_API, FOOTBALL_HALF_BET_API, GET_OTP_API, LOGIN_API, PAYMENT_API, LOTTERY_OPEN_CLOSE_API, REGISTER_API, RESET_PIN_API, SET_PIN_API, THREE_D_CLOSE_DIGIT_API, THREE_D_EXIST_AMOUNT_API, USER_INFO_API, WITHDRAWAL_API, BET_HISTORY_API, THREE_D_LUCKY_DRAW_API, THREE_D_HISTORY_API, PROVIDER_API, PROVIDER_CONNECT_LIST_API, GAMES_LIST_API, GAME_INIT_API, THREE_D_LUCKY_NUMS_API, TWO_D_HISTORY_API, TWO_D_LUCKY_NUMS_API, GOALS_API, TWO_D_EXIST_AMOUNT_API, TWO_D_CLOSE_DIGIT_API, TWO_D_LUCKY_DRAW_API, FEEDBACK_API, WALLET_TRNSACTIONS_API, NOTIFICATION_API } from "../apis";

export const loginService = (data: any) => fetchApi({ api: LOGIN_API, data, method: "POST" });
export const registerService = async (data: any) => fetchApi({ api: REGISTER_API, data, method: "POST" });
export const getOtpService = async (data: any) => fetchApi({ api: GET_OTP_API, data, method: "POST" });
export const changePasswordService = async (data: any) => fetchApi({ api: CHANGE_PASSWORD_API, data, method: "POST" });
export const firstChangePasswordService = async (data: any) => fetchApi({ api: FIRST_CHANGE_PASSWORD_API, data, method: "POST" });
export const forgotPasswordOtpService = async (data: any) => fetchApi({ api: SET_PIN_API, data, method: "POST" });
export const resetPasswordService = async (data: any) => fetchApi({ api: RESET_PIN_API, data, method: "POST" });

export const fetchUserInfoService = async () => fetchApi({ api: USER_INFO_API, data:{}, method: "GET" });
export const fetchBannerService = async () => fetchApi({ api: BANNER_API, data:{}, method: "GET" });
export const sendFeedbackService = async (data: any) => await fetchApi({ api: FEEDBACK_API, data, method: "POST" });
export const getFeedbackService = async () => await fetchApi({ api: FEEDBACK_API, data:{}, method: "GET" });


export const fetchSettingService = async () => fetchApi({ api: CONFIG_SETTING_API, data:{}, method: "GET" });
export const fetchFixtureService = async ({isHalf,isParlay}:any) => fetchApi({ api: `${FIXTURES_API}?source=frontend&sortColumn=fixture_timestamp&sortDirection=asc&limit=500${isHalf? `&is_half=active`: '&status=active'}${isHalf? `&half_is_published=0`: '&is_published=0'}${isParlay ? '&is_parlay=active':''}`, data:{}, method: "GET" });
export const footballBetService = async (data: any, type:any) => fetchApi({ api: type === "1st-half"? FOOTBALL_HALF_BET_API : FOOTBALL_BET_API, data, method: "POST" });
export const fetchVoucherService = async (date:any) => await fetchApi({ api: BET_HISTORY_API + `?start_date=${date?.start_date}&end_date=${date?.end_date}`, data:{}, method: "GET"});
export const fetchVoucherDetailService = async (id:any) => await fetchApi({ api: BET_HISTORY_API + `?id=${id}`, data:{}, method: "GET"});
export const fetchGoalsService = async ({ start_date, end_date, status}:any) => {
    let paras = () => {
        switch (status){
            case "completed":
                return `&status=completed`;
            case "half":
                return `&half_status=completed&is_half=active`;
            case "cancel":
                return `&status=cancel`;
            default:
                return '';
        }
    };
    return await fetchApi({api: GOALS_API + `?start_date=${start_date}&end_date=${end_date}&limit=500` + paras(), data:{}, method: "GET"});
};

export const fetchLotteryEmergencyTimeService = async (type:any) => fetchApi({ api: `${LOTTERY_OPEN_CLOSE_API}?type=MM${type === 'two'? '&is_digit=Two':''}&sortDirection=asc`, data:{}, method: "GET" });
export const fetchTwodExistAmountService = async (time:any) => fetchApi({ api: `${TWO_D_EXIST_AMOUNT_API}?time=${time}&type=MM`, data:{}, method: "GET" });
export const fetchTwodCloseDigitsService = async (time:any) => fetchApi({ api: `${TWO_D_CLOSE_DIGIT_API}?time=${time}&type=MM`, data:{}, method: "GET" });
export const fetchThreedExistAmountService = async (time:any) => fetchApi({ api: `${THREE_D_EXIST_AMOUNT_API}?time=${time}&type=MM`, data:{}, method: "GET" });
export const fetchThreedCloseDigitsService = async (time:any) => fetchApi({ api: `${THREE_D_CLOSE_DIGIT_API}?time=${time}&type=MM`, data:{}, method: "GET" });
export const lotteryBetService = async (data:any,time:any,type:any) => fetchApi({ api: (type === "2d" ? TWO_D_LUCKY_DRAW_API : THREE_D_LUCKY_DRAW_API) + `?type=MM&time=${time}` , data, method: "POST" });
export const fetchLotteryLuckyDrawService = async ({type}:any) => await fetchApi({api: (type === "2d" ? TWO_D_LUCKY_NUMS_API: THREE_D_LUCKY_NUMS_API) + `?type=MM`, data:{}, method: "GET"});
export const fetchLotteryHistoryService = async ({time, start_date, end_date, type}:any) => await fetchApi({api: (type === "2d" ? TWO_D_HISTORY_API: THREE_D_HISTORY_API) + `?start_date=${start_date}&end_date=${end_date}&time=${time}&type=MM`, data:{}, method: "GET"});
export const getPaymentService = async () => await fetchApi({ api: PAYMENT_API+"?status=active&sortColumn=id&sortDirection=asc", data:{}, method: "GET" });
export const depositService = async (data:any) => await fetchApi({ api: DEPOSIT_API, data, method: "POST" });
export const withdrawService = async (data:any) => await fetchApi({ api: WITHDRAWAL_API, data, method: "POST" });
export const getPaymentHistoryService = async ({history_type, start_date, end_date}:any) => {
    const PAYMENT_API = (history_type=="deposit") ? DEPOSIT_API : WITHDRAWAL_API;
    return await fetchApi({api: PAYMENT_API + `?start_date=${start_date}&end_date=${end_date}`, data:{}, method: "GET"});
};
export const getWalletTransactionsService = async ({start_date, end_date}:any) => await fetchApi({api: WALLET_TRNSACTIONS_API + `?start_date=${start_date}&end_date=${end_date}`, data:{}, method: "GET"});
export const getNotificationService = async () => await fetchApi({api: NOTIFICATION_API + `?status=active`, data:{}, method: "GET"});
export const getProviderService = async () => await fetchApi({ api: PROVIDER_API + "?status=active&sortDirection=asc&sortColumn=id", data:{}, method: "GET"});
export const getProviderConnectService = async () => await fetchApi({ api: PROVIDER_CONNECT_LIST_API + "?status=active", data:{}, method: "GET"});
export const getGamesListService = async (g_type:string,p_code:string,page:number,search:any) => await fetchApi({ api: GAMES_LIST_API + `?system_status=active&sortColumn=g_type` + `${search ? `&game_name=${search}&page=1&limit=500`: `&g_type=${g_type}&p_code=${p_code}&page=${page}&limit=500`}`, data:{}, method: "GET"});
export const initGameService = async (data:any) => await fetchApi({api: GAME_INIT_API, data, method: "POST" });
