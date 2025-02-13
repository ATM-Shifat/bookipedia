import LoginForm from "@/app/auth/login/LoginForm";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login"
};

export default async  function Login() {
  
  return (
    <LoginForm/>
  );
}
