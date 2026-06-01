"use server";

import { prisma } from "@/lib/prisma";

export async function actionGetCategories() {
  return prisma.category.findMany({ orderBy: { name: "asc" } });
}

export async function actionCreateCategory(name: string) {
  return prisma.category.create({ data: { name } });
}

export async function actionUpdateCategory(id: string, name: string) {
  return prisma.category.update({ where: { id }, data: { name } });
}

export async function actionDeleteCategory(id: string) {
  return prisma.category.delete({ where: { id } });
}
