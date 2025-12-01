import PageTransition from "./PageTransition";
import Footer from "./Footer";
import { Outlet, useLocation, useNavigate} from "react-router";
import Header from "./Header";
import { useEffect, useRef, useState } from "react";
import { FetchTaxPercent } from "@/service/graphql/queryService";
import { encodeAuth } from "@/utils/Helper";
import SubHeader from "./SubHeader";
import { langChange } from "@/lang";

const MainLayout = () => {
    const {pathname} = useLocation();
    const footballPages = ['/body','/parlay',"/1st-half"];
    const [headerLabel,setHeaderLabel] = useState("");

    useEffect(()=>{
        switch(pathname){
            case '/vouchers':
                setHeaderLabel(langChange.histories);
                break;
            // case `/vouchers/${id}`:
            //     setHeaderLabel(langChange.history + ' ' + '#' + id);
            //     break;
            default:
                setHeaderLabel('');
                break;
        };
    },[pathname]);

    const [
        fetchTaxSetting,{
        data: taxPercentData,
    }]:any = FetchTaxPercent({
        payload: null,
        pollInterval: 0,
        isLazy: true
    });
    
    useEffect(() => {
        let getFromStore = localStorage.getItem("tax");
        if(!getFromStore){
            fetchTaxSetting();
        };
        setTimeout(()=>window.scrollTo(0, 0),50);
    }, [pathname]);

    useEffect(()=>{
        if(taxPercentData){
            const encoded = encodeAuth(taxPercentData);
            localStorage.setItem("tax", encoded);
        }
    },[taxPercentData,pathname]);

    return (
        <TokenKeeper>
            <section className={`${footballPages?.includes(pathname) ? 'pb-[70px]':''} relative z-2 w-full max-w-[500px] h-full mx-auto overflow-hidden bg-[#fafafa] shadow-md`}>
                <div className="h-full overflow-auto">
                    {
                        footballPages?.includes(pathname) ? <Header /> : <SubHeader headerLabel={headerLabel} /> 
                    }
                    <PageTransition>
                        <Outlet />
                    </PageTransition>
                    {
                        footballPages?.includes(pathname) ? <Footer /> : ''
                    }
                </div>
            </section>
        </TokenKeeper>
    );
};

export default MainLayout;

const TokenKeeper = ({ children }:any) => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const initialToken = useRef(new URLSearchParams(window.location.search).get("token"));

  useEffect(() => {
    if (!initialToken.current) return;
    const currentParams = new URLSearchParams(search);
    if (!currentParams.has("token")) {
      currentParams.set("token", initialToken.current);
      navigate(`${pathname}?${currentParams.toString()}`, { replace: true });
    }
  }, [pathname, search, navigate]);

  return children;
};
