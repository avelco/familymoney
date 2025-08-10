import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Transaction } from '@/types/transactions';
import { Summary } from '@/pages/transactions/components/summary';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Reportes', href: '/reports' },
];

export default function Index({ transactions }: { transactions: Transaction[] }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Reportes" />
      <div className="flex flex-col gap-6 p-6">
        <Summary transactions={transactions} />

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Gráfico Mensual</CardTitle>
            <CardDescription>Resumen de ingresos y gastos por mes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              {/* Aquí irá el componente de gráfico */}
              Gráfico de línea aquí
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
