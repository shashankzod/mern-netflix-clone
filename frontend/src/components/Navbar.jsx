import { LogOut, Menu, Search } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authUser'
import { useContentStore } from '../store/content'

const Navbar = () => {
  const [isMobileMenu, setIsMobileMenu] = useState(false)
  const {user, logout} = useAuthStore()

  const toggleMobileMenu = ()=> setIsMobileMenu(!isMobileMenu)

  const {setContentType} = useContentStore()

  
  
  
    return (
    <header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
      <div className='flex items-center gap-10 z-50'>
        <Link to={'/'}>
        <img src="/netflix-logo.png" alt="netflix-logo" className='w-32 sm:w-40' />
        </Link>
        
        {/* desktop navbar items */}

        <div className='hidden sm:flex gap-2 items-center'>
            <Link to={"/"} className='hover:border-b-2 hover:text-lg border-red-600 p-3' onClick={()=> setContentType("movie")}>
            Movies
            </Link>
            <Link to={"/"} className='hover:border-b-2 hover:text-lg border-red-600 p-3'onClick={() => setContentType("tv")}>
            TV Shows 
            </Link>
            <Link to={"/history"} className='hover:border-b-2 hover:text-lg border-red-600 p-3'>
            Search history
            </Link>
        </div>
      </div>
      <div className='flex gap-2 items-center z-50'>
        <Link to={"/search"}>
        <Search className='size-6 cursor-pointer'/>
        </Link>
        <img src={user.image} alt="Avatar"  className='h-8 rounded cursor-pointer'/>
        <LogOut className='size-6 cursor-pointer' onClick={logout}/>
        <div className='sm:hidden '>
            <Menu className='size-6 cursor-pointer' onClick={toggleMobileMenu}/>

        </div>
      </div>
      

      

      {/* Mobile Navbar Items */}
        {isMobileMenu && (
            <div className='w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800'>
                <Link to={"/"} className='block hover:border-b-2 hover:text-[17px] border-red-600 p-1'onClick={()=> {setContentType("movie") ; toggleMobileMenu()} }>
                Movies
                </Link>

                <Link to={"/"} className='block hover:border-b-2 hover:text-[17px] border-red-600 p-1'onClick={()=> {setContentType("tv") ; toggleMobileMenu()} }>
                TV Shows
                </Link>

                <Link to={"/history"} className='block hover:border-b-2 hover:text-[17px] border-red-600 p-1' onClick={toggleMobileMenu}>
                Search History
                </Link>

            </div>
    )}

    </header>
    )
}

export default Navbar
