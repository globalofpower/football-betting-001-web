import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SEND_FEEDBACK_QUERY } from "@/service/tanstack/queries";
import { useToaster } from "@/hooks/useToaster";

const schema = z.object({
    message: z.string().trim().min(10, "အနည်းဆုံး 10 စာလုံးရိုက်ထည့်ပါ").max(500, "အများဆုံး 500 စာလုံး"),
    file: z.instanceof(File).optional().or(z.null()),
});
type FormValues = z.infer<typeof schema>;

export const useFeedbackForm = () => {
    const [preview, setPreview] = useState<string | null>(null);
    const {showToast} = useToaster();

    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { message: "", file: null },
        mode: "onSubmit"
    });
    
    const { mutate:sendFeedback, isPending:loading } = SEND_FEEDBACK_QUERY()

    const onSelectFile = (file?: File | null) => {
        if (loading) return; 
        form.setValue("file", file ?? null, { shouldValidate: true });
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
        } else {
            setPreview(null);
        }
    };

    const onSubmit = async (values: FormValues) => {
       
        if (loading) return; 
        const formData = new FormData();
        formData.append("caption", values.message);
        if(values.file) {
            formData.append("photo", values.file);
        }
        
        sendFeedback(formData,{
            onSuccess: (res:any) =>{
                if(res.status === "success") {
                    form.reset();
                    setPreview(null);
                    showToast(res.message,"success")
                       
                }else {
                    showToast(res.message,"error");
                }
                  
            }
        })
        
    
    };

    return { form, loading, onSubmit, preview, onSelectFile}
}

