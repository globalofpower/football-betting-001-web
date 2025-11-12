import PageTransition from "./PageTransition";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useLocation, useParams } from "react-router";

import { useCombineStore } from "@/store";
import { useEffect, useState } from "react";

import { langChange } from "@/lang";
import { amountFormat } from "@/utils/Helper";


const MainLayout = () => {
    const {pathname} = useLocation();
    
    return (
        <section className={`relative z-[2] w-full max-w-[480px] h-full mx-auto overflow-hidden bg-white `}>
            <div className="h-full overflow-auto">
     
                <PageTransition>
                    <Outlet />
                </PageTransition>
            <Footer />: 
              
            </div>
        </section>
    );
};

export default MainLayout;
