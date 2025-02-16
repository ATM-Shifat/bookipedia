import { Header } from "@/components/Header";
import MainSection from "@/components/MainSection";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";


export default function Root(){ 

  redirect("/home")

  return (
    <></> 
  );
}
