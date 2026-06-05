import { NextRequest, NextResponse } from "next/server";
import { actionGetBlogPosts, actionCreateBlogPost } from "@/app/actions/blog";
import { checkIsAdmin } from "@/lib/admin";

export async function GET() {
  try {
    const posts = await actionGetBlogPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("[GET /api/blog]", error);
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAdmin = await checkIsAdmin();
    if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    const body = await request.json();
    const post = await actionCreateBlogPost(body);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("[POST /api/blog]", error);
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}
