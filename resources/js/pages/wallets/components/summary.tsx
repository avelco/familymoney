import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { CreditCard, DollarSign } from "lucide-react"

interface SummaryProps {
    totalBalance: number;
    depositsThisMonth: number;
    expensesThisMonth: number;
    lastTransaction: any;
}

export const Summary = ({totalBalance, depositsThisMonth, expensesThisMonth, lastTransaction}: SummaryProps) => {
  return (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Balance
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatCurrency(totalBalance)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                En todas las cuentas
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Gastado en este mes
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatCurrency(expensesThisMonth)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                En todas las cuentas
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Depositado en este mes
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatCurrency(depositsThisMonth)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                En todas las cuentas
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Último gasto
                            </CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {lastTransaction ? formatCurrency(lastTransaction.amount) : 'N/A'}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {lastTransaction ? lastTransaction.description : 'Sin transacciones aún'}
                            </p>
                        </CardContent>
                    </Card>
                </div>
  )
}
