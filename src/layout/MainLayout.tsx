import PageTransition from "./PageTransition";
import Footer from "./Footer";
import { Outlet} from "react-router";



const MainLayout = () => {
    return (
        <section className={`relative z-2 w-full max-w-[480px] h-full mx-auto overflow-hidden bg-white `}>
            <div className="h-full overflow-auto">
                <PageTransition>
                    <Outlet />
                </PageTransition>
                <Footer />
              
            </div>
        </section>
    );
};

export default MainLayout;
