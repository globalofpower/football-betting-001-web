import PageTransition from "./PageTransition";
import Footer from "./Footer";
import { Outlet} from "react-router";
import Header from "./Header";

const MainLayout = () => {
    return (
        <section className={`relative z-2 w-full max-w-[500px] h-full mx-auto overflow-hidden bg-white pb-[70px] shadow-md`}>
            <div className="h-full overflow-auto">
                <Header />
                <PageTransition>
                    <Outlet />
                </PageTransition>
                <Footer />
            </div>
        </section>
    );
};

export default MainLayout;
