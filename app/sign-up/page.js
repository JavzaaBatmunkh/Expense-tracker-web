import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";


export default function Page() {
  return (
    <main className="grid grid-cols-2 h-screen">
      <div className="flex flex-col w-3/4 lg:w-1/2 mx-auto items-center justify-center gap-4 text-center">
        <div className="flex gap-2 mb-8">
          <Image src="/Geld-logo.svg" width={1200} height={1200} className="w-6"/>
          <Image src="/Geld.svg" width={1200} height={1200} className="w-[48px]"/>
        </div>
        <div className="mb-4">
          <h1 className="text-2xl font-semibold">Create Geld account</h1>  
          <p className="text-base text-slate-700 font-light">Sign up below to create your Wallet account</p> 
        </div>
        <Input type="name" placeholder="Name" className="bg-[#F3F4F6]"/>
        <Input type="email" placeholder="Email" className="bg-[#F3F4F6]"/>
        <Input type="password" placeholder="Password" className="bg-[#F3F4F6]"/>
        <Input type="password" placeholder="Re-enter your password" className="bg-[#F3F4F6]"/>
        <Button className="w-full bg-[#0166FF] rounded-2xl mb-4">Sign up</Button>
        <div className="text-base text-slate-700 font-light">Already have account? <Link href="" className="text-[#0166FF]">Log in</Link></div>
      </div>

      <div className="bg-[#0166FF]">

      </div>
    </main>
  );
}
