export const otpInfoSlice = (set: any) => ({
  otpInfoValue: { 
    phone: "",
    otp_code: "",
  },
  setOtpInfoValue: (payload:any) => set((state:any) => ({otpInfoValue:{ ...state.otpInfoValue, ...payload }})),
});
