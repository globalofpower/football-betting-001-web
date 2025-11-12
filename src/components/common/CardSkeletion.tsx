import { Skeleton } from "@/components/ui/skeleton";

type CardSkeletonProps = {
    lines?: number;      
    className?: string; 
    height?: string; 
};

const CardSkeleton = ({
    lines = 2,
    className,
    height
}: CardSkeletonProps) => {
    return (
        <div
            className={`relative overflow-hidden rounded-md bg-[#a3a3a3] p-4 ${className ?? ""}`}
        >
            <div className="flex items-start gap-4">
                <div className="flex-1 space-y-1">
                    {Array.from({ length: lines }).map((_, i) => (
                        <Skeleton key={i} className={`${height} w-full`} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CardSkeleton;
