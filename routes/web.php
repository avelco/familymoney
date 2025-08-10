<?php

use App\Http\Controllers\AllocationController;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WalletController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    if (Auth::check()) {
        // User is logged in, redirect to the dashboard
        return redirect()->route('dashboard');
    } else {
        // User is not logged in, redirect to the login page
        return redirect()->route('login');
    }
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, '__invoke'])->name('dashboard');

    Route::resource('wallets', WalletController::class);
    Route::resource('budgets', BudgetController::class);
    Route::resource('budgets.allocations', AllocationController::class);
    Route::get('transactions/transfer', [TransactionController::class, 'transfer'])->name('transactions.transfer');
    Route::post('transactions/transfer', [TransactionController::class, 'storeTransfer'])->name('transactions.transfer.store');
    Route::resource('transactions', TransactionController::class);
    // Duplicate dashboard route removed; the dashboard route above passes current-month transactions.
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
