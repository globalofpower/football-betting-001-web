export const filterLeaguesSlice = (set:any) => ({
    filterLeaguesValue: [],
    setFilterLeaguesValueHandler: (payload:any) => set(() => ({ filterLeaguesValue: payload })),
});