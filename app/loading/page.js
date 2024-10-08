import Image from "next/image";


export default function Page() {
  return (
    <main className="flex flex-col justify-center items-center h-screen">
    
        <div className="flex gap-2 mb-8">
          <Image src="/Geld-logo.svg" width={1200} height={1200} className="w-[45px]"/>
          <Image src="/Geld.svg" width={1200} height={1200} className="w-[90px]"/>
        </div>
        <div className="loader"></div>
        <p className="text-base font-semibold mt-4">Wait a moment...</p>

    
    </main>
  );
}