import { Loader2 } from "lucide-react";
import { NavLink } from "react-router";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormLayout from "@/components/common/CustomFormLayout";
import { PhoneOtpInput, PasswordInput, TextInput } from "@/components/common/CustomInput";

import { useRegister } from "@/components/hooks/mutation/useRegister";
import { langChange } from "@/lang";

const Register = () => {
    const { form, isLoading, onSubmit, getOtpHandler} = useRegister();
    
    return (
        <CustomFormLayout title="Get started" subTitle="Create an account to continue">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <TextInput
                        control={form.control}
                        name="name"
                        label={langChange.username}
                        placeholder={langChange.username}
                        type="text"
                    />       
                    <PhoneOtpInput
                        control={form.control}
                        name="phone"
                        label={langChange.phone_no}
                        placeholder="09..."
                        onGetOtp={getOtpHandler}
                        // Myanmar phone quick check (လိုသလောက် ပြင်နိုင်)
                        validateValue={(v) => /^0\d{8,10}$/.test(v)}
                        cooldownSec={45}
                    />
                    <TextInput
                        control={form.control}
                        name="otp_code"
                        label="OTP"
                        placeholder="Enter otp from sms"
                        type="number"
                    />
    
                    <PasswordInput
                        control={form.control}
                        name="password" 
                        label={langChange.password}
                        placeholder={langChange.password}
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
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}                          
                        {langChange.register}
                    </Button>
                </form>
            </Form>
            <p className="mt-4 text-center text-sm text-slate-600">
                <NavLink
                    to="/auth/login"
                    className="!text-[var(--main-color)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--main-color)]/40 rounded"
                >
                    {langChange.signin}
                </NavLink>
            </p>
          </CustomFormLayout>
    );
}

export default Register;