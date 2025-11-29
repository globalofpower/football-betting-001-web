import NoData from "../common/NoData";
import MatchCard from "../football/MatchCard"
import useFootballMatches from "../hooks/useFootballMatches";

const Parlay = () => {
   const { loading, matches } = useFootballMatches({isHalf: false, isParlay: true});
  
  return (
    <div className="p-3">
      {
          Object.keys(matches).length > 0 ?
          Object.keys(matches).map((league) => matches[league]?.map((match:any,i:number) => 
            <MatchCard key={i} index={i} count={matches[league]?.length} isHalf={false} isParlay={true} match={match} />
          ))
          :
          <NoData text='ပွဲများမရှိပါ' loading={loading} />
        }
    </div>
  )
}

export default Parlay;
