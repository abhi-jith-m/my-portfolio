import React from 'react'
import {Button} from "./ui/button.jsx"
import Link from 'next/link'
import Nav from "./Nav"
import MobileNav from './MobileNav.jsx'
const Header = () => {
  return <header className="mt-2 mb-5 py-4 xl:py-6 px-8 text-white  flex items-center justify-between">
    <div className='container mx-auto flex justify-between items-center'>

    {/* Logo */}

    <Link href="/">
      <h1 className='text-4xl font-semibold'>ABHI<span className='text-fuchsia-700'>JITH</span></h1>
    </Link>

    {/*nav for large screen*/}

    <div className='hidden xl:flex items-center gap-8'>
    <Nav />
    <Link href="/contact">
    <Button>Hire me</Button>
    </Link>
    </div>
    {/* Mobile Nav and Button for smaller screens */}
    <div className="xl:hidden flex items-center gap-4">
          <Link href="/contact">
          </Link>
          <div>
          <MobileNav><Button>Hire me</Button></MobileNav>
          
            </div> 
            
        </div>
  
    </div>
    </header>
  
}

export default Header
