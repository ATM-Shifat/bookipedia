
import { HomeIcon, File, UsersRound, Users } from "lucide-react"
import Link from "next/link"

import { ModeToggle } from "@/components/ModeToggle"
import { NavButton } from "@/components/NavButton"
import { getServerSession } from "next-auth"
import { UserDropDown } from "@/components/UserDropDown"



export async function Header(){
    const session = await getServerSession()
    return (
        <header className="animate-slide bg-background h-12 p-2 border-b sticky top-0 z-20">
            <div className="flex h-8 items-center justify-between w-full">
                <div className="flex items-center">
                    <NavButton href="/" label="Home" icon={HomeIcon}/>
                </div>
                <div className="flex justify-between items-center">
                    { !!session && (
                        <UserDropDown/>
                    )

                    }
                    <ModeToggle />
                </div>

            </div>     
        </header>
    )
}