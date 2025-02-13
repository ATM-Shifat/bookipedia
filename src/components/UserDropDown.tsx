"use client"

import {
    Cloud,
    CreditCard,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
  } from "lucide-react"
  
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

import { signOut } from "next-auth/react"
  
  export function UserDropDown() {

    const handleCLick = () => {
      signOut()
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full w-10" asChild>
          <Button variant="ghost">
            <User/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleCLick}>
              <LogOut />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  