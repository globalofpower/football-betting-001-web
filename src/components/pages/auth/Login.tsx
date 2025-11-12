import { Button } from "@/components/ui/button";
import {
    Form, FormControl, FormField, FormItem, FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

import { PasswordInput, TextInput } from "@/components/common/CustomInput";
import CustomFormLayout from "@/components/common/CustomFormLayout";
import { Loader2 } from "lucide-react";
import { useLogin } from "@/components/hooks/mutation/useLogin";
import { NavLink } from "react-router";
import { langChange } from "@/lang";


const Login = () => {
    const { form, isLoading, onSubmit } = useLogin();
    return (
        <CustomFormLayout title="Welcome back" subTitle="Sign in to continue">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <TextInput 
                            control={form.control} 
                            name="username" 
                            label={langChange.username}
                            placeholder="Enter username"
                            type="text"                        
                        />                
                        <PasswordInput
                            control={form.control}
                            name="password" 
                            label={langChange.password} 
                            placeholder="Enter password"
                        />
                    

                        <div className="flex items-center justify-between pt-1">
                            <FormField
                            control={form.control}
                            name="remember"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center gap-2 space-y-0">
                                <FormControl>
                                    <Checkbox
                                    checked={field.value}
                                    onCheckedChange={(v) => field.onChange(Boolean(v))}
                                    className="border-white/25 data-[state=checked]:bg-[var(--main-color)]
                                                data-[state=checked]:border-[var(--main-color)]"
                                    />
                                </FormControl>
                                <FormLabel className="text-sm font-normal text-[var(--main-color)]">
                                    Remember me
                                </FormLabel>
                                </FormItem>
                            )}
                            />
                            <NavLink to="/auth/forgot-password" className="text-sm !text-[var(--main-color)] hover:text-violet-200">
                                {langChange.forgot_password}
                            </NavLink>
                        </div>

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
                                    {langChange.login}
                                </>
                                ) : (
                                <>                            
                                    {langChange.login}
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

export default Login;