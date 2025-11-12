export const totalMatchSlice = (set:any) => ({
    totalMatchValue: 0,
    setTotalMatchValueHandler: (payload:any) => set(() => ({ totalMatchValue: payload })),
});