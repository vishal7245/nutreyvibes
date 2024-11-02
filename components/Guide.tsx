import React from 'react'
import Image from 'next/image'


const Guide = () => {
  return (
    <section className="flexCenter flex-col">
      <div className="padding-container max-container w-full pb-24">
        <Image src="/bowl-1.png" alt="Bowl" width={50} height={50} />
        <p className="uppercase regular-18 -mt-1 mb-3 text-green-50">
          We are here for your journey
        </p>
        <div className="flex flex-wrap justify-between gap-5 lg:gap-10">
          <h2 className="bold-40 lg:bold-64 xl:max-w-[390px]">Your Path to Wellness</h2>
          <p className="regular-16 text-gray-30 xl:max-w-[520px]">With NutreyVibes, you’ll never feel lost on your wellness journey. Our tailored support system provides you with easy-to-follow steps, even when life gets hectic. Whether you’re at home or on the go, we’re here to help you make the best choices for a balanced, fulfilling lifestyle. Invite friends and family to join you on this path to a healthier, happier you!</p>
        </div>
      </div>

      <div className="flexCenter max-container relative w-full">
        <Image 
          src="/guide1-min.jpg"
          alt="Diet Consulting"
          width={1440}
          height={580}
          className="w-full object-cover object-center 2xl:rounded-5xl"
        />

        <div className="absolute flex bg-white py-8 pl-5 pr-7 gap-3 rounded-3xl border shadow-md md:left-[5%] lg:top-20">
          <Image 
            src="/meter.svg"
            alt="meter"
            width={16}
            height={158}
            className="h-full w-auto"
          />
          <div className="flexBetween flex-col">
            <div className='flex w-full flex-col'>
              <div className="flexBetween w-full">
                <p className="regular-16 text-gray-20">Start</p>
                <p className="ml-2 bold-16 text-green-50">6 Months</p>
              </div>
              <p className="bold-20 mt-2">100+ Kg</p>
            </div>

            <div className='flex w-full flex-col'>
              <p className="regular-16 text-gray-20">Destination</p>
              <h4 className="bold-20 mt-2 whitespace-nowrap">70 Kg</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Guide
