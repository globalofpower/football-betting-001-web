import DatePicker from "@/components/common/DatePicker";
import { langChange } from "@/lang";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

const SubHeader = ({headerLabel}:any) => {
    const navigate = useNavigate();

    const headerLabels = [
        langChange.histories,
    ];

    return (
        <header
            className="sticky top-0 z-99999 flex items-center bg-[var(--secondary-color)] shadow-[0 1px 2px 0 #3c40434d,0 1px 3px 1px #3c404326] w-full max-w-[500px] h-[55px] py-[0] px-[10px]"
        >
            <div className="w-full flex items-center justify-between">
                <button
                    className=" inline-flex items-center justify-center rounded-full bg-[var(--white-color)] transition p-2 cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    <ChevronLeft size={17} color='var(--font-color)' />
                </button>
                <span className='text-[14px] text-[var(--white-color)] font-medium'>{headerLabel}</span>
                {
                    headerLabels?.includes(headerLabel) ?
                    <DatePicker />:
                    <div className="min-w-[50px]"></div>
                }
            </div>
        </header>
    );
};

export default SubHeader;
