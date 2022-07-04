import React from 'react'
import { FiSettings, FiServer } from "react-icons/fi";

export default function Navbar({ setOpenSetting }) {
  return (
    <nav className='pt-5 text-white flex justify-between w-11/12 mx-auto'>
        <div className='flex items-center gap-1 cursor-pointer'>
            <FiServer className='text-sm'/>
            <h1> Pomodoro </h1>
        </div>
        <FiSettings className='text-2xl cursor-pointer' onClick={() => setOpenSetting((value) => !value)}/>
    </nav>
  );
}
