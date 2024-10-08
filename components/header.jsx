"use client"
import { UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { useRouter } from 'next/navigation'
import Link from "next/link";


export function Header() {
    const router = useRouter()
    return (
        <header className="flex justify-between items-center w-full px-[5%] py-2 ">
            <div className="flex gap-4"> 
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/">Records</Link>
            </div>
            <div className="flex gap-4 justify-center align-center h-[40px] ">
                <Button onClick={() => router.push(`?create=new`)}
                    className="rounded-full">+Record</Button>
                <UserButton />
            </div>
        </header>)
}