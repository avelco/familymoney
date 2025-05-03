/*
  Warnings:

  - Added the required column `name` to the `allocations` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_allocations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "budget_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "allocations_budget_id_fkey" FOREIGN KEY ("budget_id") REFERENCES "budgets" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "allocations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_allocations" ("amount", "budget_id", "created_at", "id", "updated_at", "user_id") SELECT "amount", "budget_id", "created_at", "id", "updated_at", "user_id" FROM "allocations";
DROP TABLE "allocations";
ALTER TABLE "new_allocations" RENAME TO "allocations";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
