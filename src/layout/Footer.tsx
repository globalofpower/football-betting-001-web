import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToaster } from "@/hooks/useToaster";
import { langChange } from "@/lang"
import { useCombineStore } from "@/store";
import { amountFormat, clickSongEffect } from "@/utils/Helper";
import { useLocation, useNavigate } from "react-router";

const Footer = () => {
  const {pathname} = useLocation();
  const { betData, setAmountValueHandler } = useCombineStore();
  const { authInfo } = useCombineStore();
  const { showToast } = useToaster();
  const navigate = useNavigate();

  const amountHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    let value: any = e.target.value;
    if(!isNaN(value)){
        setAmountValueHandler(value);
    };
  };

  const betConfirmHandler = () => {
    clickSongEffect();
    if(pathname === '/parlay' && betData?.betLists?.length < 2){
        return showToast("အနည်းဆုံး(2)မောင်းမှ စတင်လောင်းပေးပါ။", "error");
    };
    if (betData?.betLists?.length <= 0) {
        return showToast("လောင်းမည့်ပွဲစဉ် ရွေးပေးပါ။", "error");
    };
    if (!betData?.amount) {
      return showToast("လောင်းငွေထည့်ပေးပါ။", "error");
    };
    if (Number(betData?.amount) > authInfo?.amount) {
      return showToast("လက်ကျန်ငွေမလုံလောက်ပါ။", "error");
    };

    if(pathname === "/1st-half"){
        if (Number(betData?.amount) < authInfo?.user_bet_limit?.half_min_bet_limit) {
            return showToast(`အနည်းဆုံး ${authInfo?.user_bet_limit?.half_min_bet_limit} ကျပ်မှ စတင်လောင်းပေးပါ။`,"error");
        };
        if (Number(betData?.amount) > authInfo?.user_bet_limit?.half_max_bet_limit) {
            return showToast(`အများဆုံး ${authInfo?.user_bet_limit?.half_max_bet_limit} ကျပ်အထိသာ လောင်းနိုင်ပါသည်။`,"error");
        };
    }else{
        if(pathname === '/parlay'){
            if (Number(betData?.amount) < authInfo?.user_bet_limit?.min_parlay_limit) {
                return showToast(`အနည်းဆုံး ${authInfo?.user_bet_limit?.min_parlay_limit} ကျပ်မှ စတင်လောင်းပေးပါ။`,"error");
            };
            if (Number(betData?.amount) > authInfo?.user_bet_limit?.max_parlay_limit) {
                return showToast(`အများဆုံး ${authInfo?.user_bet_limit?.max_parlay_limit} ကျပ်အထိသာ လောင်းနိုင်ပါသည်။`,"error");
            };
        }else{
            const mathType = betData?.betLists?.[0]?.fixture?.is_big;
            let min_bet:any;
            let max_bet:any;
            if (mathType === "big") {
                min_bet = Number(authInfo?.user_bet_limit?.body_min_bet_limit);
                max_bet = Number(authInfo?.user_bet_limit?.body_max_bet_limit);
            }else{
                min_bet = Number(authInfo?.user_bet_limit?.min_bet_limit);
                max_bet = Number(authInfo?.user_bet_limit?.max_bet_limit);
            };
            if (Number(betData?.amount) < min_bet) {
                return showToast(`အနည်းဆုံး ${amountFormat(min_bet)} ကျပ်မှ စတင်လောင်းပေးပါ။`, "error");
            };
            if (Number(betData?.amount) > max_bet) {
                return showToast(`အများဆုံး ${amountFormat(max_bet)} ကျပ်အထိသာ လောင်းနိုင်ပါသည်။`,"error");
            };
        };
    };
    navigate(`${pathname}/bet-confirm`);
  };

  return (
     <footer
        className="
            fixed bottom-0
            w-full max-w-[500px] mx-auto
            h-[70px]
            left-0
            right-0
            bg-[var(--secodary-color)] z-[99]
            p-3
            z-[99999]
        "
    >
        <div className="flex items-center justify-center h-full gap-4">
            <div className="whitespace-nowrap h-full flex items-center justify-center rounded-sm text-[var(--white-color)] text-[13px]">
                {pathname === '/parlay'? `${langChange.parlay} ( ${betData?.betLists?.length} )`: langChange.bet_amount}
            </div>
            <Input value={betData?.amount} type="tel" className="rounded-[3px] h-full text-[14px] bg-[var(--white-color)] shadow-none outline-none border-none" placeholder={langChange.bet_amount} onChange={amountHandler} />
            <Button onClick={betConfirmHandler} disabled={!betData?.amount || (pathname === '/parlay'? betData?.betLists?.length < 2: betData?.betLists?.length === 0)} className="rounded-[3px] h-full bg-[var(--main-color)] hover:bg-[var(--main-color)] text-[var(--white-color)] px-2 text-[13px] cursor-pointer min-w-[100px]">{langChange.bet_confirm}</Button>
        </div> 
    </footer>
  )
}

export default Footer
