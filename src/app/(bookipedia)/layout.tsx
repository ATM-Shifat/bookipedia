"use client"
import { Header } from "@/components/Header";
import { useStore } from "@/stores/store";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";


export default function AuthLayout({
    children,
} : { 
    children: React.ReactNode;
}) {

    const {getInformations} =useStore()

    const handleGet = async () => {  
        try{
            const response = await getInformations()
            if(response.ok){
                toast.success('Successfully fetch data');
                return
            }
            toast.error('Failed to fetch data');

        }catch(error){
            toast.error('An error occurred');
            console.error(error);
            return;
        }
    }

    useEffect(() => {
        handleGet();
    },[])


    return (
        <SessionProvider>
        <div className="mx-auto w-full max-w-7xl">
            <Header />
            <div className="px-4 py-2">
                {children}
            </div>
        </div>   
        </SessionProvider> 
    )
}