import Image from 'next/image'
import Button from '@/components/Button'
import Link from 'next/link'

const hero = () => {
  return (
    <section className="py-4 mt-14 sm:mt16 lg:mt-0">
    <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 grid lg:grid-cols-2 lg:items-center gap-10">
      <div className="flex flex-col space-y-8 sm:space-y-10 lg:items-center text-center lg:text-left max-w-2xl md:max-w-3xl mx-auto">
      <h1 className="font-semibold leading-tight text-black text-4xl sm:text-5xl lg:text-6xl">
        We'll be happy to take care of <span className="text-green-500">your diet.</span>
      </h1>
        <p className=" flex text-gray-900 dark:text-gray-700 tracking-tight md:font-normal max-w-xl mx-auto lg:max-w-none">
        Navigating nutrition and wellness can be challenging. We're here to make it simple, providing personalized guidance and support to help you achieve a balanced, healthier lifestyle.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full">
          <Link href="#" className="px-6 items-center h-12 rounded-3xl bg-green-600 text-white duration-300 ease-linear flex justify-center w-full sm:w-auto">
            Get started
          </Link>
          <Link href="#" className="px-6 items-center h-12 rounded-3xl text-green-700 border border-gray-100 dark:border-gray-800 dark:text-white bg-gray-100 dark:bg-gray-900 duration-300 ease-linear flex justify-center w-full sm:w-auto">
            Book a call
          </Link>
        </div>
      </div>
      <div className="flex aspect-square lg:aspect-auto lg:h-[35rem] relative">
        <div className="w-3/5 h-[80%] rounded-3xl overflow-clip border-8 border-gray-200 dark:border-gray-950 z-30">
          <Image src="/hero1-min.jpg" alt="Healthy Food" width={1300} height={1300} className="w-full h-full object-cover z-30" />
        </div>
        <div className="absolute right-0 bottom-0 h-[calc(100%-50px)] w-4/5 rounded-3xl overflow-clip border-4 border-gray-200 dark:border-gray-800 z-10">
          <Image src="/hero2-min.jpg" alt="Healthy Girl" height={1300} width={1300} className="z-10 w-full h-full object-cover" />
        </div>
      </div>
    </div>
  </section>
  )
}

export default hero
