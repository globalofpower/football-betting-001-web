// src/components/ui/custom-toast.tsx
import { toast } from "sonner";
import { Check, XCircle, Info, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type Props = {
    message: string;    
    type?: "success" | "error" | "info" | "warning";
    delay?: number;
    closable?: boolean;
    draggable?: boolean; // ✅ new
};

export function customToast({
    message,
    type = "success",
    delay = 1500,
    closable = true,
    draggable = false,
}: Props) {
    const iconMap = {
        success: <Check className="text-green-400" size={22} />,
        error: <XCircle className="text-red-400" size={22} />,
        info: <Info className="text-gray-400" size={22} />,
        warning: <AlertTriangle className="text-yellow-400" size={22} />,
    };

    toast.custom(
        (t) => (
        <motion.div
            drag={draggable}
            dragElastic={0.2}
            dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
            className={cn(
            "w-[320px] mx-auto rounded-2xl p-4 flex items-start gap-3 relative cursor-grab",
            "bg-gradient-to-br from-purple-900/90 via-black/90 to-purple-950/90",
            "backdrop-blur-lg border border-white/10 shadow-lg"
            )}
        >
            <div className="flex-shrink-0">{iconMap[type]}</div>
            <div className="flex flex-col flex-1">
                <span className="text-sm text-gray-400 mt-1">{message}</span>                
            </div>

            {closable && (
            <button
                onClick={() => toast.dismiss(t)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
                <X size={16} />
            </button>
            )}
        </motion.div>
        ),
        { duration:delay }
    );
}
