import { useEffect, useState } from "react"
import { CalendarDays as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { getTodayDate } from "@/utils/Helper"
import { useCombineStore } from "@/store"
import { useLocation } from "react-router"
import dayjs from "dayjs"


const DatePicker = () => {
    const [open,setOpen] = useState(false);
    const [seletedDate,setSeletedDate] = useState<any>(localStorage.getItem("selectedVoucherDate") || new Date());
    const { setDate } = useCombineStore();
    const { pathname } = useLocation();

    const handleSelect = (date:any) => {
        setSeletedDate(date);
        setOpen(false);
    };

    useEffect(()=>{
        const dates = (pathname === "/vouchers" || pathname === "/goals") ? getTodayDate(seletedDate,seletedDate): {start_date: dayjs(seletedDate)?.format("YYYY-MM-DD"),end_date: dayjs(seletedDate)?.format("YYYY-MM-DD")};
        setDate(dates);
        localStorage.setItem("selectedVoucherDate",seletedDate);
    },[seletedDate, pathname]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button
                    className=" inline-flex items-center justify-center rounded-full bg-[var(--white-color)] transition p-2 cursor-pointer"
                >
                    <CalendarIcon size={17} color='var(--font-color)' />
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0"  align="end">
                <Calendar mode="single" selected={seletedDate} onSelect={handleSelect}
                    disabled={{ after: new Date() }}
                />
                
            </PopoverContent>
        </Popover>
    )
}

export default DatePicker;