export const sortByTypeSlice = (set:any) => ({
    sortByTypeValue: "time",
    setSortByTypeValueHandler: (payload:any) => set(() => ({ sortByTypeValue: payload })),
});
  