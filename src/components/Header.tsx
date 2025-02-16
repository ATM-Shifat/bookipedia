
import { HomeIcon, BookLock, Plus, BookPlus} from "lucide-react"
import Link from "next/link"

import { ModeToggle } from "@/components/ModeToggle"
import { NavButton } from "@/components/NavButton"
import { UserDropDown } from "@/components/UserDropDown"
import { useSession } from "next-auth/react";
import { useStore } from "@/stores/store";


export function Header(){
    const { data : session} = useSession()
    const {user, modalOpen, toggleModalOpen} = useStore()
    return (
        <header className={`animate-slide h-12 p-2 border-b sticky top-0 z-20 ${modalOpen ? "pointer-events-none" : ""}`}>
            <div className="flex h-8 items-center justify-between w-full">
                <div className="flex items-center gap-5">
                    <NavButton href="/home" label="Home" icon={HomeIcon}/>
                    <NavButton href="/home/user" label="Personal" icon={BookLock}/>
                    <p onClick={() => toggleModalOpen()}>
                        <NavButton label="Add" icon={Plus}/>
                    </p>
                    
                </div>
                <div className="flex justify-between items-center">
                    { !!session && (
                        <UserDropDown name={user?.name || "User Name"}/>
                    )
                    }
                    <ModeToggle />
                </div>

            </div>     
        </header>
    )
}
