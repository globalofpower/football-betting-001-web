import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

const Header = () => {
    const navigate = useNavigate();
    return (
        <header
            className="
                sticky top-0 z-50
                flex items-center justify-between
                px-4 py-4
                bg-gradient-to-r from-[#131225]/90 via-[#171433]/90 to-[#0f0d1c]/90
                backdrop-blur-md
                text-white
            "
        >
            <button
                className="h-12 w-12 inline-flex items-center justify-center
                        rounded-full border border-white/15 bg-white/5
                        hover:bg-white/10 transition"
                aria-label="Notifications"
                onClick={() => navigate(-1)}
            >
                <ChevronLeft size={18} />
            </button>
        </header>
    );
};

export default Header;
