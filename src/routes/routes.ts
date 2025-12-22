import { withLoader } from "./loadable";


// main
export const BodyPage = withLoader(() => import("@/pages/BodyPage"));
export const FirstHalfPage = withLoader(() => import("@/pages/FirstHalfPage"));
export const OddEvenPage = withLoader(() => import("@/pages/EvenOddPage"));
export const ParlayPage = withLoader(() => import("@/pages/ParlayPage"));
export const BetConfirmPage = withLoader(() => import("@/pages/BetConfirmPage"));
export const VouchersPage = withLoader(() => import("@/pages/VouchersPage"));
export const VoucherPage = withLoader(() => import("@/pages/VoucherPage"));