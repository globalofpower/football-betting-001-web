export const oddsSlice = (set:any) => ({
    oddsValue: {
        fullTime: true,
        firstHalf: false,
        evenOdd: false,
        onextwo: false,
        corretScores: false
    },
    setOddsValueHandler: (payload:any) => set(() => ({ oddsValue: payload })),
});