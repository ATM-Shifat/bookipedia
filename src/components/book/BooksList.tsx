"use client"

import BookCard from "@/components/book/BookCard";
import BookModal from "@/components/book/BookModal";
import { useState } from "react";
import { Books } from "@prisma/client";
import { Plus } from "lucide-react";
import { useStore } from "@/stores/store";
import { redirect, usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function BooksList() {

  const pathname = usePathname();
  const [selectedBook, setSelectedBook] = useState<Books | null>(null);

  const {user, userBooks, publicBooks, modalOpen, getInformations, toggleModalOpen } = useStore()
  const router = useRouter()
  
  let books : Books[] = []
  if(pathname === "/home") books = publicBooks.sort((a : Books, b : Books) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  else books = userBooks.sort((a : Books, b : Books) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
 

  const handleEdit = (id: number) => {
    const bookToEdit = books?.find((book) => book?.id === id);
    setSelectedBook(bookToEdit as Books);
    toggleModalOpen()
  };

  const handleDelete = async (id: number) => {
    try{

      const res = await fetch(`/api/bookipedia/${id}`, {
        method: 'DELETE',
      })

      const {statusCode} = await res.json()

      if(statusCode === 200) {
        toast.success("Book deleted successfully")
        getInformations()
        return
      }

      toast.error("Failed to delete book")

    }catch(err){
      console.error(err)
      toast.error("Error occurred while while deleting book")
    }
  };

  const handleVisibility = async (id: number, makePublic: boolean) => {
    const book = books.find((book) => book.id === id)
    if(!book){
      toast.error("Book not found")
    }
    try{

      const res = await fetch(`/api/bookipedia/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          global: makePublic
        }),
      })

      const {statusCode, message, error} = await res.json()

      if(statusCode === 200) {
        toast.success(message)
        getInformations()
        return
      }

      toast.error(error)

    }catch(err){
      console.error(err)
      toast.error("An error occurred")
    }
  };

  const handleSave = async (book: Books) => {
    console.log(book)
    try{
      let res
      if(!!selectedBook){
        res = await fetch(`/api/bookipedia/${book.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({data:book}),
        })
      }else{
        book.userId = user.id
        res = await fetch(`/api/bookipedia`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({book}),
        })


        const {statusCode, message, error} = await res.json()


        if(!error){
          toast.success(message)
          getInformations()
          router.push("/home/user")
          return
        }

        toast.error(error)

      }
    }catch(err){
      console.error(err)
      toast.error("An error occurred while while saving book")
      return;
    }

    setSelectedBook(null)
  };

  const handleClose = () => {
    toggleModalOpen();
    setSelectedBook(null);
  };

  return (
    <div className="p-10">
      <div className="flex flex-wrap gap-4">
        {(books?.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onChangeVisibility={handleVisibility}
          />
        )))}
      </div>
      <BookModal
        isOpen={modalOpen}
        onClose={handleClose}
        onSave={handleSave}
        initialData={selectedBook}
      />
    </div>
  );
}
