'use client';
import React from 'react'
import {Sheet, SheetContent, SheetTrigger} from "./ui/sheet"
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {CiMenuFries} from 'react-icons/ci'

const links = [
  { name: "Home", path: "/" },
  { name: "Resume", path: "/Resume" },
  { name: "Skills", path: "/Skill" },
  { name: "Project", path: "/Project" },
  { name: "Contact", path: "/Contact" },
];

const MobileNav = () => {
  const pathname = usePathname();
  
  return (
    <Sheet>
      <SheetTrigger>
        <CiMenuFries className="text-[32px] text-green-400"/>
      </SheetTrigger>
      <SheetContent className="flex flex-col items-center">
        <div className="mt-40 mb-16 text-center">
            <Link href="/">
            <h1 className='text-4xl font-semibold'>ABHI<span className='text-green-400'>.</span>
            </h1>
            </Link>
        </div>
        <nav className='flex flex-col justify-center items-center gap-6'>
          {links.map((link, index) => {
            return(
              <Link
                href={link.path}
                key={index}
                className={`${link.path === pathname && "text-green-400 border-b-2 border-green-400"} text-xl capitalize hover:text-green-400 transition-all`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav