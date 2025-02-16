"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Books } from "@prisma/client";
import toast from "react-hot-toast";

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (book: Books) => void;
  initialData?: Books | null;
}

export default function BookModal({ isOpen, onClose, onSave, initialData }: BookModalProps) {
  const [book, setBook] = useState<Books>({} as Books);

  // Populate form if editing
  useEffect(() => {
    if (initialData) {
      setBook(initialData);
    } else {
      setBook({} as Books);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setBook((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    if (!book.title ||!book.author ||!book.genre || !book.publishedYear || !book.synopsis) {
      toast.error("Fields are required")
      return;
    }
    if(!book.public) book.public = false;
    onClose();
    onSave(book);
    setBook({} as Books)
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{initialData ? "Edit Book" : "Add New Book"}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-3">
          <input
            type="text"
            name="title"
            value={book?.title || ""}
            onChange={handleChange}
            placeholder="Book Title"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="author"
            value={book?.author || ""}
            onChange={handleChange}
            placeholder="Author"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="genre"
            value={book?.genre || ""}
            onChange={handleChange}
            placeholder="Genre"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="publishedYear"
            value={book?.publishedYear || ""}
            onChange={handleChange}
            placeholder="Published Year"
            className="w-full p-2 border rounded"
          />
          <textarea
            name="synopsis"
            value={book?.synopsis || ""}
            onChange={handleChange}
            placeholder="Synopsis"
            className="w-full p-2 border rounded h-24"
          />

          {/* Public Checkbox (Styled as Checkbox but Uses Radio Input) */}
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="public"
              checked={book?.public || false}
              onChange={handleChange}
              className="hidden"
            />
            <div
              className={`w-5 h-5 border-2 rounded-md flex items-center justify-center ${
                book?.public ? "bg-blue-500 border-blue-500" : "border-gray-400"
              }`}
            >
              {book?.public && <div className="w-3 h-3 bg-white rounded-sm"></div>}
            </div>
            <span>Public</span>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">
            {initialData ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
