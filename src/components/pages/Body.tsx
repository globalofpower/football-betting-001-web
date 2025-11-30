import Loader from "../common/Loader";
import NoData from "../common/NoData";
import MatchCard from "../football/MatchCard"
import useFootballMatches from "../hooks/useFootballMatches";

const Body = () => {
  const { loading, matches } = useFootballMatches({isHalf: false, isParlay: false});

  if(loading){
    return <Loader />;
  };
  return (
    <div className="p-3">
      {
          Object.keys(matches).length > 0 ?
          Object.keys(matches).map((league) => matches[league]?.map((match:any,i:number) => 
            <MatchCard key={i} index={i} count={matches[league]?.length} isHalf={false} isParlay={false} match={match} />
          ))
          :
          <NoData text='ပွဲစဉ်များ မရှိသေးပါ' loading={loading} />
        }
    </div>
  )
}

export default Body
