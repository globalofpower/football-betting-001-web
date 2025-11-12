export const betSlice = (set:any) => ({
    betData: {
        amount: "",
        betLists: [],
    },
    setAmountValueHandler: (payload:any) => set((prev:any) => ({ betData: {...prev.betData, amount: payload} })),
    setBetListsValueHandler: (payload:any) => set((prev:any) => ({ betData: {...prev.betData, betLists: payload} })),
});
