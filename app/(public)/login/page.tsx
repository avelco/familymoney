"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MailOpen } from "lucide-react";
import { ButtonLoading } from "@/components/ui/buttonLoading";
import { useToast } from "@/hooks/use-toast";
import { GiPiggyBank } from "react-icons/gi";
import { signInWithEmail } from "@/app/actions/auth";
import { OtpForm } from "@/components/login/otp-form";

const loginSchema = z.object({
    email: z.string().email({ message: "Debes ingresar un correo válido" }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [showOtpForm, setShowOtpForm] = useState(false);
    const [email, setEmail] = useState("");
    const { toast } = useToast();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    });

    async function onSubmit(data: LoginFormInputs) {
        setIsLoading(true);
        try {
            // Call the server action
            const result = await signInWithEmail(data.email);

            if (result.success) {
                setEmail(data.email);
                toast({
                    title: "Check your email",
                    description:
                        "We've sent you a login code. Please check your email.",
                });
                setShowOtpForm(true);
            } else {
                toast({
                    title: "Error",
                    description:
                        result.error || "An error occurred. Please try again.",
                    variant: "destructive",
                });
            }
        } catch (error: any) {
            console.error("An unexpected error occurred:", error);
            toast({
                title: "Error",
                description: error.message || "Ocurrió un error inesperado",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }

    if (showOtpForm) {
        return <OtpForm email={email} />;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle className="text-center">
                        <div className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
                            <GiPiggyBank className="mr-1 h-8 w-8" />
                            FamilyMoney
                        </div>
                    </CardTitle>
                    <CardDescription>
                        Ingresa tu correo para recibir un link de login
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Ingresa tu correo"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        {!isLoading ? (
                            <Button
                                className="w-full"
                                type="submit"
                                disabled={isLoading}
                            >
                                <MailOpen className="w-5 h-5" />
                                {"Enviar link de login"}
                            </Button>
                        ) : (
                            <ButtonLoading className="w-full" />
                        )}
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
