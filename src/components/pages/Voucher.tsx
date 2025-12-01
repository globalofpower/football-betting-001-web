import Loader from "../common/Loader";
import { useFetchBetHistoryDetail } from "../hooks/useFetchBetHistoryDetail";

const BetHistoryDetail = () => {
    const {data,loading} = useFetchBetHistoryDetail();

    if(loading){
        return <Loader />;
    };

    console.log(data)

    return (<>
        <div className="p-3">
            <div className="bg-[var(--main-soft-color)] rounded-md shadow-md text-[12px] mb-3">
                <table className="w-full">
                    <tbody>
                        {/* {data[0]?.bet_football_fixtures?.map((el:any,i:number) => (
                            <BetHistoryTeams 
                                key={el.id}
                                data={el}
                                datas={data[0]?.bet_football_fixtures}
                                index={i}
                            />
                        ))} */}
                    </tbody>
                </table>
            </div>
            {/* {data[0] && <BetHistoryCard  bet={data[0]} />} */}
        </div>
    </>)
}

export default BetHistoryDetail;