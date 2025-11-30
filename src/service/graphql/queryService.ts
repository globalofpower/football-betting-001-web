import { useLazyQuery, useQuery } from '@apollo/client/react';
import { GET_FIXTURES_DATA, GET_TAX_PERCENT_DATA } from './queries';
import { useCombineStore } from '@/store';

export const GET_USER_INFO_SERVICE = (query:any,id:any) => {
    return useQuery(query,{
        variables: {
            id: id,
            setActive: true
        },
        fetchPolicy: 'cache-and-network',
    });
}

export const GET_RESULT_DATA_SERVICE = (query:any, source:any, date:any,sorting:any, pageSize:any, page:any) => {
    let isSourceCompleted = (source === "completed" || source === "cancel") ? {} : (source === "first-half-reject"? {source: 'first-half-complete'} :{ source });
    let isStatusObj = {};
    switch(source){
        case "completed":
            isStatusObj = {status: 'completed'};
        break;
        case "cancel":
            isStatusObj = {status: 'cancel'};
        break
        case "first-half-reject":
            isStatusObj = {status: 'cancel'};
        break
        default:
            isStatusObj = {status: 'active'};
    };

    const { loading, error, data, refetch } = useQuery(query, {
      variables: {
        ...isSourceCompleted,
        ...isStatusObj,
        pageSize: pageSize,
        page: page,
        sorting,
        date,
      },
      fetchPolicy: "network-only",
    });
    return { loading, error, data, refetch };
};

export const GET_FAV_MATCHES_SERVICE = (query:any,ids:any) => {
    const { loading, error, data, refetch } = useQuery(query, {
        variables: {
            matchesId: ids
        },
        skip: ids?.length === 0,
        fetchPolicy: "network-only",
    });
    return { loading, error, data, refetch };
};


export const GET_FIXTURES_DATA_SERVICE = ({isParlay,fetchPolicy='cache-and-network'}:any) => {
    const { oddsValue } = useCombineStore();
    let tempMarkets:any = [];
    let tempMatchStages:any = [];

    if(oddsValue?.fullTime || oddsValue?.evenOdd || oddsValue?.onextwo || oddsValue?.corretScores){
        if(!tempMatchStages.includes("full_time")){
            tempMatchStages.push("full_time"); 
        };
    }else{
        tempMatchStages = tempMatchStages.filter((market:any) => market !== "full_time");
    };

    if(oddsValue?.firstHalf){
        if(!tempMatchStages.includes("first_half")){
            tempMatchStages.push("first_half"); 
        };
    }else{
        tempMatchStages = tempMatchStages.filter((market:any) => market !== "first_half");
    };

    if(oddsValue?.firstHalf || oddsValue?.fullTime){
        if(!tempMarkets.includes("mm_odds")){
           tempMarkets.push("mm_odds"); 
        };
    }else{
        tempMarkets = tempMarkets.filter((market:any) => market !== "mm_odds");
    };

    if(oddsValue?.evenOdd){
        if(!tempMarkets.includes("odd_even")){
           tempMarkets.push("odd_even"); 
        };
    }else{
        tempMarkets = tempMarkets.filter((market:any) => market !== "odd_even");
    };

    if(oddsValue?.onextwo){
        if(!tempMarkets.includes("1x2")){
           tempMarkets.push("1x2"); 
        };
    }else{
        tempMarkets = tempMarkets.filter((market:any) => market !== "1x2");
    };

    if(oddsValue?.corretScores){
        if(!tempMarkets.includes("correct_scores")){
           tempMarkets.push("correct_scores"); 
        };
    }else{
        tempMarkets = tempMarkets.filter((market:any) => market !== "correct_scores");
    };

    const skip = (tempMarkets.length === 0 && tempMatchStages.length === 0);
    const query = useQuery(GET_FIXTURES_DATA({market: tempMarkets,match:tempMatchStages}),{
        skip,
        variables: {
            source: "frontend",
            status: "active",
            isPublished: true,
            pageSize: skip ? 0 :400,
            page: 1,
            markets:tempMarkets,
            matchStages: tempMatchStages,
            isPerlay: isParlay
        },
        fetchPolicy: fetchPolicy
    });
    return !skip && query;
};

export const GET_BET_LISTS_DATA_SERVICE = (query:any, pageSize:any , page:any) => {
    return useQuery(query,{
        variables: {
            pageSize: pageSize,
            page: page,
        },
        fetchPolicy: 'network-only'
    });
}

export const FetchGraphQL = ({query,variables,pollInterval=0, isLazy=false,fetchPolicy='network-only'}:any) => {
    const fetchHook:any = isLazy ? useLazyQuery : useQuery;
    const result = fetchHook(query,{
        variables: variables,
        fetchPolicy: fetchPolicy,
        pollInterval: pollInterval,
    });
    return result;
}

export const GET_BET_LIST_DATA_SERVICE = (query:any,id:any) => {
    return useQuery(query,{
        variables: {
            id: id,
        },
        fetchPolicy: 'network-only'
    });
};

export const GET_GOALS_DATA_SERVICE = (query:any,id:any) => {
    return useQuery(query,{
        variables: {
            bettingId: id,
        },
        fetchPolicy: 'network-only'
    });
}

export const FetchTaxPercent = ({payload,pollInterval=0,isLazy= false}:any) => {
  let result = FetchGraphQL({
      query: GET_TAX_PERCENT_DATA,
      variables: payload,
      pollInterval: pollInterval,
      isLazy,
  })
  return result;
};