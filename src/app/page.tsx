import { Header } from "@/components/Header";
import MainSection from "@/components/MainSection";


export default function Home(){ 
  return (
    <div className="mx-auto w-full max-w-7xl">
      <Header />
      <MainSection/>
    </div>    
  );
}
