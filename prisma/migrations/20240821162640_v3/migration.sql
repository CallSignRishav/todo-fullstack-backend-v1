/*
  Warnings:

  - You are about to drop the column `read` on the `Todo` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Todo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "todoName" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Todo" ("id", "todoName") SELECT "id", "todoName" FROM "Todo";
DROP TABLE "Todo";
ALTER TABLE "new_Todo" RENAME TO "Todo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
