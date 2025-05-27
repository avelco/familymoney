<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAllocationRequest;
use App\Http\Requests\UpdateAllocationRequest;
use App\Models\Allocation;
use App\Models\Budget;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AllocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Budget $budget)
    {
        $totalAllocated = $budget->allocations()->sum('amount');
        $totalSpent = Allocation::where('allocations.budget_id', $budget->id)
            ->join('transactions', 'allocations.id', '=', 'transactions.allocation_id')
            ->sum('transactions.amount');
        $allocations = Allocation::where('budget_id', $budget->id)
            ->withSum('transactions', 'amount')
            ->get();

        return Inertia::render('allocations/index', [
            'allocations' => $allocations,
            'budget' => $budget,
            'totalAllocated' => $totalAllocated,
            'totalSpent' => $totalSpent,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Budget $budget)
    {
        $totalAllocated = $budget->allocations()->sum('amount');
        return Inertia::render('allocations/create', [
            'budget' => $budget,
            'totalAllocated' => $totalAllocated,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAllocationRequest $request, Budget $budget)
    {
        //add user id to request
        $request->merge(['user_id' => Auth::user()->id]);
        $budget->allocations()->create($request->all());
        return to_route('budgets.allocations.index', $budget)->with('message', 'Asignación creada correctamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(Budget $budget, Allocation $allocation)
    {
        return Inertia::render('allocations/show', [
            'allocation' => $allocation,
            'budget' => $budget,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Budget $budget, Allocation $allocation)
    {
        $totalAllocated = $budget->allocations()->sum('amount');
        return Inertia::render('allocations/edit', [
            'allocation' => $allocation,
            'budget' => $budget,
            'totalAllocated' => $totalAllocated,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAllocationRequest $request, Budget $budget, Allocation $allocation)
    {
        $allocation->update($request->validated());
        return to_route('budgets.allocations.index', $budget)->with('message', 'Asignación actualizada correctamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Budget $budget, Allocation $allocation)
    {
        $allocation->transactions()->delete();
        $allocation->delete();
        return to_route('budgets.allocations.index', $budget)->with('message', 'Asignación eliminada correctamente');
    }
}
