import PageTransition from "./PageTransition";

import { Outlet, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { langChange } from "@/lang";

const PublicLayout = () => {
    const {pathname} = useLocation();
    const [headerLabel,setHeaderLabel] = useState("");

    useEffect(()=>{
        switch(pathname){
            case "/download":
                setHeaderLabel(langChange.get_app);
                break
            default:
                setHeaderLabel('');
                break;
        };
    },[pathname]);

    return (
        <section className={`relative z-[2] w-full max-w-[480px] h-full mx-auto overflow-hidden bg-white`}>
            <div className="h-full overflow-auto">
          
                <PageTransition>
                    <Outlet />
                </PageTransition>
            </div>
        </section>
    );
};

export default PublicLayout;
