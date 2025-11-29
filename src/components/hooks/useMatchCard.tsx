import { useCombineStore } from "@/store";
import { useEffect, useState } from "react";

const useMatchCard = ({match,isHalf}:any) => {
  const { langValue } = useCombineStore();
  const [data, setData] = useState<any>({});

  const displayLanguage = (mm: string, eng: string) => {
    return langValue === "unicode" ? (mm || eng) : eng;
  };

  useEffect(() => {
    setData(match);
    // setTimeout(() => {
    //   if (data?.body_active_odds || data?.total_active_odds) {
    //     let obj = data;
    //     obj["body_active_odds"] = false;
    //     obj["total_active_odds"] = false;
    //     setData(obj);
    //   }
    // }, 3000);
  }, [match]);

  return { data, displayLanguage }
}

export default useMatchCard