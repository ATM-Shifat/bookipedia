import { NextResponse } from "next/server";
import prisma from "@/db/prismaClient";
import { getServerSession } from "next-auth";

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ statusCode: 401, error: "Unauthorized" });
    }

    // const { searchParams } = new URL(req.url)
    // const isUser = searchParams.get("user")

    const user = await prisma.users.findUnique({
      where: { email: session?.user?.email as string },
    });

    if (!user) {
      return NextResponse.json({ statusCode: 404, error: "User not found" });
    }

    const publicBooks = await prisma.books.findMany({
      where:{
        public: true,
        deleted: false,
      }
    })

    const userBooks = await prisma.books.findMany({
      where:{
        userId: user.id,
        deleted: false,
      }
    })

    // const books = await prisma.books.findMany({
    //   where:{
    //     deleted: false,
    //   }
    // })

    // const books = allBooks.filter((book)=>book.deleted === false)

    return NextResponse.json({ statusCode: 200, publicBooks: publicBooks, userBooks: userBooks, user: {id: user.id, email: user.email, name: user.name} });
    
  } catch (error) {
    console.error("Error during user registration:", error);
    return NextResponse.json({ statusCode: 500, error: "An error occurred during registration" });
  }
}

export async function POST(req: Request): Promise<NextResponse> {
  try {

    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ statusCode: 401, error: "Unauthorized" });
    }

    const {book} = await req.json()
    console.log(book);
    if (!book?.title ||!book?.author ||!book?.genre ||!book?.publishedYear ||!book?.synopsis ||!book?.userId) {
      return NextResponse.json({ statusCode: 400, error: "All fields are required!" });
    }

    const user = await prisma.users.findUnique({
      where: { email: session?.user?.email as string },
    });

    if (!user) {
      return NextResponse.json({ statusCode: 404, error: "User not found" });
    }

    const existingBook = await prisma.books.findFirst({
      where: {
        userId: user?.id as number,
        title: book?.title as string,
      }
    });

  
    if (existingBook) {
      //The case where the user pseudo deleted the book 
      if(existingBook.deleted){
        await prisma.books.update({
          where: { id: existingBook?.id },
          data: { 
            title: existingBook.title as string,
            author: existingBook.author as string,
            genre: existingBook.genre as string,
            publishedYear: existingBook.publishedYear as string,
            synopsis: existingBook.synopsis as string,
            public: existingBook.public as boolean,
            deleted: false },
        })
        return NextResponse.json({ statusCode: 200, message: "Book added successfully"});
      }
      return NextResponse.json({ statusCode: 409, error: "This book already added by this user" });
    }
    
    const books = await prisma.books.create({
      data: book
    })

    return NextResponse.json({ statusCode: 201, message: "Book added successfully"});

  } catch (error) {
    console.error("Error during book addition", error);
    return NextResponse.json({ statusCode: 500, error: "An error occurred during book additions" });
  }
}
