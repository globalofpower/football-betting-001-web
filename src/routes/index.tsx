import { createBrowserRouter } from "react-router";
import { 
    BetConfirmPage,
    BodyPage,
    ParlayPage,
    VouchersPage,
} from "./routes";
import MainLayout from "@/layout/MainLayout";

const router = createBrowserRouter([
    {
        Component: MainLayout,
        // loader: authProtected,       
        children: [
            { path: '/body', Component: BodyPage },
            { path: '/parlay', Component: ParlayPage },
            { path: ':type/bet-confirm', Component: BetConfirmPage },
            { path: '/vouchers', Component: VouchersPage },
        ],
    },
]);

export default router;