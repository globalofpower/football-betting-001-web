import { useCombineStore } from "@/store";
import { useEffect, useState } from "react";

const useMatchCard = ({match}:any) => {
  const { langValue } = useCombineStore();
  const [data, setData] = useState<any>({});

  const displayLanguage = (mm: string, eng: string) => {
    return langValue === "unicode" ? (mm || eng) : eng;
  };

  useEffect(() => {
    setData(match);
  }, [match]);

  return { data, displayLanguage }
}

export default useMatchCard