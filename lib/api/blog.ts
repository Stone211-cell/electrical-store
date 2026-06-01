import { prisma } from "@/lib/prisma";
import type { BlogPost, Prisma } from "@prisma/client";

// ─── READ ────────────────────────────────────────────────────────────────────

export async function getBlogPosts(): Promise<BlogPost[]> {
  return prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return prisma.blogPost.findUnique({ where: { slug } });
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  return prisma.blogPost.findUnique({ where: { id } });
}

// ─── CREATE ──────────────────────────────────────────────────────────────────

export async function createBlogPost(
  data: Prisma.BlogPostCreateInput
): Promise<BlogPost> {
  return prisma.blogPost.create({ data });
}

// ─── UPDATE ──────────────────────────────────────────────────────────────────

export async function updateBlogPost(
  id: string,
  data: Prisma.BlogPostUpdateInput
): Promise<BlogPost> {
  return prisma.blogPost.update({ where: { id }, data });
}

// ─── DELETE ──────────────────────────────────────────────────────────────────

export async function deleteBlogPost(id: string): Promise<BlogPost> {
  return prisma.blogPost.delete({ where: { id } });
}
