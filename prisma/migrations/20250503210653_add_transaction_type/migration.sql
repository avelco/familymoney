-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_transactions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" REAL NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'expense',
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "allocation_id" INTEGER,
    "user_id" INTEGER NOT NULL,
    "account_id" INTEGER,
    "wallet_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "transactions_allocation_id_fkey" FOREIGN KEY ("allocation_id") REFERENCES "allocations" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "transactions_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "transactions_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_transactions" ("account_id", "allocation_id", "amount", "created_at", "date", "id", "updated_at", "user_id", "wallet_id") SELECT "account_id", "allocation_id", "amount", "created_at", "date", "id", "updated_at", "user_id", "wallet_id" FROM "transactions";
DROP TABLE "transactions";
ALTER TABLE "new_transactions" RENAME TO "transactions";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
