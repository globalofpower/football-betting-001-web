// src/auth/types.ts
export type AuthBlob = {
    user_id: number | string | undefined;
    token: string | undefined;
    // future fields: roles?: string[]; profile?: { name: string; ... }
};

export type ImageProps = {
  src: string;
  alt?: string;
  style?: React.CSSProperties;
  className?: string;
};

export type BannerType = {
  id: number;
  photo: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type IconType = {
  size: string;
  color?: string;
  style?: React.CSSProperties;
};

export type FootballCardType = {
    img: string;
    name: string;
    href: string;
}
export interface LoginPayload {
    username: string;
    password: string;
}

export interface LoginDecodeResponse {
    status: "success" | string;
    message?: string;
    data?: {
        token: string;
        user_id: number | string;
        user_role: string;
    };
}
export interface LoginSuccessResponse {
    result: string;
    message?: string;
}

export interface RegisterPayloadType {
    name: string;
    username: string;
    phone: string;
    password: string;
    password_confirmation: string;
    otp: string;
}

export type FootballMatchParaType = {
  isParlay: boolean;
  fetchPolicy?: string | any;
}

export type matchType = {
  market: string;
  match: string;
}

export type dialogType = {
  open: boolean;
  setOpen: (value: boolean) => void;
  label: string;
  children: React.ReactNode;
  isCancelButton?: boolean;
  event?: () => void;
}

export type ResetPasswordPayloadType = {
    phone: string;
    token: string;
    password: string;
    password_confirmation: string;
}

export type ChangePasswordPayloadType = {
    old_password: string;
    password: string;
    password_confirmation: string;
}

export type DepositPayloadType = {
    user_id: string | number;
    amount: number;
    transaction_no: string;
    payment_provider_id: string;
    initial_balance: number;
}

export type WithdrawPayloadType = {
    user_id: string | number;
    amount: number;
    payment_provider_id: string;
    phone: string;
    name: string;
    initial_balance: number;
}

export type PaymentHistoryQueryType = {
    start_date: any;
    end_date: any;
    history_type: string;
}