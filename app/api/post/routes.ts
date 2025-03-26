import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { postSchema } from "@/schema/postSchema";
import { title } from "process";

export async function POST(req:Request){
     try{
     const body = await req.json();
    const {title,content,images,type,authorId,teamId,tags}=postSchema.parse(body);
     const newPost = await prisma.post.create({
       data: {
         title,
         content,
         images: Array.isArray(images) && images.length
           ? { create: images.map((img) => ({ url: img.url })) }
           : undefined,
         type,
         authorId,
         teamId: teamId || null,
         tags: Array.isArray(tags) && tags.length
           ? { create: tags.map((tag) => ({ userId: tag.userId })) }
           : undefined,
       },
     });

}
 catch (error) {
    console.error("Error in /api/user:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: (error as Error).message },
      { status: 500 }
    );
  }
}


export async function GET(req: Request){
     const user = await prisma.user.findMany()
     return new Response(JSON.stringify(user)),{
          status:200,
          headers:{'Content-Type':'application/json'}
     }
}



// model Post {
//   id          Int       @id @default(autoincrement())
//   title       String
//   content     String?
//   images      PostImage[]
//   type        PostType  @default(GENERAL)
//   author      User      @relation(fields: [authorId], references: [id])
//   authorId    Int
//   team        Team?     @relation(fields: [teamId], references: [id])
//   teamId      Int?
//   event       Event?    @relation(fields: [eventId], references: [id])
//   eventId     Int?
//   tags        UserTag[]
//   comments    Comment[]
//   likes       Like[]
//   createdAt   DateTime  @default(now())

// }