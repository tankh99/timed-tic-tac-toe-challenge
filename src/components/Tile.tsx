import React, { useState } from 'react'

type P = {
  onClick: () => void
  tileElem: string
}

export default function Tile({onClick, tileElem}: P) {
  // const [tileelem, setTileElem] = useState("");
  // const handleClick = () => {
  //   const char = onClick();
    
  // }
  return (
    <div className='w-full h-[100px] text-6xl select-non border border-black flex items-center justify-center cursor-pointer' 
      onClick={onClick}>
      {tileElem}
    </div>
  )
}
