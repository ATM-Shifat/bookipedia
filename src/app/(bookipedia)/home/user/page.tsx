"use client"

import MainSection from "@/components/MainSection";
import { Books } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useStore } from "@/stores/store";
import { User } from "@/lib/interfaces";

import { toast } from 'react-hot-toast';

export default function Home() {
    return (
        <div className="flex justify-center mx-auto w-full max-w-7xl">
            <MainSection/>
        </div>   
    )
}