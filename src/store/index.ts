import { create } from 'zustand';
import { langSlice } from './slices/langSlice';
import { allLeaguesSlice } from './slices/allLeaguesSlice';
import { searchMatchSlice } from './slices/searchMatchSlice';
import { totalMatchSlice } from './slices/totalMatchSlice';
import { filterLeaguesSlice } from './slices/filterLeaguesSlice';
import { sortByTypeSlice } from './slices/sortByTypeSlice';
import { refetchSlice } from './slices/refetchSlice';
import { betSlice } from './slices/betSlice';
import { authInfoSlice } from './slices/authInfoSlice';
import { settingSlice } from './slices/settingSlice';
import { otpInfoSlice } from './slices/otpInfoSlice';
import { dateSlice } from './slices/dateSlice';

export const useCombineStore = create<any>()(
      (set, _get, _api) => ({
        ...langSlice(set),
        ...refetchSlice(set),
        ...allLeaguesSlice(set),
        ...searchMatchSlice(set),
        ...totalMatchSlice(set),
        ...filterLeaguesSlice(set),
        ...sortByTypeSlice(set),
        ...betSlice(set),
        ...authInfoSlice(set),
        ...settingSlice(set),
         ...otpInfoSlice(set),
         ...dateSlice(set),
      }),
);
