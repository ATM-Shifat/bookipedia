"use client";

import { Pencil, Trash2, Globe, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Books } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useStore } from "@/stores/store";


interface BookCardProps {
  book: Books;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onChangeVisibility: (id : number, makePublic: boolean) => void;
}

export default function BookCard({ book, onEdit, onDelete, onChangeVisibility }: BookCardProps) {
  const { data: session } = useSession();
  const {user} = useStore();
  return (
    <div className="bg-white shadow-md rounded-2xl p-5 w-full max-w-md">
      <h2 className="text-xl font-semibold">{book.title}</h2>
      <p className="text-gray-500 text-sm">{book.author} - {book.publishedYear}</p>
      <p className="text-gray-600 italic mt-2">{book.genre}</p>
      <p className="text-gray-700 mt-4 text-sm line-clamp-3">{book.synopsis}</p>

      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600"><span className="font-semibold">Last update:</span>{book.updatedAt.toString()}</p>
        {user.id === book.userId && (
          <div>
            <Button variant="ghost" title="Edit" aria-label="Edit"  className="rounded-full" onClick={() => onEdit(book.id)}>
                <Pencil size={20}/>
            </Button>
            {book.public ? (
              <Button variant="ghost" title="Lock" aria-label="Lock"  className="rounded-full" onClick={() => onChangeVisibility(book.id, false)} >
                <Lock size={20} />
              </Button>
            ) : (
              <Button variant="ghost" title="Global" aria-label="Global"  className="rounded-full" onClick={() => onChangeVisibility(book.id, true)}>
                <Globe size={20} />
              </Button>
            )}
            <Button variant="ghost" title="Delete" aria-label="Delete"  className="rounded-full" onClick={() => onDelete(book.id)}>
              <Trash2 size={20} />
            </Button>
          </div>
        )}
        </div>
      
    </div>
  );
}
