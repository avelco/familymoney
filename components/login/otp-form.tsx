"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyOtp } from "@/app/actions/login/auth";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";

interface OtpFormProps {
    email: string;
}

export function OtpForm({ email }: OtpFormProps) {
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const result = await verifyOtp(email, otp);

        if (result.success) {
            toast({
                variant: "success",
                title: "Success",
                description: "You have successfully logged in.",
            });
            // Redirect to dashboard or home page
            router.push("/dashboard");
        } else {
            toast({
                title: "Error",
                description: result.error || "Invalid OTP. Please try again.",
                variant: "destructive",
            });

            window.location.reload();
        }

        setIsLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Enter OTP</CardTitle>
                    <CardDescription>
                        Enter the 6-digit code sent to your email.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent>
                        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full"
                            type="submit"
                            disabled={isLoading || otp.length !== 6}
                        >
                            {isLoading ? "Verifying..." : "Verify OTP"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
