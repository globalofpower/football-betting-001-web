
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormLayout from "@/components/common/CustomFormLayout";

import { NavLink } from "react-router";
import { langChange } from "@/lang";
import { OtpCodeInput } from "@/components/common/CustomInput";
import { useVerificationCode } from "@/components/hooks/mutation/useVerificationCode";


const VerificationCode = () => {
    const { form, onSubmit} = useVerificationCode();
    return (
        <CustomFormLayout title="Welcome back" subTitle="Sign in to continue">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <OtpCodeInput
                            control={form.control}
                            name="otp_code"
                            label="OTP"
                        />                
                        <Button type="submit" className="w-full h-10 rounded-md bg-[var(--main-color)] hover:bg-[var(--main-color)]/50 text-white">                          
                            {langChange.next}
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

export default VerificationCode;