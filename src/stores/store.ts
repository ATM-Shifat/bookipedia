import { create } from "zustand"
import { User } from '@/lib/interfaces'
import { Books } from "@prisma/client"
import { NextResponse } from "next/server"

type Store = {
    user: User,
    publicBooks: Books[],
    userBooks: Books[],
    modalOpen: boolean,
    setUser: (user: User) => void,
    toggleModalOpen: () => void
    setUserBooks: (books: Books[]) => void
    setPublicBooks: (books: Books[]) => void
    getInformations: () => Promise<NextResponse>
  }

export const useStore = create<Store>()((set) => ({
    user: {id: 0, email: "", name: ""},
    modalOpen: false,
    userBooks: [],
    publicBooks: [],
    toggleModalOpen: () => set((state) => ({modalOpen: !state.modalOpen})),
    setUserBooks: (books: Books[]) => set((state) => ({ userBooks: books })),
    setPublicBooks: (books: Books[]) => set((state) => ({ publicBooks: books })),
    setUser: (user: User) => set((state) => ({ user: user })),
    getInformations: async () => {
      try{
        const res = await fetch("/api/bookipedia", {
          method: 'GET',
        })


        const {user, userBooks, publicBooks, statusCode} = await res.json()

        if(!res.ok){
          return NextResponse.json(res)
        }

        set((state) => ({ userBooks: userBooks}))
        set((state) => ({ publicBooks: publicBooks}))
        set((state) => ({ user: user}))

        return NextResponse.json(res)

      }catch(err){
        console.error(err)
        return NextResponse.json({statusCode: 500, error: "An error occurred during book information retrieval" })
      }
    }
  }))