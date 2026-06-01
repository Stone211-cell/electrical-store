"use server";

import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export async function actionGetBlogPosts() {
  return prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
}

export async function actionGetBlogPostBySlug(slug: string) {
  return prisma.blogPost.findUnique({ where: { slug } });
}

export async function actionGetBlogPostById(id: string) {
  return prisma.blogPost.findUnique({ where: { id } });
}

export async function actionCreateBlogPost(data: Prisma.BlogPostCreateInput) {
  return prisma.blogPost.create({ data });
}

export async function actionUpdateBlogPost(id: string, data: Prisma.BlogPostUpdateInput) {
  return prisma.blogPost.update({ where: { id }, data });
}

export async function actionDeleteBlogPost(id: string) {
  return prisma.blogPost.delete({ where: { id } });
}
