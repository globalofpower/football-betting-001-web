import Loader from "../common/Loader";
import NoData from "../common/NoData";
import EvenOddCard from "../football/EvenOddCard";
import useFootballMatches from "../hooks/useFootballMatches";

const EvenOdd = () => {
  const { loading, matches } = useFootballMatches({isHalf: false, isParlay: false});

  if(loading){
    return <Loader />;
  };
  return (
    <div className="p-3">
      {
          Object.keys(matches).length > 0 ?
          Object.keys(matches).map((league) => matches[league]?.map((match:any,i:number) => 
            <EvenOddCard key={i} index={i} count={matches[league]?.length} match={match} />
          ))
          :
          <NoData text='ပွဲစဉ်များ မရှိသေးပါ' loading={loading} />
        }
    </div>
  )
}

export default EvenOdd
