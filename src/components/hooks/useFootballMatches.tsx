import { useToaster } from '@/hooks/useToaster';
import { soccer_domain } from '@/service/apis';
import { GET_FIXTURES_DATA_SERVICE } from '@/service/graphql/queryService';
import { useCombineStore } from '@/store';
import { graphqlAuthError } from '@/utils/auth';
import { replaceZeotoQqual } from '@/utils/Helper';
import { useEffect, useState } from 'react';
import { io } from "socket.io-client";

const useFootballMatches = ({isHalf, isParlay}:{isHalf: boolean, isParlay: boolean}) => {
  const [events, setEvents] = useState<any>([]);
  const [filterData, setFilterData] = useState<any>({});
  const {filterLeaguesValue, setFilterLeaguesValueHandler} = useCombineStore();
  const {setAllLeaguesValueHandler} = useCombineStore();
  const {searchMatchValue} = useCombineStore();
  const {setRefetchHandler} = useCombineStore();
  const {sortByTypeValue} = useCombineStore();
  const [socketOdds,setSocketOdds] = useState<any>({});

  const { showToast } = useToaster();
  const fixturesQuery:any = GET_FIXTURES_DATA_SERVICE({isParlay});

  const groupDataByLeague = (inputData:any, filter = false) => {
    if (filter) {
      const filtered_group:any = {};
      Array.from(inputData)
        ?.sort((a:any, b:any) => {
          const leageA = a?.league_data?.name_en;
          const leageB = b?.league_data?.name_en;
          if (leageA > leageB) return 1;
          if (leageA < leageB) return -1;
          return 0;
        })
        .forEach((item:any) => {
          const league = item.league_data.name_en;
          if (!filtered_group[league]) {
            filtered_group[league] = [];
          }
          filtered_group[league].push(item);
        });
      return filtered_group;
    };

    const groupData = inputData.filter((el:any) => {
      const key = searchMatchValue?.toLocaleLowerCase();
      const home_mm = el?.host_team_data?.name_mm;
      const home_en = el?.host_team_data?.name_en?.toLocaleLowerCase();
      const away_mm = el?.guest_team_data?.name_mm;
      const away_en = el?.guest_team_data?.name_en?.toLocaleLowerCase();
      const league = el?.league_data?.name_en?.toLocaleLowerCase();
      const bdy_symbol = replaceZeotoQqual(el?.odds?.full_time?.hdp_mm_odds)?.join("");
      const total_symbol = replaceZeotoQqual(el?.odds?.full_time?.ou_mm_odds)?.join("");
      const odds_team = el?.odds?.full_time?.odds_team?.toLocaleLowerCase();
      return (
        filterLeaguesValue?.includes(el?.league_data?.name_en) &&
        (home_mm?.includes(key) ||
          home_en?.includes(key) ||
          away_mm?.includes(key) ||
          away_en?.includes(key) ||
          league?.includes(key) ||
          bdy_symbol?.includes(key) ||
          total_symbol?.includes(key) ||
          odds_team?.includes(key))
      );
    });

    if(isParlay){
      let mg_sort;
      if (sortByTypeValue === "league") {
        mg_sort = groupData.sort((a:any, b:any) => {
          const leageA = a.league_data.name;
          const leageB = b.league_data.name;
          if (leageA > leageB) return 1;
          if (leageA < leageB) return -1;
          return 0;
        });
      }
      if (sortByTypeValue === "time") {
        mg_sort = groupData.sort(
          (a:any, b:any) => a.fixture_timestamp - b.fixture_timestamp
        );
      }
      const mg_group:any = {};
      mg_sort.forEach((item:any) => {
        const league = item.league_data.name + ",MG" + item.fixture_timestamp;
        if (!mg_group[league]) {
          mg_group[league] = [];
        }
        mg_group[league].push(item);
      });

      if (sortByTypeValue === "time") {
        return mg_group;
      };
      return mg_group;
    }else{
      let return_data;
      if (sortByTypeValue === "league") {
        const sm_lg_group:any = {};
        const body_sm_lg = groupData.sort((a:any, b:any) => {
          const leageA = a.league_data.name;
          const leageB = b.league_data.name;
          if (leageA > leageB) return 1;
          if (leageA < leageB) return -1;
          return 0;
        });

        body_sm_lg.forEach((item:any) => {
          const league =
            item.league_data.name + ",SM+LG" + item.fixture_timestamp;
          if (!sm_lg_group[league]) {
            sm_lg_group[league] = [];
          }
          sm_lg_group[league].push(item);
        });
        return_data = sm_lg_group;
      };
      if (sortByTypeValue === "time") {
        const body_sm = groupData
          .filter((el:any) => !el?.is_popular_match)
          .sort((a:any, b:any) => a.fixture_timestamp - b.fixture_timestamp);
        const body_lg = groupData
          .filter((el:any) => el?.is_popular_match)
          .sort((a:any, b:any) => a.fixture_timestamp - b.fixture_timestamp);

        const sm_group:any = {};
        body_sm.forEach((item:any) => {
          const league = item.league_data.name_en + ",SM" + item.fixture_timestamp;
          if (!sm_group[league]) {
            sm_group[league] = [];
          }
          sm_group[league].push(item);
        });

        const lg_group:any = {};
        body_lg.forEach((item:any) => {
          const league = item.league_data.name_en + ",LG" + item.fixture_timestamp;
          if (!lg_group[league]) {
            lg_group[league] = [];
          }
          lg_group[league].push(item);
        });
        return_data = { ...lg_group, ...sm_group };
      };
      return return_data;
    };
  };

  useEffect(() => {
    if(fixturesQuery){
      const isAuthError = graphqlAuthError.some(msg => fixturesQuery?.error?.message?.includes(msg));
      if (isAuthError) {
        return showToast("Invalid Auth",'error');
      };
      setRefetchHandler(fixturesQuery?.refetch);
      if (fixturesQuery?.data) {
        if (fixturesQuery.data.matches) {
          setEvents(fixturesQuery?.data?.matches);
          setFilterLeaguesValueHandler(Object.keys(groupDataByLeague(fixturesQuery?.data?.matches, true)));
        } else {
          setEvents([]);
        }
      };
    };
  }, [fixturesQuery]);

  useEffect(() => {
    const socket = io(soccer_domain,{
        transports: ["websocket"],
        path: '/api/soccer/socket',
    });
    
    socket.connect();
    socket.on("connect", () => {
      console.log("socket connected...");
    });
    socket.on("disconnect", () => {
      console.log("socket disconnected...");
    });
    if(isHalf){
      socket.on("fh_odds_updated_data", (data) => {
        setSocketOdds(data);
      });
    }else{
      socket.on("ft_odds_updated_data", (data) => {
        setSocketOdds(data);
      });
    };
    return () => {
      socket.disconnect();
    };
  }, [isHalf]);

  const updateOddsHandler = (data:any) => {
    if (!socketOdds?.match_id) {
      return data;
    };

    const temp:any = [];
    data.forEach((el:any) => {
      if (el.id + "" === socketOdds.match_id + "") {
        let clone_obj = { ...el };
        clone_obj = {
          ...clone_obj,
          odds: {
            ...clone_obj.odds,
            full_time: {
              ...clone_obj.odds.full_time,
              hdp_mm_odds: socketOdds?.data?.hdp_mm_odds || clone_obj?.odds.full_time?.hdp_mm_odds,
              ou_mm_odds: socketOdds?.data?.ou_mm_odds || clone_obj?.odds.full_time?.ou_mm_odds,
              odd: socketOdds?.data?.odd || clone_obj?.odds?.full_time?.odd,
              even: socketOdds?.data?.even || clone_obj?.odds?.full_time?.even,
              one: socketOdds?.data?.one || clone_obj?.odds?.full_time?.one,
              x: socketOdds?.data?.x || clone_obj?.odds?.full_time?.x,
              two: socketOdds?.data?.two || clone_obj?.odds?.full_time?.two,
            },
          },
        };
        temp.push(clone_obj);
      } else {
        temp.push(el);
      }
    });
    return temp;
  };

  useEffect(() => {
    if (socketOdds?.match_id) {
      setEvents(updateOddsHandler(events));
    };
  }, [socketOdds]);

  useEffect(() => {
    setFilterData(groupDataByLeague(events));
    setAllLeaguesValueHandler(Object.keys(groupDataByLeague(events, true)));
  }, [events, filterLeaguesValue, sortByTypeValue, searchMatchValue]);

  return { loading: fixturesQuery?.loading , matches: filterData };
};

export default useFootballMatches
