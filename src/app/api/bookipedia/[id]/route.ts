import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prismaClient";
import { getServerSession } from "next-auth";
import { NextApiRequest } from "next";

export async function PUT(req: Request, {params}: {params: Promise<{id: string}>}): Promise<NextResponse> {
  try {
    const session = await getServerSession();
    const { id } = await params;
    
    // const data = new Response(req.body).json()

    const {data, global} = await req.json()

    if (!session) {
      return NextResponse.json({ statusCode: 401, error: "Unauthorized" });
    }

    // const { searchParams } = new URL(req.url)
    // const isUser = searchParams.get("user")

    const user = await prisma.users.findUnique({
      where: { email: session?.user?.email as string },
    });

    // Find the user
    if (!user) {
      return NextResponse.json({ statusCode: 404, error: "User not found" });
    }

    const book = await prisma.books.findUnique({
      where: { id: parseInt(id as string) },
    })
    if (!book) {
      return NextResponse.json({ statusCode: 404, error: "Book not found" });
    }
    if(book.userId !== user.id){
      return NextResponse.json({ statusCode: 401, error: "Can only change own book" });
    }

    if(!data){
      await prisma.books.update({
        where: { id: parseInt(id as string) },
        data: {
          public: global
        },
      })
      return NextResponse.json({ statusCode: 200, message: `Visibility of the book updated` });
    }else{
      console.log(data)
      await prisma.books.update({
        where: { id: parseInt(id as string) },
        data: {
          title: data.title || book.title,
          author: data.author || book.author,
          genre: data.genre || book.genre,
          publishedYear: data.publishedYear || book.publishedYear,
          synopsis: data.synopsis || book.synopsis,
          public: data.public || book.public
        },
      })
      return NextResponse.json({ statusCode: 200, message: `Book updated successfully` });
    }

  } catch (error) {
    console.error("Error during user registration:", error);
    return NextResponse.json({ statusCode: 500, error: "An error occurred" });
  }
}

export async function DELETE(req: NextRequest, {params}: {params: Promise<{id: string}>}): Promise<NextResponse> {
  try {

    const session = await getServerSession();
    const {id} = await params

    if (!session) {
      return NextResponse.json({ statusCode: 401, error: "Unauthorized" });
    }

    // Find the user
    const user = await prisma.users.findUnique({
      where: { email: session?.user?.email as string },
    });
    if (!user) {
      return NextResponse.json({ statusCode: 404, error: "User not found" });
    }

    //Find the book to delete
    const book = await prisma.books.findUnique({
        where: { id : parseInt(id as string) },
    });

  
    if (!book) {
      return NextResponse.json({ statusCode: 404, error: "Book not found" });
    }

    if(book.userId !== user.id){
      return NextResponse.json({ statusCode: 401, error: "Can Only delete own book" });
    }

    //Real delete
    
    // await prisma.books.delete({
    //    where: {
    //      id : parseInt(id as string),
    //    }
    // })


    //pseudo delete
    await prisma.books.update({
      where: { id : parseInt(id as string)},
      data: { deleted: true,},
    });

    return NextResponse.json({ statusCode: 200, message: "Book deleted successfully"});

  } catch (error) {
    console.error("Error during book addition", error);
    return NextResponse.json({ statusCode: 500, error: "An error occurred during book deletions" });
  }
}
