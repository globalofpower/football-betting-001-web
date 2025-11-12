import dayjs from "dayjs";

export const dateSlice = (set: any) => ({
  date: dayjs().format("YYYY-MM-DD"),
  setDate: (payload:any) => set(() => ({ date: payload })),
});
