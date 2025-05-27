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
import { formatCurrency } from '@/lib/utils';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Reportes', href: '/reports' },
];

export default function Index() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Reportes" />
      <div className="flex flex-col gap-6 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Ingresos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(0)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Gastos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(0)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(0)}</div>
            </CardContent>
          </Card>
        </div>

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
