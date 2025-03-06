import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-[15%] bg-violet-700 h-screen flex flex-col justify-between pt-10 px-5 pb-5'>
      <div className='flex flex-col gap-15'>
        <NavLink className="flex justify-center" to={'/'}><img src={assets.logo} alt="logo" /></NavLink>
        <div className='text-xl flex flex-col gap-8'>
          <ul className='flex flex-col gap-1'>
            <li>
              <NavLink to={'/projects'}>Projects</NavLink></li>
            <li>Calendar</li>
          </ul>
          <ul>
            <li>Price calculator</li>
          </ul>
        </div>
      </div>
      <div>
        <img width={50} src={assets.settings} />
      </div>
    </div>
  )
}

export default Sidebar
