"use client"

import Link from "next/link"
import { Button } from '@/components/ui/button';
import { useState } from "react";
import { toast } from 'react-hot-toast';
import { EyeIcon, EyeClosedIcon, Router } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Register() {

  const router = useRouter()

  const data = {
    name: 'John Smith',
    email: 'example@co.com',
    password: '',
    confirmPassword: '',
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
      if(formData.name.trim() === '' || formData.email.trim() === '' || formData.password.trim() === '' || formData.confirmPassword.trim() === '') {
        toast.error('Please fill all fields');
        return;
      }

      if(formData.password.length < 6) {
        toast.error('Password must be at least 6 characters long');
        return;
      }

      if(formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }

      const response = await fetch("/api/auth/register",{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({formData})
      })
      const result = await response.json()

      console.log(result)
      
      if(result.error){
        toast.error(result.error);
        return;
      }

      toast.success(result.message);
      router.push('/auth/login')
      router.refresh()
      


    }catch(error){
      toast.error('An error occurred');
      console.error(error);
      return;
    }

  }
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Register to Bookipedia</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Name</label>
            <input
              name="name"
              type="text"
              onChange={handleChange}
              value={formData.name}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
          <div>
            <label className="block">Confirm Password</label>
            <input
              name="confirmPassword"
              type={visibility === false ? "password" : "text"}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
  
          </div>

          <Button
            type="submit"
            className="w-full transition"
          >
            Register
          </Button>
          <div className='flex justify-center'>
            <h5>Already have an account? <Link className="font-semibold" href='/auth/login'>Login</Link></h5>
          </div>
        </form>
        
      </div>
    </div>
  );
}
