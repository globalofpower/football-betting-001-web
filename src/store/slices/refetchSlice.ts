export const refetchSlice = (set:any) => ({
    refetchValue: null,
    setRefetchHandler: (func:any) => set(() => ({ refetchValue: func })),
});
  