export const authInfoSlice = (set:any) => ({
    authInfo: {},
    setAuthInfoValueHandler: (payload:any) => set(() => ({ authInfo: payload })),
});