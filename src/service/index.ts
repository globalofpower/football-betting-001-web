import { clearAuth, getAuth } from "@/utils/auth-storage";

export const fetchApi = async ({
    api = "",
    data = {},
    method = "POST",
    token = null,
}:{
    api:string;
    data?:any;
    method?:string;
    token?: string | null;
}) => {
    const url = api;

    if(!token) {
        const auth = getAuth();
        if(auth?.token){
            token = auth.token;
        }
    }
    
    const options:any = {
        method,
        headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        body: method !== "GET" ? JSON.stringify(data) : undefined,
    };
    if(data instanceof FormData) {
        options.headers = {
            "Accept": "multipart/form-data",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        }
        options.body = data;
    }
    try {
        const fetcher = await fetch(url, options);
        const res = await fetcher.json();
        if ([403].includes(fetcher.status) || res?.errors?.[0]?.message === "E_UNAUTHORIZED_ACCESS: Unauthorized access") {
            clearAuth();
            window.location.href = "/auth/login";
        };
        if (fetcher.status === 404) {
            return "Not Found";
        };
        // if ([500, 429, 400].includes(fetcher.status)) {
        //     return res?.message || res?.errors || "Something Wrong!";
        // };
        // if(fetcher.status === 200 && res){                
        //     if(res.status === "success" || res.status || res.success){
        //         return res;
        //     }                
        // }; 
        return res;
    } catch (error: any) {
        console.error(error);        
        if(error.message === "Failed to fetch"){
            return "Please check internet connection";
        };
        return error;
        
    }
};