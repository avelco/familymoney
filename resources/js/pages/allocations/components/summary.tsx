
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { DollarSign, Target, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from '@/lib/utils';

export const Summary = ({ totalAllocated, allocations, totalSpent }: any) => {
    console.log(totalAllocated);
    return (
        <div className="grid gap-4 md:grid-cols-2">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Asignado</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(totalAllocated)}</div>
                    <p className="text-xs text-muted-foreground">
                        {allocations.length} asignaci{allocations.length !== 1 ? 'ones' : 'ón'}
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Progreso de gasto</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(totalSpent)}</div>
                    <Progress value={totalSpent} className="mt-2" />
                </CardContent>
            </Card>
        </div>
    )
}
