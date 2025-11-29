import { Card, CardContent } from "@/components/ui/card";
import logo from "@/assets/images/logo/logo.png";

type CustomFormLayoutProps = {
    title?: string;
    subTitle?: string;
    showLogo?: boolean;
    children: React.ReactNode;
}

const CustomFormLayout:React.FC<CustomFormLayoutProps> = ({ title, subTitle, children, showLogo = true }) => {
    return (
        <div className="relative w-full py-5 bg-white">
            {showLogo && <img
                src={logo}
                alt="Logo"
                className="w-32 h-32 select-none pointer-events-none mx-auto"
            />}
            {/* 384 */}
            <Card className="relative z-10 w-[90%] max-w-sm
                            border border-[var(--secodary-color)]/20 bg-white 
                            rounded-2xl shadow-lg mt-5 mx-auto">
                <CardContent className="p-6">
                {(title || subTitle) && <div className="mb-6">
                    {(title) && <h1 className="text-2xl font-bold text-[var(--font-color)]">{title}</h1>}
                    {(subTitle) && <p className="text-sm text-[var(--font-color)]/70">{subTitle}</p>}
                </div>}

                {children}
            </CardContent>
        </Card>
    </div>
    );
}

export default CustomFormLayout;