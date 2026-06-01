import { NextRequest, NextResponse } from "next/server";
import { actionGetBlogPostById, actionUpdateBlogPost, actionDeleteBlogPost } from "@/app/actions/blog";
import { auth } from "@clerk/nextjs/server";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    const post = await actionGetBlogPostById(id);
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(post);
  } catch (error) {
    console.error("[GET /api/blog/[id]]", error);
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    const { sessionClaims } = await auth();
    const isAdmin = (sessionClaims?.metadata as { isAdmin?: string })?.isAdmin === "true";
    if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    const body = await request.json();
    const post = await actionUpdateBlogPost(id, body);
    return NextResponse.json(post);
  } catch (error) {
    console.error("[PUT /api/blog/[id]]", error);
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    const { sessionClaims } = await auth();
    const isAdmin = (sessionClaims?.metadata as { isAdmin?: string })?.isAdmin === "true";
    if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    await actionDeleteBlogPost(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE /api/blog/[id]]", error);
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
  }
}
