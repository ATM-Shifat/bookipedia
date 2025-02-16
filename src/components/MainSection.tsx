import { Card, CardHeader, CardTitle,CardContent } from "@/components/ui/card";
import BooksList from "@/components/book/BooksList";
import { Books } from "@prisma/client";


export default function MainSection() {
 
    return (
      <div className="flex flex-col justify-center items-center">
         <BooksList />
      </div>
    )
}