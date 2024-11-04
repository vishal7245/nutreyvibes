'use client'
import { useState, useEffect } from 'react'
import Image from "next/image"
import { testimonials, Testimonial } from '@/constants'

const page = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right'>('right')

  const nextTestimonial = () => {
    setDirection('right')
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection('left')
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isTransitioning])

  const currentTestimonial = testimonials[currentIndex]
  return (
    <section className="py-10 xl:py-20 mb-10 xl:mb-0 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 space-y-16">
        <div className="space-y-4 max-w-2xl">
        <div className="flex items-center space-x-2">
            <Image
                src="/bowl-1.png"
                alt="Bowl"
                width={50}
                height={50}
                className="w-10 lg:w-[50px]"
            />
            <span className="text-green-600 font-semibold relative pl-2">
                - Happy Clients
            </span>
        </div>
          <h1 className="font-bold text-gray-800 text-3xl">Client's Say About Us</h1>
        </div>
        <div className="relative">
          <div className="flex md:items-stretch gap-10 lg:gap-14">
            <div className="hidden md:flex md:w-1/2 lg:w-2/5 md:h-auto overflow-hidden">
              <div 
                className={`w-full h-full transition-transform duration-300 ease-in-out ${
                  isTransitioning 
                    ? direction === 'right' 
                      ? '-translate-x-full' 
                      : 'translate-x-full'
                    : 'translate-x-0'
                }`}
              >
                <Image 
                  src={currentTestimonial.avatar} 
                  width={1900} 
                  height={900} 
                  alt="Author Avatar" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col space-y-6 md:space-y-12 lg:space-y-16 md:py-6 lg:py-8 md:h-auto md:justify-center overflow-hidden">
              <div 
                className={`transition-transform duration-300 ease-in-out ${
                  isTransitioning 
                    ? direction === 'right' 
                      ? '-translate-x-full' 
                      : 'translate-x-full'
                    : 'translate-x-0'
                }`}
              >
                <p className="text-xl lg:text-2xl font-medium text-gray-700">
                  {currentTestimonial.content}
                </p>
              </div>
              <div 
                className={`flex items-start gap-4 transition-transform duration-300 ease-in-out ${
                  isTransitioning 
                    ? direction === 'right' 
                      ? '-translate-x-full' 
                      : 'translate-x-full'
                    : 'translate-x-0'
                }`}
              >
                <Image 
                  src={currentTestimonial.avatar} 
                  width={1900} 
                  height={1200} 
                  alt="Author avatar" 
                  className="w-12 h-12 rounded-full flex md:hidden"
                />
                <div className="space-y-1 flex-1">
                  <h2 className="text-lg font-semibold leading-none text-gray-800">
                    {currentTestimonial.author}
                  </h2>
                  <p className="text-gray-600">
                    {currentTestimonial.position}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:absolute md:right-0 md:bottom-6 lg:bottom-8 bg-lime-200 p-1 rounded-lg flex items-start gap-3 w-max mt-10 md:mt-0">
            <button 
              onClick={prevTestimonial}
              aria-label="Previous Testimonial" 
              className="outline-none p-2.5 rounded-md text-gray-700 transition ease-linear hover:bg-green-500 bg-lime-300"
              disabled={isTransitioning}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z" clipRule="evenodd" />
              </svg>
            </button>
            <button 
              onClick={nextTestimonial}
              aria-label="Next Testimonial" 
              className="outline-none p-2.5 rounded-md text-gray-700 transition ease-linear hover:bg-green-500 bg-lime-300"
              disabled={isTransitioning}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default page
