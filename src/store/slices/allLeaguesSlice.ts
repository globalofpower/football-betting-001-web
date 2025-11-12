export const allLeaguesSlice = (set:any) => ({
    allLeaguesValue: [],
    setAllLeaguesValueHandler: (payload:any) => set(() => ({ allLeaguesValue: payload })),
});
  