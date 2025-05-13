import type { CreateWalletInput } from "~/interfaces/walletInterface";
import prisma from "../db.server";

export async function getWallets() {
	return prisma.wallet.findMany();
}

export async function getAllWalletsWithBalance() {
  return prisma.$queryRaw`
    SELECT
      w.id,
      w.name,
      w.created_at as createdAt,
      w.updated_at as updatedAt,
      w.balance +
        IFNULL(SUM(CASE WHEN t.type = 'deposit' THEN t.amount ELSE 0 END), 0) -
        IFNULL(SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END), 0)
        AS currentBalance
    FROM wallets w
    LEFT JOIN transactions t ON t.wallet_id = w.id
    GROUP BY w.id
    ORDER BY w.created_at ASC
  `;
}

export async function createWallet(wallet: CreateWalletInput) {
  return prisma.wallet.create({
    data: wallet,
  });
}

export async function deleteWallet(id: number) {
  return prisma.wallet.delete({
    where: {
      id,
    },
  });
}