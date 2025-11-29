import { create } from 'zustand';
import { oddsSlice } from './slices/oddsSlice';
import { langSlice } from './slices/langSlice';
import { allLeaguesSlice } from './slices/allLeaguesSlice';
import { filterLeaguesSlice } from './slices/filterLeaguesSlice';
import { searchMatchSlice } from './slices/searchMatchSlice';
import { sortByTypeSlice } from './slices/sortByTypeSlice';
import { refetchSlice } from './slices/refetchSlice';
import { betSlice } from './slices/betSlice';


export const useCombineStore = create<any>()(
      (set, _get, _api) => ({
        ...langSlice(set),
        ...oddsSlice(set),
        ...allLeaguesSlice(set),
        ...filterLeaguesSlice(set),
        ...searchMatchSlice(set),
        ...sortByTypeSlice(set),
        ...refetchSlice(set),
        ...betSlice(set),
      }),
);
