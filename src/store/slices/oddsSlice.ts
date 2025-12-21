export const oddsSlice = (set:any) => ({
    oddsValue: {
        fullTime: location.pathname.includes('body') ? true : false,
        firstHalf: location.pathname.includes('1st-half') ? true : false,
        evenOdd: location.pathname.includes('even-odd') ? true : false,
        onextwo: location.pathname.includes('1x2') ? true : false,
        corretScores: location.pathname.includes('correct-scores') ? true : false
    },
    setOddsValueHandler: (payload:any) => set(() => ({ oddsValue: payload })),
});