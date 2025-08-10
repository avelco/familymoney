<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $start = Carbon::now()->startOfMonth();
        $end = Carbon::now()->endOfMonth();
        $transactions = Transaction::whereBetween('date', [$start, $end])
            ->get();

        // Build last 3 months (including current)
        $rangeStart = Carbon::now()->copy()->subMonths(2)->startOfMonth();
        $rangeEnd = Carbon::now()->endOfMonth();

        $base = [];
        for ($i = 2; $i >= 0; $i--) {
            $c = Carbon::now()->copy()->subMonths($i);
            $ym = $c->format('Y-m');
            $base[$ym] = [
                'month' => $ym,
                'deposit' => 0.0,
                'expense' => 0.0,
            ];
        }

        $rows = Transaction::whereBetween('date', [$rangeStart, $rangeEnd])
            ->selectRaw("to_char(date, 'YYYY-MM') as ym, type, SUM(amount) as total")
            ->groupByRaw("to_char(date, 'YYYY-MM'), type")
            ->orderBy('ym')
            ->get();

        foreach ($rows as $row) {
            $ym = $row->ym;
            if (!isset($base[$ym])) continue;
            if (in_array($row->type, ['deposit', 'expense'])) {
                $base[$ym][$row->type] = (float) $row->total;
            }
        }

        $monthlySeries = array_values($base);

        return Inertia::render('dashboard', [
            'transactions' => $transactions,
            'monthlySeries' => $monthlySeries,
        ]);
    }
}
