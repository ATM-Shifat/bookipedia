"use client"

import Link from "next/link"
import { Button } from '@/components/ui/button';
import { useState } from "react";
import { toast } from 'react-hot-toast';
import { EyeIcon, EyeClosedIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";


export default function Register() {

  const router = useRouter()

  const data = {
    email: '',
    password: '',
  }

  const [formData, setFormData] = useState(data)
  const [visibility, setVisibility] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setFormData({...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try{
      // validate form data here
      if(formData.email.trim() === '' || formData.password.trim() === '') {
        toast.error('Please fill all fields');
        return;
      }

      const response = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
        callbackUrl: "/"
      })

      console.log(response)

      if(!response?.error){
        toast.success('Logged in successfully');
        router.push('/')
        router.refresh()
        return;
      }
      
      toast.error('Incorrect email or password');

    }catch(error){
      toast.error('An error occurred');
      console.error(error);
      return;
    }

  }
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login to Bookipedia</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block">Email</label>
            <input
              name="email"
              type="email"
              onChange={handleChange}
              value={formData.email}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block">Password</label>
            <div className="flex justify-between  border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <input
                name="password"
                type={visibility === false ? "password" : "text"}
                onChange={handleChange}
                className="w-full px-4 py-2 "
              />
                <div className="flex items-center ">
                  { visibility ? 
                    <EyeIcon onClick={() => setVisibility(!visibility)}/> : 
                    <EyeClosedIcon onClick={() => setVisibility(!visibility)}/>
                  }
                </div>
              </div>
          </div>

          <Button
            type="submit"
            className="w-full transition"
          >
            Login
          </Button>
          <div className='flex justify-center'>
            <h5>Don't have an account? <Link className="font-semibold" href='/auth/register'>Register</Link></h5>
          </div>
        </form>
        
      </div>
    </div>
  );
}
