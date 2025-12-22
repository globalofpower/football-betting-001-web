import { createBrowserRouter } from "react-router";
import { 
    BetConfirmPage,
    BodyPage,
    FirstHalfPage,
    ParlayPage,
    VoucherPage,
    VouchersPage,
} from "./routes";
import MainLayout from "@/layout/MainLayout";
import EvenOddPage from "@/pages/EvenOddPage";

const router = createBrowserRouter([
    {
        Component: MainLayout,
        // loader: authProtected,       
        children: [
            { path: '/body', Component: BodyPage },
            { path: '/1st-half', Component: FirstHalfPage },
            { path: '/even-odd', Component: EvenOddPage },
            { path: '/parlay', Component: ParlayPage },
            { path: ':type/bet-confirm', Component: BetConfirmPage },
            { path: '/vouchers', Component: VouchersPage },
            { path: "/vouchers/:id", Component: VoucherPage },
        ],
    },
]);

export default router;