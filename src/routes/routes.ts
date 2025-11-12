import { withLoader } from "./loadable";


// main
export const HomePage = withLoader(() => import("@/pages/HomePage"));

// auth
export const LoginPage = withLoader(() => import("@/pages/auth/LoginPage"))
export const RegisterPage = withLoader(() => import("@/pages/auth/RegisterPage"))
export const ForgotPasswordPage = withLoader(() => import("@/pages/auth/ForgotPasswordPage"));
export const VerificationCodePage = withLoader(() => import("@/pages/auth/VerificationCodePage"));
export const ResetPasswordPage = withLoader(() => import("@/pages/auth/ResetPasswordPage"));
export const ChangePasswordPage = withLoader(() => import("@/pages/auth/ChangePasswordPage"));
