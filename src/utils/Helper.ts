import dayjs from "dayjs";
import clickSong from '@/assets/songs/click.mp3';
import CryptoJS from "crypto-js";

export const encodeAuth = (auth:any) => {
  const deText = CryptoJS.AES.encrypt(
    JSON.stringify(auth),
    import.meta.env.VITE_REACT_APP_SECRET_KEY
  ).toString();
  return deText;
};

export const decodeAuth = (auth:any) => {
  if (auth) {
    const bytes = CryptoJS.AES.decrypt(
      auth,
      import.meta.env.VITE_REACT_APP_SECRET_KEY
    );
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  };
};

export const replaceZeotoQqual = (str:any) => {
  if(str?.includes('+')){
      let splitVal = str.split("+");
      if(splitVal[0] === "0"){
          splitVal[0] = " ="
      }else{
          splitVal[0] = `${splitVal[0]}`;
      };
      if(splitVal[1] === "0"){
          splitVal[1] = " ="
      }else{
          const length = splitVal[1]?.length;
          if (length <= 1) {
            splitVal[1] = ` +0${splitVal[1]}`;
          } else {
            splitVal[1] = ` +${splitVal[1]}`;
          }
      };
      return splitVal;
  };
  if(str?.includes('=')){
      let splitVal = str.split("=");
      if(splitVal[0] === "0"){
          splitVal[0] = ""
      }else{
          splitVal[0] = `${splitVal[0]}=`;
      };
      if(splitVal[1] === "0"){
          splitVal[1] = ""
      }else{
        const length = splitVal[1]?.length;
        if (length <= 1) {
          splitVal[1] = ` 0${splitVal[1]}`;
        } else {
          splitVal[1] = ` ${splitVal[1]}`;
        }
      };
      return splitVal;
  };
  if(str?.includes('-')){
      let splitVal = str.split("-");
      if(splitVal[0] === "0"){
          splitVal[0] = " ="
      }else{
          splitVal[0] = `${splitVal[0]}`;
      };
      if(splitVal[1] === "0"){
          splitVal[1] = " ="
      }else{
        const length = splitVal[1]?.length;
        if (length <= 1) {
          splitVal[1] = ` -0${splitVal[1]}`;
        } else {
          splitVal[1] = ` -${splitVal[1]}`;
        }
      };
      return splitVal;
  };
};

export const checkTeamNameLangType = (lang:string,mm:string,eng:string) => {
    if(lang === "eng"){
        return eng || mm;
    }else{
        return mm || eng;
    }
};

export const getTodayDate = (startDate: string, endDate: string) => {
  // local time 10:29 ကို reference point အဖြစ် သတ်မှတ်
  const now = dayjs();
  const cutoff = now.hour(10).minute(29).second(0).millisecond(0);
  const beforeCutoff = now.isBefore(cutoff);

  // helper: “နေ့ရဲ့ 10:29” ကို ဆောက်
  const dStart = (d: string) =>
    dayjs(d).startOf("day").hour(10).minute(29).second(0);

  let start = dStart(startDate);
  let end = dayjs(endDate).startOf("day").add(1, "day").hour(10).minute(29).second(0);

  if (beforeCutoff) {
    start = dayjs(startDate).startOf("day").subtract(1, "day").hour(10).minute(29).second(0);
    end = dayjs(endDate).startOf("day").hour(10).minute(29).second(0);
  }

  return {
    start_date: start.format("YYYY-MM-DD HH:mm:ss"),
    end_date: end.format("YYYY-MM-DD HH:mm:ss"),
  };
};

export const formatDate = (date:Date | undefined) => {
  return dayjs(date).format('YYYY-MM-DD');
}

export const formatDateTime = (date:Date | undefined, time_format:"12" | "24" = "24") => {
  if(time_format === "24") {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
  }else {
    return dayjs(date).format('YYYY-MM-DD hh:mm:ss A');
  }
}

export const capitalizedText = (text:any) => {
  if (text) {
    let words = text.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    let capitalized = words.join(" ");
    return capitalized;
  }
};

export const amountFormat = (amount:any) => {
    if(amount == 0){
      return 0;
    }else{
      if(amount){
          return Number(amount)?.toLocaleString('en-US')
      }else{
          return '-';
      }
    };
};

export const formatNumber = (number:any) => number.toLocaleString('en-US', {
  maximumFractionDigits: 2,
  notation: 'compact',
  compactDisplay: 'short'
});

export const changeTimeAgo = (dateTime:any) => {
  const formattedTime = dayjs(dateTime);
  const currentTime = dayjs();
  
  const diffMinutes = currentTime.diff(formattedTime, 'minutes');
  const diffHours = currentTime.diff(formattedTime, 'hours');
  const diffDays = currentTime.diff(formattedTime, 'days');
  const diffWeeks = currentTime.diff(formattedTime, 'weeks');
  const diffMonths = currentTime.diff(formattedTime, 'months');
  const diffYears = currentTime.diff(formattedTime, 'years');

  if (diffYears > 0) {
      return diffYears + "y";
  } else if (diffMonths > 0) {
      return diffMonths + "M";
  } else if (diffWeeks > 0) {
      return diffWeeks + "w";
  } else if (diffDays > 0) {
      return diffDays + "d";
  } else if (diffHours > 0) {
      return diffHours + "h";
  } else {
      if(diffMinutes == 0){
        return "Just now";
      };
      return diffMinutes + "m";
  }
};

export const clickSongEffect = () => {
  const audio = new Audio();
  audio.src = clickSong;
  audio.play();
};

export const isAuthenticated = (message:any) => {
    const errorMessages = ["Not authenticated", "Invalid token", "Unauthorized token", "Not Authorised!"];
    if (errorMessages.some(msg => message?.includes(msg))) {
       window.location.href = "/auth/login";
    };
}

export const sumTotal = (data:any, type:any, format = false) => {
  if (format) {
    return data?.reduce((a:any, b:any) => {
      return Number(a) + Number(b[type]);
    }, 0)?.toLocaleString('en-us');
  } else {
    return data?.reduce((a:any, b:any) => {
      return Number(a) + Number(b[type]);
    }, 0);
  }
};

export const copyToClipboard = async (copyMe:string) => {
  await navigator.clipboard.writeText(copyMe);
};


export const calculatePotentialWin = (betting:any,tax_percent_data:any) => {
  if(!betting || betting==undefined || betting?.betLists?.length === 0){
    return 0;
  }
  let bet_amount = betting?.amount;
  let bet_fixtures = betting?.betLists;
  let total_odds = 1;
  bet_fixtures?.forEach((bet:any) => {
    let bet_odds:any = _getOdds({
      fixture: bet.fixture,
      market: bet.market,
      match_stage: bet.match_stage,
      bet_team: bet.team,
    });
    // console.log("bet_odds",bet_odds);
    if (/[+\-=]/.test(bet_odds)) {
      // check mm_odds or not,
      total_odds *= 2;
    } else {
      total_odds *= bet_odds;
    }
    // console.log("total_odds",total_odds);
  });
  let bingo:any = bet_amount * total_odds;
  bingo = bingo.toFixed(0);
  let potentialWin = _reduceAmount({
    bingo:BigInt(bingo),
    bet_amount:BigInt(bet_amount),
    bet_football_fixtures: bet_fixtures,
    tax_percent_data:tax_percent_data
  });
  // console.log("potentialWin",potentialWin)
  return potentialWin.toString();
};

let _getOdds = ({ fixture, market, match_stage, bet_team }:any) => {
  // console.log("searching odds");
  let bet_odds = 0;
  if (market == "correct_score") {
    let odds = fixture?.correct_scores[match_stage];
    bet_odds = odds.find(
      (odd:any) => odd.name == bet_team && odd.header != 2
    )?.odds;
    // console.log("bet_odds for cs ",bet_odds);
  } else {
    let odds = fixture?.odds[match_stage];
    if (market == "total") {
      bet_odds = odds?.ou_mm_odds;
    }
    if (market == "body") {
      bet_odds = odds?.hdp_mm_odds;
    }
    if (market == "odd_even") {
      bet_odds = bet_team == "odd" ? odds?.odd : odds?.even;
    }
    if (market == "one_x_two") {
      bet_odds =
        bet_team == "home"
          ? odds?.one
          : bet_team == "draw"
          ? odds?.x
          : odds?.two;
    }
    // console.log(`market ${market} bet_odds`,bet_odds);
  }
  return bet_odds;
};

let _reduceAmount = ({ bingo, bet_amount, bet_football_fixtures,tax_percent_data }:any) => {
  // if(bet_football_fixtures==undefined || bet_football_fixtures?.length==0){
  //   return 0;
  // }
  let payout_amount = bingo;
  let bet_type = bet_football_fixtures?.length > 1 ? "parlay" : "single";
  let tax_percent = _getTaxPercent({
    bet_type,
    bet_football_fixtures,
    tax_percent_data
  });
  if (bet_type == "single") {
    // body ဆို အမြတ် ထဲက tax ကောက်
    let profit = bingo - bet_amount;
    if (profit > 0) {
      let tax_percent_amount =
        _safeMultiply({ num: tax_percent, bigInt: profit }) / BigInt(100);
      payout_amount = bingo - tax_percent_amount;
    }
  }
  if (bet_type == "parlay") {
    // perlay ဆို အနိုင်ငွေ ထဲက tax ကောက်
    // let bingo = bingo;
    if (bingo > 0n) {
      let tax_percent_amount =
        _safeMultiply({ num: tax_percent, bigInt: bingo }) / BigInt(100);
      payout_amount = bingo - tax_percent_amount;
    }
  }
  return payout_amount;
};

let _getTaxPercent = ({ bet_type, bet_football_fixtures,tax_percent_data }:any) => {
  // const {
  //   data: taxObj,
  //   error: taxPercentError,
  // } = FetchTaxPercent({
  //   payload: null,
  //   pollInterval: 1000 * 10,
  //   isLazy: false,
  // });
  // console.log("tax_percent_data",tax_percent_data)
  let tax_percent = 0;
  if(tax_percent_data){
    let tax_percents = tax_percent_data?.taxPercents;
    const findTaxPercent = (criteria:any) =>
      tax_percents?.find((tax:any) =>
        Object.keys(criteria).every((key) => tax[key] === criteria[key])
      )?.percent;
  
    const {
      match_stage,
      market,
      fixture:football_fixture,
    } = bet_football_fixtures[0];
    const is_popular_match = football_fixture.is_popular_match;
  
    if (bet_type === "single") {
      const baseCriteria = {
        min_parlay_count: 1,
        max_parlay_count: 1,
        match_stage,
      };
      const marketMapping:any = {
        body: "mm_odds",
        total: "mm_odds",
        one_x_two: "one_x_two",
        correct_score: "correct_score",
        odd_even: "odd_even",
      };
      const marketKey = marketMapping[market];
      // console.log("market@tax",market)
      // console.log("marketKey@tax",marketKey)
      if (marketKey) {
        const criteria = {
          ...baseCriteria,
          market: marketKey,
          is_popular_match:
            market === "body" || market === "total" ? is_popular_match : null,
        };
        // console.log("criteria", criteria);
        tax_percent = findTaxPercent(criteria);
      }
    } else {
      const parlay_count = bet_football_fixtures.length;
      const parlayRanges = [
        { min: 2, max: 2 },
        { min: 3, max: 8 },
        { min: 9, max: 11 },
      ];
      const range = parlayRanges.find(
        ({ min, max }) => parlay_count >= min && parlay_count <= max
      );
  
      if (range) {
        tax_percent = findTaxPercent({
          min_parlay_count: range.min,
          max_parlay_count: range.max,
        });
      }
    }
  }
 
  // return 10;
  return tax_percent;
};

let _safeMultiply = ({ num, bigInt }:any):any => {
  // console.log("typeof num: " + typeof num);
  // console.log("typeof bigInt: " + typeof bigInt);
  // Handle null case by treating null as 0
  if (num === null) {
    console.log("null");
    return 0n; // Treat null as 0
  }

  // Handle case where num is already a BigInt
  if (typeof num === "bigint") {
    // console.log("bigint")
    return num * bigInt;
  }

  // Handle case where num is a number (decimal or integer)
  if (typeof num === "number") {
    // Determine the number of decimal places
    const decimalPlaces = num.toString().includes(".")
      ? num.toString().split(".")[1].length
      : 0;
    // console.log("number***",decimalPlaces)

    // Convert the decimal number to an integer representation
    const integerRepresentation = BigInt(
      Math.round(num * Math.pow(10, decimalPlaces))
    );
    // console.log("number***",integerRepresentation)
    // console.log("typeof integerRepresentation: " + typeof integerRepresentation)
    // console.log("typeof bigInt: " + typeof bigInt)
    // Perform the multiplication
    const result = integerRepresentation * bigInt;
    // console.log("result***",result)
    // console.log("typeof result: " + typeof result)
    // Adjust the result to correct the decimal places
    const finalResult = result / BigInt(Math.pow(10, decimalPlaces));
    // console.log("finalResult***",finalResult)
    // console.log("typeof finalResult: " + typeof finalResult)
    return finalResult;
  }
};