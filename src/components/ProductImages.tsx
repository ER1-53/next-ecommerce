"use client"

import Image from "next/image"
import { useState } from "react"

const images = [
  { id: 1, url:"https://images.pexels.com/photos/1647662/pexels-photo-1647662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
  { id: 2, url:"https://images.pexels.com/photos/4112601/pexels-photo-4112601.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
  { id: 3, url:"https://images.pexels.com/photos/3935324/pexels-photo-3935324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
  { id: 4, url:"https://images.pexels.com/photos/2079294/pexels-photo-2079294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
]

const ProductImages = () => {

  const [index,setIndex] = useState(0)
  return (
    <div className="">
      <div className="h-[500px] relative">
        <Image src={images[index].url} alt="" fill sizes="50vw" className="object-cover rounded-md" />
      </div>
      <div className="flex justify-between gap-4 mt-8 cursor-pointer">
        {images.map((img, i) => (
          <div className="w-1/4 h-32 relative gap-4 mt-8" key={img.id} onClick={()=>setIndex(i)}>
            <Image src={img.url} alt="" fill sizes="30vw" className="object-cover rounded-md" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductImages
