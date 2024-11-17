"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Upgrade from '../Upgrade/page'
import how_it_works from '../HowItWorks/page'
function Header() {
    
    const path = usePathname();
    useEffect(() => {
        console.log(path);
        console.log("step1");
    },[])
  return (
    <div className="flex p-4 items-center justify-between shadow-md">
          <Image src={'/prep-genin-high-resolution-logo.png'} width={160} height={100} alt='logo' />
          <ul className="hidden md:flex gap-6">
              <li className={`hover:text-blue-500 hover:font-bold transition-all cursor-pointer
                  ${path=='/' && 'text-blue-500 font-bold'}
              `}> <Link href="/">Home</Link></li>

              <li className={`hover:text-blue-500 hover:font-bold transition-all cursor-pointer
                  ${path=='/dashboard' && 'text-blue-500 font-bold'}
              `}><Link href="/dashboard">Dashboard</Link></li>

              <li className={`hover:text-blue-500 hover:font-bold transition-all cursor-pointer
                  ${path=="/dashboard/Upgrade" && 'text-blue-500 font-bold'}
              `}> <Link href="/dashboard/Upgrade">Upgrade</Link></li>

              <li className={`hover:text-blue-500 hover:font-bold transition-all cursor-pointer
                  ${path=='/dashboard/HowItWorks' && 'text-blue-500 font-bold'}
              `}> <Link href="/dashboard/HowItWorks">How it works</Link></li>
          </ul>
              <UserButton/>
        
    </div>
  )
}

export default Header

