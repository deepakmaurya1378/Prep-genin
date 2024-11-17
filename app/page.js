import { Button } from "@/components/ui/button"; // Custom Button component
import Image from "next/image";
import Link from 'next/link';
import Header from "./dashboard/_components/Header";

export default function Home() {
  return (
    <>
      <Header className="bg-black"/>
       <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-blue-300 to-purple-100 text-black">
    
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold mb-2">Prep-Genin</h1>
        <h1 className="text-lg"> A Mock Interview Platform</h1>
        <p className="text-lg">Sharpen your skills with personalized mock interviews</p>
      </header>

   
      <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800 text-center w-80">
        <h2 className="text-2xl font-semibold mb-4">Let's Get Started!</h2>
        <p className="mb-6">Click below to begin your journey.</p>
        <Link href="/dashboard"> {/* Correctly wrapped the Button in Link */}
          <Button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
            Get Started
          </Button>
        </Link>
      </div>

 
      <footer className="absolute bottom-4 text-sm text-black">
        <p>&copy; Prep-Genin. All rights reserved.</p>
      </footer>
    </div>
    </>
  );
}
