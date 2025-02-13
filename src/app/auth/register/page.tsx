
import RegisterForm from "@/app/auth/register/RegisterForm";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Register"
};


export default async function Register() {
  return (
    <RegisterForm/>
  );
}
