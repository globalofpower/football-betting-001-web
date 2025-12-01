import { Card, CardContent } from "@/components/ui/card";
import { langChange } from "@/lang";
import { formatDateTime } from "@/utils/Helper";
import { useNavigate } from "react-router";

const statusClass = (bet_result:string) => {
    switch (bet_result) {
        case "win":
        return "font-bold uppercase text-green-500";
        case "lose":
        return "font-bold uppercase text-[tomato]";
        case "unsettled":
        return "font-bold uppercase text-[var(--accent-color)]";
        case "cancelled":
        return "font-bold uppercase text-zinc-200";
    };
};

export default function BetHistoryCard({ voucher }: any) {
    const navigate = useNavigate();

    return (
        <Card onClick={() => navigate(`/voucher/${voucher.id}`)} className="bg-white py-3  border border-white/10 shadow-sm rounded-md mb-3">
            <CardContent className="px-3">
                <div className="space-y-1 text-[13px]">
                    <div className="flex justify-end">
                        <div className="bg-[#0088d1] text-white border border-white/10 shadow-sm rounded px-1 py-0.5 text-[14.5px]">
                            {formatDateTime(voucher?.created_at,"12")}
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-[var(--font-color)]/80">BetId</span>
                        <span className="text-[var(--font-color)] flex items-center gap-1.5"> 
                            {voucher?.id || "-"} 
                        </span>
                    </div>
                    {
                        voucher?.bet_type === 'parlay' &&
                        <div className="flex justify-between">
                            <span className="text-[var(--font-color)]/80">{langChange.bet_type}</span>
                            <span className="text-[var(--font-color)] font-bold"> 
                                <span>{ voucher?.selected_matches?.length }</span>
                            </span>
                        </div>
                    }
                    <div className="flex justify-between">
                        <span className="text-[var(--font-color)]/80">{langChange.bet_amount}</span>
                        <span className="text-[var(--font-color)]"> {voucher.amount || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-[var(--font-color)]/80">{langChange.payout}</span>
                        <span className="text-[var(--font-color)]"> {voucher.payout_amount || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-[var(--font-color)]/80">{langChange.win_lose}</span>
                        <span className={statusClass(voucher.bet_result)}> {voucher.bet_result || "-"}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
