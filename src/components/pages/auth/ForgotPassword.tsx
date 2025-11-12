import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { TextInput } from "@/components/common/CustomInput";
import CustomFormLayout from "@/components/common/CustomFormLayout";
import { Loader2 } from "lucide-react";
import { NavLink } from "react-router";

import { useForgotPassword } from "@/components/hooks/mutation/useForgotPassword";
import { langChange } from "@/lang";

const ForgotPassword = () => {
    const { form, isLoading, onSubmit} = useForgotPassword();
    return (
        <CustomFormLayout>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                   
                        <TextInput 
                            control={form.control} 
                            name="phone"
                            label={langChange.phone_no}
                            placeholder="09..."
                            type="tel"                        
                        />
                    

                        <Button
                            type="submit"
                            className="w-full h-10 rounded-md
                                    bg-[var(--main-color)] hover:bg-[var(--main-color)]/50
                                    text-white"
                                    disabled={ isLoading }    
                                    aria-busy={isLoading}                
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {langChange.next}
                                </>
                                ) : (
                                <>                            
                                    {langChange.next}
                                </>
                                )}
                        </Button>
                    </form>
                </Form>
                <p className="mt-4 text-center text-sm text-slate-600">

                    <NavLink to="/auth/register" className="!text-[var(--main-color)]">
                        {langChange.signup}
                    </NavLink>
                </p>

            </CustomFormLayout>
    );
}

export default ForgotPassword;