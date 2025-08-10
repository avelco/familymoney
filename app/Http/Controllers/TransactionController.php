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
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Transaction::with('allocation', 'wallet');

        if ($request->filled('type')) {
            $query->where('type', $request->input('type'));
        }

        if ($request->filled('wallet_id')) {
            $query->where('wallet_id', $request->input('wallet_id'));
        }

        if ($request->filled('allocation_id')) {
            $query->where('allocation_id', $request->input('allocation_id'));
        }

        if ($request->filled('search')) {
            $query->where('description', 'like', '%' . $request->input('search') . '%');
        }

        if ($request->filled('start_date')) {
            $query->whereDate('date', '>=', $request->input('start_date'));
        }

        if ($request->filled('end_date')) {
            $query->whereDate('date', '<=', $request->input('end_date'));
        }

        $transactions = $query
            ->latest('created_at')
            ->paginate(10)
            ->withQueryString();

        $filters = $request->only(['search', 'type', 'wallet_id', 'allocation_id', 'start_date', 'end_date']);

        $wallets = Wallet::select('id', 'name')->orderBy('name')->get();
        $allocations = Allocation::select('id', 'name')->orderBy('name')->get();

        return Inertia::render('transactions/index', [
            'transactions' => $transactions,
            'filters' => $filters,
            'wallets' => $wallets,
            'allocations' => $allocations,
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
