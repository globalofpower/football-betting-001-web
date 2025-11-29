import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ChevronsUpDown, Check} from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";



type InputProps = {
  control: any;               // react-hook-form control
  name: string;               // field name
  label: string;              // label text
  placeholder?: string;       // placeholder text  
  className?: string;         // extra classes
};

type PasswordInputProps = InputProps;
type TextInputProps = InputProps & { type?: string; }
type TextAreaProps = InputProps & { value?: string; disabled?: boolean; }

const TextInput:React.FC<TextInputProps> = ({ control, name, label, placeholder, type = "text", className = "" })=> {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
            <FormItem>
                <FormLabel className="text-[var(--font-color)] mb-1.5">{label}</FormLabel>
                <FormControl>
                    <Input
                        type={type}
                        placeholder={placeholder}
                        className={`bg-[var(--secodary-color)]/5 border-[var(--secodary-color)]/15 text-[var(--font-color)] placeholder:text-[var(--font-color)]/40 
                            focus-visible:ring-2 focus-visible:!ring-[color:var(--secodary-color)]/80 focus-visible:!border-transparent  selection:!bg-[var(--secodary-color)]/30 selection:text-current
                            ${className}`}
                        {...field}
                    />
                </FormControl>
                <FormMessage className="text-red-300/90" />
            </FormItem>
            )}
        />
    )
}

const TextareaInput:React.FC<TextAreaProps> = ({control,name,value, label, placeholder, className = "", disabled = false }:any) => {
    const msg = value;
    return (<FormField
                        control={control}
                        name={name}
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel className="text-[var(--font-color)]">
                                    {label}
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                    <Textarea
                                        rows={5}
                                        placeholder={placeholder}
                                        disabled={disabled}   
                                        className={cn(
                                        "w-full rounded-md px-3 py-2",
                                        "bg-[var(--white-color)] text-[var(--font-color)]",
                                        "border border-[var(--secodary-color)]/30",
                                        "placeholder:text-[var(--font-color)]/40",
                                        "focus-visible:ring-2 focus-visible:ring-[color:var(--secodary-color)]/80 focus-visible:border-transparent",
                                        "resize-none h-36 overflow-auto",
                                        disabled && "opacity-60 cursor-not-allowed", // ✅ visual state
                                        className
                                        )}
                                        
                                        {...field}
                                    />

                                    <span className="pointer-events-none absolute bottom-1 right-2 text-xs text-[var(--font-color)]/60">
                                        {msg.length}/500
                                    </span>
                                    </div>
                                </FormControl>
                                <FormMessage className="text-red-400" />
                            </FormItem>
                        )}
                    />)
}

const PasswordInput:React.FC<PasswordInputProps> = ({ control, name, label, placeholder, className = "" }) => {
    const [show, setShow] = useState(false);    
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-[var(--font-color)] mb-1.5">{label}</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Input
                                type={show ? "text" : "password"}
                                placeholder={placeholder}
                                className={`bg-[var(--secodary-color)]/5 border-[var(--secodary-color)]/15 text-[var(--font-color)] placeholder:text-[var(--font-color)]/40 
                                    focus-visible:ring-2 focus-visible:!ring-[color:var(--secodary-color)]/80 focus-visible:!border-transparent selection:!bg-[var(--secodary-color)]/30 selection:text-current
                                     ${className}`}
                                {...field}
                            />
                            <button
                                type="button"
                                onClick={() => setShow((s) => !s)}
                                className="absolute inset-y-0 right-2 my-auto h-8 w-8
                                            rounded-full grid place-items-center
                                            text-[var(--font-color)]/70 hover:text-[var(--font-color)]/90"
                                aria-label={show ? "Hide password" : "Show password"}
                            >
                                {show ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                        </div>
                    </FormControl>
                    <FormMessage className="text-red-300/90" />
                </FormItem>
            )}
        />
    )
}

type PhoneOtpInputProps = {
  control: any;                 // RHF control
  name: string;                 // e.g. "phone"
  label: string;
  placeholder?: string;
  className?: string;
  buttonLabel?: string;         // default: "GET OTP"
  cooldownSec?: number;         // default: 30
  onGetOtp: (value: string) => Promise<void> | void; // call your API
  validateValue?: (value: string) => boolean;        // default: length >= 6
};

const PhoneOtpInput:React.FC<PhoneOtpInputProps> = ({ 
    control, name, label, placeholder, className = "",
    buttonLabel = "GET OTP", cooldownSec = 30,
    onGetOtp, validateValue,
}) => {
    const [sending, setSending] = useState<boolean>(false);
    const [left, setLeft] = useState<number>(0);

    useEffect(() => {
        if (left <= 0) return;
        const id = setInterval(() => setLeft((s) => s - 1), 1000);
        return () => clearInterval(id);
    }, [left]);

    const canRequest = (val: string) =>
        validateValue ? validateValue(val) : (val?.trim().length ?? 0) >= 6;

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                <FormLabel className="text-[var(--font-color)] mb-1.5">{label}</FormLabel>
                <FormControl>
                    <div className="relative">
                    {/* input ကို button နဲ့မထိခိုက်အောင် right padding ပိုထား */}
                    <Input
                        placeholder={placeholder}
                        className={`pr-28 bg-[var(--secodary-color)]/5 border-[var(--secodary-color)]/15 
                                    text-[var(--font-color)] placeholder:text-[var(--font-color)]/40 
                                    focus-visible:ring-2 focus-visible:!ring-[color:var(--secodary-color)]/80 
                                    focus-visible:!border-transparent selection:!bg-[var(--secodary-color)]/30 selection:text-current ${className}`}
                        {...field}
                    />

                    <button
                        type="button"
                        onClick={async () => {
                        if (!canRequest(field.value) || sending || left > 0) return;
                        try {
                            setSending(true);
                            await onGetOtp(field.value);
                            setLeft(cooldownSec); // start cooldown after success
                        } finally {
                            setSending(false);
                        }
                        }}
                        disabled={!canRequest(field.value) || sending || left > 0}
                        className="absolute right-0 top-1/2 -translate-y-1/2 h-10 px-3 rounded-md
                                bg-[var(--secodary-color)] text-white text-xs font-semibold
                                disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {sending
                        ? "SENDING..."
                        : left > 0
                        ? `RESEND in ${left}s`
                        : buttonLabel}
                    </button>
                    </div>
                </FormControl>
                <FormMessage className="text-red-300/90" />
                </FormItem>
            )}
        />
    );
};




type Option = { label: string; value: string | number; icon?: React.ReactNode };

type DropdownInputProps = {
    control: any;                 // RHF control
    name: string;                 // field name
    label: string;
    options: Option[];
    placeholder?: string;
    className?: string;
    disabled?: boolean;
};

const DropdownInput: React.FC<DropdownInputProps> = ({
    control, name, label, options, placeholder = "Select…", className = "",
    disabled = false,
}) => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");

    const filterOptions = useMemo(() => {
        if (!query) return options;
        const q = query.toLowerCase();
        return options.filter(o => o.label.toLowerCase().includes(q));
    }, [options, query]);

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                const selected = options.find(o => String(o.value) === String(field.value));
                return (
                <FormItem>
                    <FormLabel className="text-[var(--font-color)]">{label}</FormLabel>
                    <FormControl>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <button
                                type="button"
                                disabled={disabled}
                                className={`h-10 w-full rounded-md px-3 text-left
                                            bg-[var(--secodary-color)]/5 border border-[var(--secodary-color)]/15
                                            text-[var(--font-color)] placeholder:text-[var(--font-color)]/40
                                            focus-visible:outline-none focus-visible:ring-2
                                            focus-visible:ring-[color:var(--secodary-color)]/80
                                            focus-visible:border-transparent
                                            disabled:cursor-not-allowed disabled:opacity-60
                                            relative flex items-center justify-between ${className}`}
                                aria-haspopup="listbox"
                                aria-expanded={open}
                            >
                                <span className={selected ? "" : "text-[var(--font-color)]/40"}>
                                    {selected ? selected.label : placeholder}
                                </span>
                                <ChevronsUpDown size={16} className="opacity-70" />
                            
                            </button>
                        </PopoverTrigger>

                        <PopoverContent
                            side="bottom"
                            align="center"
                            avoidCollisions={false}
                            className="w-[var(--radix-popover-trigger-width)] 
                                        p-0 bg-white border border-[var(--secodary-color)]/20 
                                        shadow-xl rounded-md
                                        max-h-[min(60vh,24rem)] overflow-y-auto"
                        >
                        
                            <div className="p-2">
                                <input
                                    autoFocus placeholder="Search…" value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="w-full h-9 rounded-md px-3
                                            bg-[var(--secodary-color)]/5 border border-none
                                            text-[var(--font-color)] placeholder:text-[var(--font-color)]/40
                                            focus:outline-none"
                                />
                            </div>
                            

                            <ul role="listbox" className="max-h-60 overflow-y-auto py-1">
                                {filterOptions.length === 0 && (
                                    <li className="px-3 py-2 text-sm text-[var(--font-color)]/60">No results</li>
                                )}
                                {filterOptions.map((opt) => {
                                    const isSel = String(opt.value) === String(field.value);
                                    return (
                                        <li
                                            key={String(opt.value)}
                                            role="option"
                                            aria-selected={isSel}
                                            onClick={() => {
                                                field.onChange(opt.value);
                                                setOpen(false);
                                                setQuery("");
                                            }}
                                            className={`flex items-center gap-2 px-3 py-2 cursor-pointer
                                                        hover:bg-[var(--secodary-color)]/10`}
                                        >
                                            <span className={`shrink-0 ${isSel ? "opacity-100" : "opacity-0"}`}>
                                                <Check size={16} />
                                            </span>
                                            {opt.icon && <span className="shrink-0">{opt.icon}</span>}
                                            <span className="text-[var(--font-color)]">{opt.label}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </PopoverContent>
                    </Popover>
                    </FormControl>
                    <FormMessage className="text-red-300/90" />
                </FormItem>
                );
            }}
        />
    );
};




type OtpCodeInputProps = {
  control: any;
  name: string;          // "otp_code"
  label?: string;
  length?: number;       // default 6
  className?: string;
  onComplete?: (code: string) => void;
};

const OtpCodeInput: React.FC<OtpCodeInputProps> = ({
  control, name, label = "OTP", length = 6, className = "", onComplete,
}) => {
  const onlyDigits = useMemo(() => new RegExp(`^\\d{0,${length}}$`), [length]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const val: string = String(field.value ?? "");
        return (
          <FormItem>
            <FormLabel className="text-[var(--font-color)] mb-1.5">{label}</FormLabel>
            <FormControl>
              <InputOTP
                maxLength={length}
                value={val}
                onChange={(v) => {
                  const v2 = (v || "").replace(/\D/g, "").slice(0, length);
                  if (!onlyDigits.test(v2)) return;
                  field.onChange(v2);
                  if (onComplete && v2.length === length) onComplete(v2);
                }}
                containerClassName={`gap-2 ${className}`}
                className="disabled:cursor-not-allowed"
              >
                <InputOTPGroup className="flex items-center justify-between w-full">
                  {Array.from({ length }).map((_, i) => (
                    <InputOTPSlot
                      key={i}
                      index={i}
                      className="
                        h-10 w-10
                        !rounded-md
                        bg-[var(--secodary-color)]/5
                        border !border-[var(--secodary-color)]/15
                        text-[var(--font-color)] text-lg font-medium
                        data-[active=true]:ring-2 data-[active=true]:ring-[color:var(--secodary-color)]/80
                        
                      "
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </FormControl>
            <FormMessage className="text-red-300/90" />
          </FormItem>
        );
      }}
    />
  );
};


export { TextInput, PasswordInput, PhoneOtpInput, DropdownInput, OtpCodeInput, TextareaInput };