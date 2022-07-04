import React from 'react';
import { DiGithubBadge, DiIe } from "react-icons/di";
import { SiLinkedin } from "react-icons/si";
import Link from 'next/link'

export default function About() {
  return (
    <div className='w-11/12 mx-auto mt-60 text-white p-2 flex justify-center'>
        <div className='flex flex-row gap-10'>
            <a href="https://github.com/Mariamikv" className=' flex gap-1' target="_blank" >
                <DiGithubBadge />
                <p>mariamikv</p>
            </a>
            <a href="https://mariamikv.github.io/MariamKv/" className=' flex gap-1' target="_blank" >
                <DiIe />
                <p>Personal Website</p>
            </a>
            
            <a href="https://www.linkedin.com/in/mariam-kvantaliani-8078b020a/" className=' flex gap-1' target="_blank" >
                <SiLinkedin />
                <p>Mariam Kvantaliani</p>
            </a>
        </div>
    </div>
  )
}
