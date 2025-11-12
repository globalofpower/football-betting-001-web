export const domain =  import.meta.env.VITE_REACT_APP_DOMAIN;

export const LOGIN_API = `${domain}api/user/login`;
export const REGISTER_API = `${domain}api/register`;
export const GET_OTP_API = `${domain}api/send-otp`;
export const CHANGE_PASSWORD_API = `${domain}api/change-password`;
export const FIRST_CHANGE_PASSWORD_API = `${domain}api/first-time-change-password`;
export const SET_PIN_API = `${domain}api/set-pin`;
export const RESET_PIN_API = `${domain}api/reset-pin`;

export const BANNER_API = `${domain}api/banners`;
export const USER_INFO_API = `${domain}api/auth-info`;
export const FEEDBACK_API = `${domain}api/recommendation-letter`;

export const PAYMENT_API = `${domain}api/payments`;
export const DEPOSIT_API = `${domain}api/deposits`;
export const WITHDRAWAL_API = `${domain}api/withdraws`;
export const WALLET_TRNSACTIONS_API = `${domain}api/other-transaction-histories`;
export const NOTIFICATION_API = `${domain}api/advertises`;


// football

export const FIXTURES_API = `${domain}api/fixtures`;
export const CONFIG_SETTING_API = `${domain}api/setting`;
export const FIXTURE_IMAGE_API = (image_id: string | number) => `https://assets.b365api.com/images/team/m/${image_id}.png`;
export const DEFAULT_IMAGE = 'https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg';
// for football 1st & 2nd half 
export const FOOTBALL_BET_API = `${domain}api/football-betting`;
export const FOOTBALL_HALF_BET_API = `${domain}api/half-football-betting`;
export const BET_HISTORY_API = `${domain}api/bettings`;
export const GOALS_API = `${domain}api/goal-confirm-result`;

// lottery
export const LOTTERY_OPEN_CLOSE_API = `${domain}api/emergency-open-close-time`;
export const TWO_D_EXIST_AMOUNT_API = `${domain}api/check-two-exist-amount-to-bet`;
export const TWO_D_CLOSE_DIGIT_API = `${domain}api/close-two-digit`;
export const TWO_D_LUCKY_DRAW_API = `${domain}api/two-lucky-draw`;
export const THREE_D_EXIST_AMOUNT_API = `${domain}api/check-three-exist-amount-to-bet`;
export const THREE_D_CLOSE_DIGIT_API = `${domain}api/close-three-digit`;
export const THREE_D_LUCKY_DRAW_API = `${domain}api/three-lucky-draw`;
export const THREE_D_HISTORY_API = `${domain}api/three-user-betting-history`;
export const THREE_D_LUCKY_NUMS_API = `${domain}api/three-lucky-number`;

export const TWO_D_LUCKY_NUMS_API = `${domain}api/two-lucky-number`;
export const TWO_D_HISTORY_API = `${domain}api/two-user-betting-history`;

// slote
export const PROVIDER_API = `${domain}api/providers`;
export const PROVIDER_CONNECT_LIST_API = `${domain}api/provider-connect-lists`;
export const GAMES_LIST_API = `${domain}api/game-lists`;
export const GAME_INIT_API = `${domain}api/init`;