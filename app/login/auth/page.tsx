"use client";
import { useState, useEffect } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Loader2Icon } from "lucide-react";

import { otpaction, resendotpaction } from "@/app/actions/login";

import { useForm } from "react-hook-form";

// const getOtpToken = () => {
//   try {
//     const cookieString = document.cookie;
//     const cookies = cookieString.split("; ");
//     const otpTokenCookie = cookies.find((cookie) =>
//       cookie.startsWith("otp_token=")
//     );
//     if (otpTokenCookie) {
//       return otpTokenCookie.split("=")[1];
//     }
//     return null;
//   } catch (error) {
//     console.error("Error getting otp_token cookie:", error);
//     return null;
//   }
// };

export default function auth() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    clearErrors,
    setError,
  } = useForm();

  const [otpValue, setOtpValue] = useState("");
  const [timeLeft, setTimeLeft] = useState(10);
  const [showResendButton, setShowResendButton] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);
    if (timeLeft === 0) {
      setShowResendButton(true);
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [timeLeft]);

  const processVerify = async () => {
    const formdata = new FormData();
    formdata.append("otp_value", otpValue);
    const response = await otpaction(formdata);
    if (response && response?.errors) {
      setError("otp_value", { type: "invalid", message: response.errors.otp });
      return;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">
            Enter your One-Time Password
          </CardTitle>
          <CardDescription>
            Please enter the 6-digit code sent to your registered email address
            to verify your identity.
          </CardDescription>
        </CardHeader>
        <div className="mt-2 flex flex-col items-center justify-center">
          <input type="hidden" {...register("otp_value")} />
          <InputOTP
            value={otpValue}
            onChange={(value: string): void => {
              setOtpValue(value);
            }}
            maxLength={6}
            pattern="^[0-9]+$"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          {errors?.otp_value?.message && (
            <div className="text-red-500 text-sm mt-1">
              {`${errors?.otp_value?.message}`}
            </div>
          )}
        </div>
        <div className="mt-6 flex items-center justify-center gap-2">
          {!showResendButton && (
            <p className="text-muted-foreground">
              Time left for resend: {Math.floor(timeLeft / 60)}:
              {String(timeLeft % 60).padStart(2, "0")}
            </p>
          )}
          {showResendButton && (
            <form>
              <Button
                onClick={async () => {
                  await resendotpaction();
                  setOtpValue("");
                  clearErrors("otp_value");
                  setTimeLeft(10);
                  setShowResendButton(false);
                }}
                variant="link"
                className="w-auto hover:underline"
              >
                Resend OTP
              </Button>
            </form>
          )}
        </div>
        <form onSubmit={handleSubmit(processVerify)}>
          <CardFooter className="mt-4">
            <Button
              disabled={isSubmitting}
              type="submit"
              className="w-full flex gap-4"
            >
              {isSubmitting && <Loader2Icon className="animate-spin h-5 w-5" />}
              Verify OTP
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
