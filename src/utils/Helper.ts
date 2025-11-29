import dayjs from "dayjs";
import clickSong from '@/assets/songs/click.mp3';

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