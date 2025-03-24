import React, { useEffect, useRef, useState } from 'react'
import { useContentStore } from '../store/content'
import axios from 'axios'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SMALL_IMG_URL } from '../utils/constants'

const MovieSlider = ({category}) => {
  
  const {contentType} = useContentStore()
  const [content, setContent] = useState([])
  const [showArrows, setShowArrows] = useState(false)

  const sliderRef = useRef(null)

  const formattedCategory = 
  category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1)

  const formattedContent = contentType === "movie" ? "Movies" : "TV Shows"

  useEffect(()=>{
    const getContent = async ()=>{
    const res = await axios.get(`/api/v1/${contentType}/${category}`)
    setContent(res.data.content)
    } 
    getContent()
  },[contentType, category])

    const slideLeft =() =>{
      if(sliderRef.current){
        sliderRef.current.scrollBy({left : -sliderRef.current.offsetWidth/2,behavior: "smooth"})
      }
    }
    const slideRight =() =>{
      sliderRef.current.scrollBy({left : sliderRef.current.offsetWidth/2,behavior: "smooth"})
    }
  
    return (
    <div className='bg-black text-white relative px-5 md:px-20'
    onMouseEnter={()=>setShowArrows(true)}
    onMouseLeave={()=>setShowArrows(false)}>
      <h2 className='mb-5 text-2xl font-bold'>
        {formattedCategory} {formattedContent}
      </h2>
      <div className='flex space-x-4 overflow-x-scroll scrollbar-hide' ref={sliderRef}>
        {content.map((item) =>{
          if (item.backdrop_path === null) return null;
          return(
            <Link to={`/watch/${item.id}`} className='min-w-[250px] relative group' key={item.id}>
            <div className='rounded-lg overflow-hidden'>
                <img src={SMALL_IMG_URL + item.backdrop_path} alt="Movie Image" 
                className='transition-transform duration-300 ease-in-out group-hover:scale-125'/>

            </div>
            <p className='mt-2 text-center'>
                {item.title || item.name}
            </p>
            </Link>
            )
})}
      </div>
      {showArrows && (
        <>
        <button className='absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center 
        size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 text-white z-10' onClick={slideLeft}>
         <ChevronLeft size={24}/> 
        </button>

        <button className='absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center 
        size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 text-white z-10' onClick={slideRight}>
         <ChevronRight size={24}/> 
        </button>
        </>
      )}
    </div>
  )
}

export default MovieSlider
