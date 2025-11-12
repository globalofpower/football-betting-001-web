import { useToaster } from "@/hooks/useToaster";
import { GAME_INIT_QUERY } from "@/service/tanstack/queries";
import { decodeTransferInfo, encodeTransferInfo } from "@/utils/auth-crypto";
import { useState } from "react";

export const useInitGame = () => {
    const {showToast} = useToaster();
    const [isLoading,setIsLoading] = useState(false);

    const { mutate:init, isPending:loading } = GAME_INIT_QUERY();    
    const onPlay = (game:any) => {
        if(loading)return;
        setIsLoading(true);
        let newPara = game.h5 === "mobile" ? 1 : 0;
        const data = {
            provider_name: game.p_code,
            p_code: game.p_code,
            p_type: game.p_type,
            g_code: game.g_code,
            h5: String(newPara),
            game_name: game.game_name
        };
        init(encodeTransferInfo(data), {
            onSuccess: (res:any) => {
                setIsLoading(false);
                let resDecodeData = decodeTransferInfo(res)
                if(resDecodeData.status === "success") {
                    if(resDecodeData.data.errMsg === 'SUCCESS') {
                        let url = resDecodeData.data.gameUrl
                        window.open(url, "_blank", "noopener,noreferrer");
                    }
                }
            },
                onError: (error: Error) => {
                showToast(error.message, "error");
            },
        });
    }
    return {onPlay,loading: isLoading}
}
