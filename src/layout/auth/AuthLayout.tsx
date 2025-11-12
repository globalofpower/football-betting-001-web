// layout/auth/AuthLayout.tsx
import PageTransition from "../PageTransition";
import { Outlet } from "react-router";

const AuthLayout = () => {
    return (
        <main className="relative z-[2] w-full max-w-[480px] h-screen mx-auto overflow-y-auto">
            <section className="min-h-svh bg-white text-black">
                <PageTransition>
                    <div>
                        <Outlet />
                    </div>
                </PageTransition>                
            </section>
        </main>
    );
}

export default AuthLayout;