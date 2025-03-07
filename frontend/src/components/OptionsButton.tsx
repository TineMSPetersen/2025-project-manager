import React from 'react'
import { assets } from '../assets/assets'

const OptionsButton = () => {
  return (
    <div className='bg-linear-to-b from-[#FF0036] to-[#321234] p-4 rounded-full outline-2 outline-[#FF0036] absolute bottom-5 right-5'>
      <img width={50} src={assets.options} alt="" />
    </div>
  )
}

export default OptionsButton
