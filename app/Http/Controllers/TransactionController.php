<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTransactionRequest;
use App\Http\Requests\StoreTransferRequest;
use App\Http\Requests\UpdateTransactionRequest;
use App\Models\Allocation;
use App\Models\Transaction;
use App\Models\Wallet;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $transactions = Transaction::with('allocation', 'wallet')
            ->latest('created_at')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('transactions/index', [
            'transactions' => $transactions,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $allocations = Allocation::with('budget')->get();
        $wallets = Wallet::all();
        return Inertia::render('transactions/create', [
            'allocations' => $allocations,
            'wallets' => $wallets,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTransactionRequest $request)
    {
        $transaction = Transaction::create([
            'amount' => $request->validated()['amount'],
            'description' => $request->validated()['description'],
            'type' => $request->validated()['type'],
            'date' => $request->validated()['date'],
            'allocation_id' => $request->validated()['allocation_id'],
            'wallet_id' => $request->validated()['wallet_id'],
            'user_id' => Auth::user()->id,
        ]);
        return to_route('transactions.index')->with('message', 'Transacción creada correctamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction)
    {
        return Inertia::render('transactions/show', [
            'transaction' => $transaction,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaction $transaction)
    {
        $wallets = Wallet::all();
        $allocations = Allocation::all();
        return Inertia::render('transactions/edit', [
            'transaction' => $transaction,
            'allocations' => $allocations,
            'wallets' => $wallets,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTransactionRequest $request, Transaction $transaction)
    {
        $transaction->update($request->validated());
        return to_route('transactions.index')->with('message', 'Transacción actualizada correctamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        $transaction->delete();
        return to_route('transactions.index')->with('message', 'Transacción eliminada correctamente');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function transfer()
    {
        $allocations = Allocation::all();
        $wallets = Wallet::all();
        return Inertia::render('transactions/transfer', [
            'allocations' => $allocations,
            'wallets' => $wallets,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function storeTransfer(StoreTransferRequest $request)
    {
        $validated = $request->validated();

        Transaction::create([
            'amount' => $validated['amount'],
            'description' => $validated['description'],
            'type' => 'transfer',
            'date' => $validated['date'],
            'allocation_id' => null,
            'wallet_id' => $validated['wallet_from_id'],
            'wallet_to_id' => $validated['wallet_to_id'],
            'user_id' => Auth::id(),
        ]);

        return to_route('transactions.index')->with('message', 'Transferencia realizada correctamente');
    }
}
