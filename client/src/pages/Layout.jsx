import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { SignIn, useUser, SignedIn, SignedOut,RedirectToSignIn  } from '@clerk/clerk-react';

const Layout = () => {

  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false); 
  const {user} = useUser();

  return (
    <div className='flex flex-col items-start justify-start h-screen'>

      <SignedIn> 

        <nav className='w-full ps-4 min-h-14 flex items-center justify-between border-b border-gray-200'>
          <img src={assets.logo} alt="logo" onClick={()=>navigate('/')} className="cursor-pointer w-44 h-10"/>

          {
            sidebar? <X className='w-6 h-6 text-gray-600 sm:hidden cursor-pointer' onClick={()=>setSidebar(false)} />
            :
            <Menu className='w-6 h-6 text-gray-600 sm:hidden cursor-pointer' onClick={()=>setSidebar(true)}/>
          }
        </nav>

        <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
            <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>

            <div className='flex-1 bg-[#F4F7FB]'>
              <Outlet/>
            </div>
        </div>

      </SignedIn>

      <SignedOut>
          <RedirectToSignIn/>
      </SignedOut>

    </div>
  )
  /*
  this was our original method to protect routes before using user variable 
  return user? (
    <div className='flex flex-col items-start justify-start h-screen'>

      <nav className='w-full ps-4 min-h-14 flex items-center justify-between border-b border-gray-200'>
        <img src={assets.logo} alt="logo" onClick={()=>navigate('/')} className="cursor-pointer w-44 h-10"/>

        {
          sidebar? <X className='w-6 h-6 text-gray-600 sm:hidden cursor-pointer' onClick={()=>setSidebar(false)} />
          :
          <Menu className='w-6 h-6 text-gray-600 sm:hidden cursor-pointer' onClick={()=>setSidebar(true)}/>
        }
      </nav>

      <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
          <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>

          <div className='flex-1 bg-[#F4F7FB]'>
            <Outlet/>
          </div>
      </div>

    </div>
  ):
  <div className="flex items-center justify-center h-screen">
    <SignIn/>
  </div>
  */
}

export default Layout