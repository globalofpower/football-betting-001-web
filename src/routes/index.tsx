import { createBrowserRouter, Navigate } from "react-router";
import { 
    HomePage,
} from "./routes";
import { authProtected, redirectIfAuthed } from "./protected";
import MainLayout from "@/layout/MainLayout";
import AuthLayout from "@/layout/auth/AuthLayout";
import PublicLayout from "@/layout/PublicLayout";

const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        // loader: authProtected,       
        children: [
            { index: true, Component: HomePage },
           
            
        ],
    },
    {
        // path: "/auth",
        // Component: AuthLayout,
        // loader: redirectIfAuthed,
        // children: [
        
      
        // ],
    },
    // {
    //     path: "/download",
    //     Component: PublicLayout,
    //     children: [
    //         { index: true, Component: DownloadPage },
    //     ],
    // },
    {
        path: "*",             
        element: <Navigate to="/" replace/>
    }
]);

export default router;