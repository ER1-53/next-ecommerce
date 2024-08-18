"use client"

import Image from "next/image"
import { useState } from "react"

const images = [
  { id: 1, url:"https://images.pexels.com/photos/4207778/pexels-photo-4207778.jpeg?auto=compress&cs=tinysrgb&w=600"},
  { id: 2, url:"https://images.pexels.com/photos/4198139/pexels-photo-4198139.jpeg?auto=compress&cs=tinysrgb&w=600"},
  { id: 3, url:"https://images.pexels.com/photos/4207793/pexels-photo-4207793.jpeg?auto=compress&cs=tinysrgb&w=600"},
  { id: 4, url:"https://images.pexels.com/photos/4207790/pexels-photo-4207790.jpeg?auto=compress&cs=tinysrgb&w=600"}
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
