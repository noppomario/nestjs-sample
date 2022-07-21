-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT '',
    "age" INTEGER NOT NULL DEFAULT 0,
    "email" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL DEFAULT ''
);

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");
