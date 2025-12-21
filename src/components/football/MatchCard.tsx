import dayjs from 'dayjs';
import useMatchCard from '../hooks/useMatchCard';
import { clickSongEffect, replaceZeotoQqual } from '@/utils/Helper';
import { Star } from 'lucide-react';
import { useCombineStore } from '@/store';

const MatchCard = ({index, count, isHalf, isParlay, match}:any) => {
  const { data, displayLanguage } = useMatchCard({match,isHalf});
  const { betData, setBetListsValueHandler } = useCombineStore();

  const betType = (full:any,half:any) => {
    if(isHalf){
      return half;
    }else{
      return full;
    };
  };

  const typeObjKey = isHalf ? "first_half" : "full_time";

  const selectHandler = (data:any, bet_team:string, bet_type:string, bet_is_full:string) => {
    clickSongEffect();
    const fixtureObj = {
      fixture: data,
      match_id: Number(data?.id),
      market: bet_type ,
      team: bet_team,
      match_stage: bet_is_full
    };

    const fixturesArr = [...(betData?.betLists || [])];
    const findSameIdFixture = fixturesArr.find((fixture:any) => fixture.match_id === fixtureObj.match_id);
    if (findSameIdFixture) {
      if (findSameIdFixture.team === fixtureObj.team) {
        const filtered = fixturesArr.filter((fixture:any) => fixture.match_id !== fixtureObj.match_id);
        setBetListsValueHandler(filtered);
      } else {
        const updated = fixturesArr.map((fixture:any) =>
          fixture.match_id === fixtureObj.match_id ? fixtureObj : fixture
        );
        setBetListsValueHandler(updated);
      }
    } else {
      if (isParlay) {
        setBetListsValueHandler([...fixturesArr, fixtureObj]);
      } else {
        setBetListsValueHandler([fixtureObj]);
      }
    };
  };

  const activeHandel = (fixtureId:number,type:string, oddsColor = false) => {
     const findFixture = betData?.betLists?.find((fixture:any) => fixture?.match_id == fixtureId);
     if(oddsColor){
      if(findFixture?.team === type){
        return 'text-[#ffe93c]';
      }else{
        return 'text-[var(--main-color)]';
      };
     }else{
      if(findFixture?.team === type){
        return isParlay ? 'bg-[var(--accent-color)]': 'bg-[var(--soft-main-color)] text-white';
      }else{
        return '';
      };
     };
  };

  return (
    <div className={`${index + 1 === count ? 'mb-3' : 'mb-2'}`}>
        {
            index === 0 ? 
            <div className="flex items-center gap-1">
                {(isParlay || !data?.is_popular_match) ? <Star strokeWidth={0} fill='var(--main-color)' size={20} />: ""}
                <h3 className="flex items-center text-[15px]"> 
                    <span style={{color: 'var(--sub-secondary-color)'}}>{displayLanguage(data?.league_data?.name_mm, data?.league_data?.name_en)}</span>
                </h3>
            </div>:""
        }
        <ul className="mt-0.5 space-y-[10px]">
            <li>
                <div>
                    <div className={`${isParlay ? 'bg-[#a09f9f] rounded-[5px] p-[8px]': 'rounded-0 p-0 bg-[#424242]'}  w-full mt-[2px] relative`}>
                        <time className={`${isParlay ? 'py-0 px-0': 'py-1 px-2'} text-[14px] text-white flex items-center mb-[5px]`}>
                            ပွဲချိန် : {`${dayjs(data?.fixture_start_time).format('DD/MM')} - 
                            ${dayjs(data?.fixture_start_time).format('hh:mm A')}`}
                        </time>
                        <div className="flex items-center justify-center">
                            <div style={{width: '100%'}}>
                                <div className="flex items-center justify-between">
                                    <div onClick={()=> selectHandler(data,'home',"body",betType('full_time','first_half'))} className={`${activeHandel(data?.id, 'home')} ${isParlay ? 'rounded-[6px] mr-[3px] mb-[3px] border-r-0 border-b-0':'rounded-0 mr-0 mb-0 border-r-[0.1px] border-r-[#a0a0a0] border-b-[0.1px] border-b-[#a0a0a0]'} ${(!isParlay && data?.odds?.[typeObjKey]?.odds_team === 'home') ? 'justify-between': 'justify-center'} ${(data?.is_popular_match || isParlay) ? 'bg-[#616161] text-white': 'bg-[#e4e4e4]'} w-full leading-[13px] min-h-[40px] relative break-all text-center text-[13px] cursor-pointer select-none flex items-center`}>
                                        {
                                            (!isParlay && data?.odds?.[typeObjKey]?.odds_team === 'home') ? <div />: ""
                                        }
                                        {displayLanguage(data?.host_team_data?.name_mm,data?.host_team_data?.name_en)}
                                        {
                                            data?.odds?.[typeObjKey]?.odds_team === 'home'?
                                            <span className={`${isParlay? 'bg-[var(--main-color)] text-white': (data?.is_popular_match ? 'text-[#ffe93c]': activeHandel(data?.id, 'home', true))} font-medium min-h-[25px] min-w-[45px] whitespace-nowrap px-[6px] py-0 text-[13px] text-center leading-[25px] block rounded-[8px] select-none ml-[5px]`}>
                                                {replaceZeotoQqual(data?.odds?.[typeObjKey]?.hdp_mm_odds)}
                                            </span>:''
                                        }
                                    </div>
                                    <div onClick={()=> selectHandler(data,'away',"body",betType('full_time','first_half'))} className={`${activeHandel(data?.id, 'away')} ${isParlay ? 'rounded-[6px] mb-[3px] border-b-0':'rounded-0 mb-0 border-b-[0.1px] border-b-[#a0a0a0]'} ${(!isParlay && data?.odds?.[typeObjKey]?.odds_team === 'away') ? 'justify-between': 'justify-center'} ${(data?.is_popular_match || isParlay) ? 'bg-[#616161] text-white': 'bg-[#e4e4e4]'} ml-0 w-full leading-[13px] min-h-[40px] relative break-all text-center text-[13px] cursor-pointer select-none flex items-center`}>
                                        {
                                            (!isParlay && data?.odds?.[typeObjKey]?.odds_team === 'away') ? <div />: ""
                                        }
                                        {displayLanguage(data?.guest_team_data?.name_mm,data?.guest_team_data?.name_en)}
                                        {
                                            data?.odds?.[typeObjKey]?.odds_team === 'away'?
                                            <span className={`${isParlay? 'bg-[var(--main-color)] text-white': (data?.is_popular_match ? 'text-[#ffe93c]': activeHandel(data?.id, 'away', true))} font-medium min-h-[25px] min-w-[45px] whitespace-nowrap px-[6px] py-0 text-[13px] text-center leading-[25px] block rounded-[8px] select-none ml-[5px]`}>
                                                {replaceZeotoQqual(data?.odds?.[typeObjKey]?.hdp_mm_odds)}
                                            </span>:''
                                        }
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div onClick={()=> selectHandler(data,'over',"total",betType('full_time','first_half'))} className={`${activeHandel(data?.id, 'over')} ${isParlay ? 'rounded-[6px]':'rounded-0'} ${(data?.is_popular_match || isParlay) ? 'bg-[#616161] text-white': 'bg-[#e4e4e4]'} w-full min-h-[40px] text-[13px] text-center leading-[40px] cursor-pointer`}>Over</div>
                                    <div className="min-h-[40px] select-none" >
                                        <div className={`${isParlay ? 'bg-[var(--main-color)] text-white border-x-0': (data?.is_popular_match? 'bg-[#616161] border-x-[0.1px] border-x-[#a0a0a0] text-[#ffe93c]': 'bg-[#e4e4e4] border-x-[0.1px] border-x-[#a0a0a0] text-[var(--main-color)]')} font-medium w-full h-full text-center leading-[40px] text-[13px] whitespace-nowrap py-0 px-[10px]`}>{replaceZeotoQqual(data?.odds?.[typeObjKey]?.ou_mm_odds)}</div>
                                    </div>
                                    <div onClick={()=> selectHandler(data,'under',"total",betType('full_time','first_half'))} className={`${activeHandel(data?.id, 'under')} ${isParlay ? 'rounded-[6px]':'rounded-0'} ${(data?.is_popular_match || isParlay) ? 'bg-[#616161] text-white': 'bg-[#e4e4e4]'} w-full min-h-[40px] text-[13px] text-center leading-[40px] cursor-pointer`}>Under</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
  )
}

export default MatchCard
