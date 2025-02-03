import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ButtonLoadingProps {
    message?: string;
    className?: string;
}

export function ButtonLoading({
    message = "Por favor espere",
    className = "",
}: ButtonLoadingProps) {
    return (
        <Button disabled className={className}>
            <Loader2 className="animate-spin" />
            {message}
        </Button>
    );
}
