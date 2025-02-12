import React from 'react'
import { useAuth } from '../hooks'

export const ChatInput = () => {


    const {darkMode} = useAuth();

  return (
    <>
    
        <form className='fixed bottom-10 w-[90%] lg:w-[60%]'>
            <div className='relative'>
                <input 
                    type="text"
                    placeholder='Message Austronaut'
                    className='h-24 w-full shadow-[0_0.1rem_0.6rem_rgba(0,0,0,0.25)] dark:shadow-[0_0.1rem_0.6rem_rgba(255,255,255,0.25)] lg:dark:shadow-[0_0.1rem_0.8rem_rgba(255,255,255,0.25)] bg-gray-100 dark:bg-[#202129] rounded-3xl px-4 placeholder-gray-600 dark:placeholder-gray-50 dark:text-white focus-visible:outline-0 pb-[1.90rem] transition-all' 
                />
                <button className='rounded-full w-9 h-9 flex items-center justify-center absolute right-3 bottom-4 bg-black dark:bg-[#EDEDED] cursor-pointer'>
                
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        height="1.2rem" 
                        viewBox="0 -960 960 960" 
                        width="1.2rem" 
                        fill={darkMode? '#000' : "#fff"}
                        className='me-[0.7px]'
                        >
                            <path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z"/>
                    </svg>
                </button>
            </div>
        </form>
    
    </>
  )
}
