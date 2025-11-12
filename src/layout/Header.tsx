import Image from "@/components/common/Image";
import logo from '@/assets/images/logo/logo.png';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useNavigate } from "react-router";
import { langChange } from "@/lang";

const Header = () => {
    const navigate = useNavigate();

    return (
        <header
            className="shadow-md sticky top-0 z-99999 flex items-center bg-[var(--main-color)] shadow-[0 1px 2px 0 #3c40434d,0 1px 3px 1px #3c404326] w-full max-w-[480px] h-[55px] py-[0] px-[10px]"
        >
            <div className="w-full flex items-center justify-between">
                <div onClick={()=> navigate('/')} className="cursor-pointer">
                    <Image src={logo} alt="logo" className="w-[50px] object-cover" />
                </div>
                <div>
                    <Button onClick={()=> navigate('/download')} size={'sm'} className="bg-[var(--accent-color)] hover:bg-[var(--accent-color)] cursor-pointer select-none text-[var(--font-color)] font-medium text-[14px] shadow-md">
                        {langChange.get_app}
                        <Download size={30}/>
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
