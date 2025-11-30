import { langChange } from "@/lang";
import { useNavigate } from "react-router";
import { amountFormat, clickSongEffect, replaceZeotoQqual } from "@/utils/Helper";
import useFootballBetConfirm from "../hooks/useFootballBetConfirm";
import Loader from "../common/Loader";
import { createPortal } from 'react-dom';


const BetConfirm = () => {
  const navigate = useNavigate();
  const {calculateEstimateAmount, betSubmitHandel, loading, betData ,displayLanguage} = useFootballBetConfirm();
  // const [isEditAmount,setIsEditAmount] = useState(false);

  return (
    <>
      <div className="w-full bg-white overflow-hidden">
        {/* Table */}
        <div className="overflow-x-auto mb-1">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#606a6b] text-white text-center">
                <th className="border-r border-white p-2 text-[14px] font-medium">စဉ်</th>
                <th className="border-r border-white py-2 text-[14px] font-medium">ပွဲစဉ်များ</th>
                <th className="py-2 text-[14px] font-medium">ရွေးထားသောပွဲများ</th>
              </tr>
            </thead>

            <tbody>
              {betData?.betLists?.map((list:any, index:any) => (
                <tr
                  key={list.match_id}
                  className={`text-gray-800 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-150"
                  } border-b`}
                >
                  <td className="p-2 text-[14px] text-center border-r">{index + 1}</td>

                  <td className="p-2 text-[14px] text-left align-top">
                    <div className="leading-tight flex items-center justify-between">
                      {displayLanguage(list?.fixture?.host_team_data?.name_mm , list?.fixture?.host_team_data?.name_en)}
                      {
                          list?.market === "body" &&
                          list?.match_stage === "full_time" &&
                          list?.fixture?.odds?.full_time?.odds_team === 'home'?
                          <div className="mt-1 text-blue-500 whitespace-nowrap">( {
                            replaceZeotoQqual(list?.fixture?.odds?.full_time?.hdp_mm_odds)
                          } )</div>:
                          ''
                      }
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-gray-500">Vs</div>
                      {
                        list?.market === "total" &&
                        list?.match_stage === "full_time" &&
                        <div className="mt-1 text-blue-500 whitespace-nowrap">( {replaceZeotoQqual(list?.fixture?.odds?.full_time?.ou_mm_odds)} )</div>
                      }
                    </div>
                    <div className="leading-tigh flex items-center justify-between">
                      {displayLanguage(list?.fixture?.guest_team_data?.name_mm , list?.fixture?.guest_team_data?.name_en)}
                      {
                          list?.market === "body" &&
                          list?.match_stage === "full_time" &&
                          list?.fixture?.odds?.full_time?.odds_team === 'away'?
                          <div className="mt-1 text-blue-500 whitespace-nowrap">( {
                            replaceZeotoQqual(list?.fixture?.odds?.full_time?.hdp_mm_odds)
                          } )</div>:
                          ''
                      }
                    </div>
                  </td>

                  <td className="p-2 text-[14px] text-left align-top border-l">
                    <div className="font-medium">
                      {list?.team === 'home' && displayLanguage(list?.fixture?.host_team_data?.name_mm , list?.fixture?.host_team_data?.name_en)}
                      {list?.team === 'away' && displayLanguage(list?.fixture?.guest_team_data?.name_mm , list?.fixture?.guest_team_data?.name_en)}
                      {list?.team === 'over' && langChange.football_over}
                      {list?.team === 'under' && langChange.football_under}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary boxes */}
        <div className="">
            <div className="flex items-center justify-between mb-1">
              <span className="border-r border-white whitespace-nowrap bg-[#a6abae] p-3 text-white text-[14px] min-w-[120px]">{langChange.bet_amount}</span>
              <span className="w-full bg-[#a6abae] p-3 text-white text-[14px] font-bold text-center flex items-center justify-center">
                  {/* { isEditAmount ? <input autoFocus placeholder={langChange.amount} value={betData?.amount} type="tel" className={`w-[90px] min-w-[90px] border-[1px] border-slate-300 rounded ms-4 px-2 text-[13px]`} onChange={editAmountHandler} /> : amountFormat(betData?.amount)} {" "}  {isEditAmount ? <CheckLine size='18px' className="text-[var(--accent-color)] ms-4 cursor-pointer" onClick={() => setIsEditAmount(!isEditAmount)} />: <Pencil size='18px' className="text-[var(--accent-color)] ms-4 cursor-pointer" onClick={() => setIsEditAmount(!isEditAmount)}/>} */}
                  {amountFormat(betData?.amount)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="border-r border-white whitespace-nowrap bg-[#a6abae] p-3 text-white text-[14px] min-w-[120px]">{langChange.estimate}</span>
              <span className="w-full bg-[#a6abae] p-3 text-white text-[14px] font-bold text-center">{amountFormat(calculateEstimateAmount)}</span>
            </div>
            
          {/* Buttons */}
          <div className="flex mt-1">
            <button onClick={()=> {navigate(-1); clickSongEffect()}} className="cursor-pointer flex-1 bg-red-500 hover:bg-red-600 text-white rounded py-2 shadow-md mr-1">
              Cancel
            </button>
            <button onClick={()=> {betSubmitHandel(); clickSongEffect()}} className="cursor-pointer flex-1 bg-green-600 hover:bg-green-700 text-white rounded py-2 shadow-md">
              Confirm
            </button>
          </div>
        </div>
      </div>
      {createPortal(
          loading && <Loader />,
          document.getElementById("loading") as HTMLElement
      )}
    </>
  )
}

export default BetConfirm
