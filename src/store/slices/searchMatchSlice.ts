export const searchMatchSlice = (set:any) => ({
    searchMatchValue: "",
    setSearchMatchValueHandler: (payload:any) => set(() => ({ searchMatchValue: payload })),
});
  