import dayjs from 'dayjs';
import useMatchCard from '../hooks/useMatchCard';
import { clickSongEffect } from '@/utils/Helper';
import { useCombineStore } from '@/store';

const EvenOddCard = ({index, count, match}:any) => {
  const { data, displayLanguage } = useMatchCard({match});
  const { betData, setBetListsValueHandler } = useCombineStore();


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
        setBetListsValueHandler([fixtureObj]);
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
        return 'bg-[var(--soft-main-color)] text-white';
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
                <h3 className="flex items-center text-[15px]"> 
                    <span style={{color: 'var(--sub-secondary-color)'}}>{displayLanguage(data?.league_data?.name_mm, data?.league_data?.name_en)}</span>
                </h3>
            </div>:""
        }
        <ul className="mt-0.5 space-y-[10px]">
            <li>
                <div>
                    <div className={`rounded-0 p-0 bg-[#424242]  w-full mt-[2px] relative`}>
                        <time className={`py-1 px-2 text-[14px] text-white flex items-center mb-[5px]`}>
                            ပွဲချိန် : {`${dayjs(data?.fixture_start_time).format('DD/MM')} - 
                            ${dayjs(data?.fixture_start_time).format('hh:mm A')}`}
                        </time>
                        <div className="flex items-center justify-center">
                            <div style={{width: '100%'}}>
                                <div className="flex items-center justify-between">
                                    <div onClick={()=> selectHandler(data,'odd',"odd_even",'full_time')} className={`rounded-0 mr-0 mb-0 border-r-[0.1px] border-r-[#a0a0a0] border-b-[0.1px] border-b-[#a0a0a0] bg-[#616161] text-white w-full leading-[13px] min-h-[40px] relative break-all text-center text-[13px] cursor-pointer select-none flex items-center justify-center`}>
                                        {displayLanguage(data?.host_team_data?.name_mm,data?.host_team_data?.name_en)}
                                    </div>
                                    <div onClick={()=> selectHandler(data,'even',"odd_even",'full_time')} className={`rounded-0 mb-0 border-b-[0.1px] border-b-[#a0a0a0] bg-[#616161] text-white ml-0 w-full leading-[13px] min-h-[40px] relative break-all text-center text-[13px] cursor-pointer select-none flex items-center justify-center`}>
                                        {displayLanguage(data?.guest_team_data?.name_mm,data?.guest_team_data?.name_en)}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div onClick={()=> selectHandler(data,'odd',"odd_even",'full_time')} className={`${activeHandel(data?.id, 'odd')} rounded-0 mr-0 mb-0 border-r-[0.1px] border-r-[#a0a0a0] border-b-[0.1px] border-b-[#a0a0a0] bg-[#616161] text-white w-full leading-[13px] min-h-[40px] relative break-all text-center text-[13px] cursor-pointer select-none flex items-center justify-center`}>
                                        စုံ
                                    </div>
                                    <div onClick={()=> selectHandler(data,'even',"odd_even",'full_time')} className={`${activeHandel(data?.id, 'even')} rounded-0 mb-0 border-b-[0.1px] border-b-[#a0a0a0] bg-[#616161] text-white ml-0 w-full leading-[13px] min-h-[40px] relative break-all text-center text-[13px] cursor-pointer select-none flex items-center justify-center`}>
                                        မ
                                    </div>
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

export default EvenOddCard
