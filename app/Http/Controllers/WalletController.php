<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWalletRequest;
use App\Http\Requests\UpdateWalletRequest;
use App\Models\Transaction;
use App\Models\Wallet;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WalletController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $wallets = Wallet::withSum([
            'transactions as deposit_total' => function ($query) {
                $query->where('type', 'deposit');
            }
        ], 'amount')
        ->withSum([
            'transactions as expense_total' => function ($query) {
                $query->where('type', 'expense');
            }
        ], 'amount')
        ->get()
        ->map(function ($wallet) {
            $transfers_out = Transaction::where('type', 'transfer')
                ->where('wallet_id', $wallet->id)
                ->sum('amount');
            $transfers_in = Transaction::where('type', 'transfer')
                ->where('wallet_to_id', $wallet->id)
                ->sum('amount');
            $wallet->current_balance = ($wallet->deposit_total ?? 0)
                + $transfers_in
                - $transfers_out
                - ($wallet->expense_total ?? 0);
            return $wallet;
        });

        $totalBalance = $wallets->sum('current_balance');

        $expensesThisMonth = Transaction::where('type', 'expense')
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->sum('amount');

        $depositsThisMonth = Transaction::where('type', 'deposit')
        ->whereMonth('created_at', now()->month)
        ->whereYear('created_at', now()->year)
        ->sum('amount');

        $lastTransaction = Transaction::where('type', 'expense')
        ->whereMonth('created_at', now()->month)
        ->whereYear('created_at', now()->year)
        ->orderBy('created_at', 'desc')
        ->first();

        return Inertia::render('wallets/index', [
            'wallets' => $wallets,
            'totalBalance' => $totalBalance,
            'expensesThisMonth' => $expensesThisMonth,
            'depositsThisMonth' => $depositsThisMonth,
            'lastTransaction' => $lastTransaction
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $wallets = Auth::user()->wallets;
        return Inertia::render('wallets/create', [
            'wallets' => $wallets
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWalletRequest $request)
    {
        $wallet = new Wallet();
        $wallet->name = $request->name;
        $wallet->currency = $request->currency;
        $wallet->user_id = Auth::user()->id;
        $wallet->save();

        return to_route('wallets.index')->with('message', 'Cuenta creada correctamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(Wallet $wallet)
    {
        return Inertia::render('wallets/show', [
            'wallet' => $wallet,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Wallet $wallet)
    {
        return Inertia::render('wallets/edit', [
            'wallet' => $wallet,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWalletRequest $request, Wallet $wallet)
    {
        $wallet->name = $request->name;
        $wallet->currency = $request->currency;
        $wallet->save();

        return to_route('wallets.index')->with('message', 'Cuenta actualizada correctamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Wallet $wallet)
    {
        $wallet->delete();

        return to_route('wallets.index')->with('message', 'Cuenta eliminada correctamente');
    }
}
