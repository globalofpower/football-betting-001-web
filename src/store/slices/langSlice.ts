export const langSlice = (set: any) => ({
  langValue: localStorage.getItem('lang') || "unicode",
  setLangValueHandler: (payload:any) => set(() => ({ langValue: payload })),
});
