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
import { formatCurrency } from '@/lib/utils';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Reportes', href: '/reports' },
];

type MonthlyPoint = { month: string; deposit: number; expense: number };

function MonthlyLineChart({ data }: { data: MonthlyPoint[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-muted-foreground">
        Sin datos para mostrar
      </div>
    );
  }

  const width = 640;
  const height = 240;
  const margin = { top: 12, right: 16, bottom: 36, left: 48 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;

  const maxValRaw = Math.max(
    ...data.flatMap((d) => [Number(d.deposit) || 0, Number(d.expense) || 0]),
    0
  );
  // Avoid divide-by-zero
  const maxVal = maxValRaw === 0 ? 1 : maxValRaw;

  const x = (i: number) =>
    data.length <= 1 ? innerW / 2 : (i * innerW) / (data.length - 1);
  const y = (v: number) => innerH - (v / maxVal) * innerH;

  const linePath = (key: 'deposit' | 'expense') =>
    data
      .map((d, i) => `${i === 0 ? 'M' : 'L'} ${margin.left + x(i)} ${margin.top + y(Number(d[key]) || 0)}`)
      .join(' ');

  const yTicks = 4;
  const yTickVals = Array.from({ length: yTicks + 1 }, (_, i) =>
    Math.round((i * maxVal) / yTicks)
  );

  const monthLabel = (ym: string) => {
    // ym = 'YYYY-MM'
    const date = new Date(`${ym}-01T00:00:00`);
    return date.toLocaleDateString('es-ES', { month: 'short' });
  };

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[280px]">
        {/* Grid & axes */}
        <g>
          {yTickVals.map((val, idx) => (
            <g key={`grid-${idx}`}>
              <line
                x1={margin.left}
                x2={margin.left + innerW}
                y1={margin.top + y(val)}
                y2={margin.top + y(val)}
                stroke="currentColor"
                className="text-muted-foreground/20"
              />
              <text
                x={margin.left - 6}
                y={margin.top + y(val)}
                textAnchor="end"
                dominantBaseline="middle"
                className="fill-muted-foreground text-[10px]"
              >
                {formatCurrency(val)}
              </text>
            </g>
          ))}

          {/* X axis labels */}
          {data.map((d, i) => (
            <text
              key={`x-${i}`}
              x={margin.left + x(i)}
              y={margin.top + innerH + 18}
              textAnchor="middle"
              className="fill-muted-foreground text-[11px]"
            >
              {monthLabel(d.month)}
            </text>
          ))}
        </g>

        {/* Lines */}
        <path d={linePath('deposit')} fill="none" stroke="#16a34a" strokeWidth={2} />
        <path d={linePath('expense')} fill="none" stroke="#dc2626" strokeWidth={2} />

        {/* Points + Labels */}
        {data.map((d, i) => {
          const dep = Number(d.deposit) || 0;
          const cx = margin.left + x(i);
          const cy = margin.top + y(dep);
          return (
            <g key={`g-dep-${i}`}>
              <circle cx={cx} cy={cy} r={3} fill="#16a34a" />
              <text
                x={cx}
                y={cy - 8}
                textAnchor="middle"
                className="text-[10px]"
                fill="#16a34a"
              >
                {formatCurrency(dep)}
              </text>
            </g>
          );
        })}
        {data.map((d, i) => {
          const exp = Number(d.expense) || 0;
          const cx = margin.left + x(i);
          const cy = margin.top + y(exp);
          return (
            <g key={`g-exp-${i}`}>
              <circle cx={cx} cy={cy} r={3} fill="#dc2626" />
              <text
                x={cx}
                y={cy + 12}
                textAnchor="middle"
                className="text-[10px]"
                fill="#dc2626"
              >
                {formatCurrency(exp)}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="mt-2 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: '#16a34a' }} />
          <span className="text-muted-foreground">Ingresos</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: '#dc2626' }} />
          <span className="text-muted-foreground">Gastos</span>
        </div>
      </div>
    </div>
  );
}

export default function Index({ transactions, monthlySeries }: { transactions: Transaction[]; monthlySeries: MonthlyPoint[] }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Reportes" />
      <div className="flex flex-col gap-6 p-6">
        <Summary transactions={transactions} />

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Ingresos vs Gastos (últimos 3 meses)</CardTitle>
            <CardDescription>Comparativa mensual de los últimos 3 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <MonthlyLineChart data={monthlySeries} />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
