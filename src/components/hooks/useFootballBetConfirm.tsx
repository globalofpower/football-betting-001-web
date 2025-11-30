import { useCombineStore } from "@/store";
import { useNavigate, useParams } from "react-router";
import { FOOTBALL_BET_QUERY } from "@/service/tanstack/queries";
import { useToaster } from "@/hooks/useToaster";
import { calculatePotentialWin, decodeAuth } from "@/utils/Helper";
import { useEffect } from "react";

const useFootballBetConfirm = () => {
  const {type} = useParams();
  const { betData,setAmountValueHandler, setBetListsValueHandler } = useCombineStore();
  const { isPending: isLoading, mutate: bet } = FOOTBALL_BET_QUERY();
  const { authInfo, setAuthInfoValueHandler } = useCombineStore();
  const { showToast } = useToaster();
  const navigate = useNavigate();
  const getTax = localStorage.getItem('tax');

  useEffect(()=>{
    if(!betData?.amount || betData?.betLists?.length === 0){
        navigate(`/${type}`);
    };
  },[betData])

  useEffect(()=>{
    if(!getTax){
        return showToast("wrong at potential winning!", "error"); 
    };
  },[]);

  const tax_percent_data = decodeAuth(getTax);
  let potential_winning = calculatePotentialWin(betData,tax_percent_data)

  const { langValue } = useCombineStore();

  const displayLanguage = (mm: string, eng: string) => {
    return langValue === "unicode" ? (mm || eng) : eng;
  };


  const editAmountHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    const inputValue:any = e.target.value;
    if (Number(inputValue) > authInfo?.amount) {
      return showToast("ဝမ်းနည်းပါတယ်။ လက်ကျန်ငွေမလုံလောက်ပါ။", "error");
    }
    if(isNaN(inputValue)){
      return;
    };
    setAmountValueHandler(inputValue);
  };


  const betSubmitHandel = () => {
    const removeFixture = betData?.betLists?.map(({ fixture, ...rest }:any) => rest);
    const data = {
      amount: Number(betData?.amount),
      matches: removeFixture,
    };
    bet({data,type},
      {
        onSuccess: (res) => {
          if (res?.status === "success") {
            let message:any;
            if (type === "body") {
              message = "ဘော်ဒီလောင်းခြင်း အောင်မြင်ပါသည်။";
            } else if (type === "parlay") {
              message = "မောင်းလောင်းခြင်း အောင်မြင်ပါသည်။";
            } else if (type === "1st-half") {
              message = "ပထမပိုင်းလောင်းခြင်း အောင်မြင်ပါသည်။";
            };
            navigate(-1);
            setAmountValueHandler("");
            setBetListsValueHandler([]);
            // setAuthInfoValueHandler({});
            return showToast(message, "success");
          } else {
            return showToast(res?.message, "error");
          };
        },
      }
    );
  };

  return { betSubmitHandel, calculateEstimateAmount: potential_winning, editAmountHandler, loading: isLoading, betData, displayLanguage}
}

export default useFootballBetConfirm
