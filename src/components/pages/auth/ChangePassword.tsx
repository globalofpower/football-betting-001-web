import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormLayout from "@/components/common/CustomFormLayout";
import { PasswordInput } from "@/components/common/CustomInput";

import { langChange } from "@/lang";
import { useChangePassword } from "@/components/hooks/mutation/useChangePassword";




const ChangePassword = () => {
    const { form, isLoading, onSubmit } = useChangePassword();
    
    return (
        <CustomFormLayout showLogo={false}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    
                    <PasswordInput
                        control={form.control}
                        name="old_password" 
                        label={langChange.old_password}
                        placeholder={langChange.old_password}
                    />
                    <PasswordInput
                        control={form.control}
                        name="new_password" 
                        label={langChange.new_password}
                        placeholder={langChange.new_password}
                    />
                    <PasswordInput
                        control={form.control}
                        name="confirm_password" 
                        label={langChange.confirm_password}
                        placeholder={langChange.confirm_password}
                    />
                    <Button
                        type="submit"
                        className="w-full h-10 rounded-md bg-[var(--main-color)] hover:bg-[var(--main-color)]/50 text-white"
                        disabled={ isLoading }    
                        aria-busy={isLoading}                
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {langChange.submit}
                            </>
                            ) : (
                            <>                            
                                {langChange.submit}
                            </>
                            )}
                    </Button>
                </form>
            </Form>
          </CustomFormLayout>
    );
}

export default ChangePassword;