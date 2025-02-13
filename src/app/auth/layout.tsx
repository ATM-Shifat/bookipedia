
import { Header } from "@/components/Header";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";


export default async function AuthLayout({
    children,
} : { 
    children: React.ReactNode;
}) {
    const session = await getServerSession()

    if(session){
        redirect("/")
        return
    }

    return (
        <div className="mx-auto w-full max-w-7xl">
            <div className="px-4 py-2">
                {children}
            </div>
        </div>    
    )
}