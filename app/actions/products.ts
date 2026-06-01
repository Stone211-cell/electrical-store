"use server";

import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

// ─── PRODUCTS ────────────────────────────────────────────────────────────────

export async function actionGetProducts(opts?: {
  categoryId?: string;
  search?: string;
}) {
  const where: Prisma.ProductWhereInput = {};
  if (opts?.categoryId) where.categoryId = opts.categoryId;
  if (opts?.search) {
    where.OR = [
      { name: { contains: opts.search, mode: "insensitive" } },
      { brand: { contains: opts.search, mode: "insensitive" } },
    ];
  }
  return prisma.product.findMany({
    where,
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function actionGetProductById(id: string) {
  return prisma.product.findUnique({ where: { id }, include: { category: true } });
}

export async function actionCreateProduct(data: Prisma.ProductUncheckedCreateInput) {
  return prisma.product.create({ data });
}

export async function actionUpdateProduct(id: string, data: Prisma.ProductUncheckedUpdateInput) {
  return prisma.product.update({ where: { id }, data });
}

export async function actionDeleteProduct(id: string) {
  return prisma.product.delete({ where: { id } });
}
