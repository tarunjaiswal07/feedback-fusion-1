import { STATUS_DATA } from "@/app/data/status-data";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest, 
    { params }: { params: Promise<{ id: number }>}
) {
    try {        
        const {userId}= await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        //check if the user is admin
        const user = await prisma.user.findUnique({
            where: { clerkUserId: userId },
        });
        if (!user || user.role !== "ADMIN") {
            return NextResponse.json({ error: "Admin access required" }, { status: 403 });
        }
        const {status} = await request.json();
        const{ id:postId } = await params;

        //validate status
        if (!STATUS_DATA.includes(status)) {
            return NextResponse.json({ error: "Invalid status" }, { status: 400 });
        }

        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: { status },
            include: {
                author: true,
                votes: true,
            },
        });
        return NextResponse.json(updatedPost);
} catch (error) {
        console.error("Error updating post status:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}