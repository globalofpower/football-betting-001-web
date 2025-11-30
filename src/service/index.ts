
export const fetchApi = async ({
    api = "",
    data = {},
    method = "POST",
}:{
    api:string;
    data?:any;
    method?:string;
}) => {
    const url = api;

    const urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get('token');

    if(!token) {
        return "Invalid Auth";
    };
    
    const options:any = {
        method,
        headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `${token}`,
            },
        body: method !== "GET" ? JSON.stringify(data) : undefined,
    };
    if(data instanceof FormData) {
        options.headers = {
            "Accept": "multipart/form-data",
            "Authorization": `${token}`,
        }
        options.body = data;
    }
    try {
        const fetcher = await fetch(url, options);
        const res = await fetcher.json();
        if ([403].includes(fetcher.status) || res?.errors?.[0]?.message === "E_UNAUTHORIZED_ACCESS: Unauthorized access") {
            return "Invalid Auth";
        };
        if (fetcher.status === 404) {
            return "Not Found";
        };
        return res;
    } catch (error: any) {
        console.error(error);        
        if(error.message === "Failed to fetch"){
            return "Please check internet connection";
        };
        return error;
        
    }
};