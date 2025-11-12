export const settingSlice = (set:any) => ({
    setting: {},
    setSettingValueHandler: (payload:any) => set(() => ({ setting: payload })),
});