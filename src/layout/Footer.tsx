import { langChange } from "@/lang";
import { Airplay, UserRound, Home, Gamepad2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

const Footer = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const navItems = [
        { key: "/", icon: Home, label: <span className="text-[11px] mt-1">{langChange.home}</span>},
        { key: "/games", icon: Gamepad2, label: <span className="text-[11px] mt-1">{langChange.games}</span>},
        { key: "/goals", icon: Airplay, label: <span className="text-[11px] mt-1">{langChange.liveGoals}</span>},
        { key: "/profile", icon: UserRound, label: <span className="text-[11px] mt-1">{langChange.profile}</span>},
    ];

    return (
        <footer
        className="
            fixed bottom-0
            w-full max-w-[480px] mx-auto
            h-[70px]
            left-0
            right-0
            bg-[var(--main-color)] z-[99]
        "
        >
        <ul className="flex w-full h-full justify-between items-center">
            {navItems.map((item) => {
            const isActive = pathname === item.key;
            const Icon = item.icon;
            return (
                <li key={item.key} className="flex items-center w-full h-full">
                <button
                    onClick={() => navigate(item.key)}
                    className={`
                    w-full h-full flex flex-col items-center justify-center
                    outline-none border-none cursor-pointer
                    ${
                        isActive
                        ? "text-[var(--accent-color)]"
                        : "text-[var(--white-color)]"
                    }
                    `}
                >
                    <Icon size={20} fill={isActive? "currentColor": "none"} strokeWidth={isActive ? 0: 2} />
                    {item.label}
                </button>
                </li>
            );
            })}
        </ul>
        </footer>
    );
};

export default Footer;
