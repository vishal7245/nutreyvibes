import React from 'react'

const CTA = () => {
  return (
    <section className="py-24 xl:pb-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5">
            <div className="w-full relative py-8 md:py-10 px-6 md:px-8 rounded-2xl bg-gradient-to-tr from-gray-100 to-gray-200">
                <div className="absolute right-0 top-0 h-full w-full flex justify-end">
                    <div className="w-28 h-28 overflow-hidden flex rounded-xl relative blur-2xl">
                        <span className="absolute w-16 h-16 -top-1 -right-1 bg-green-500 rounded-md rotate-45" />
                        <span className="absolute w-16 h-16 -bottom-1 -right-1 bg-teal-500 rounded-md rotate-45" />
                        <span className="absolute w-16 h-16 -bottom-1 -left-1 bg-indigo-300 rounded-md rotate-45" />
                    </div>
                </div>
                <div className="absolute left-0 bottom-0 h-full w-full flex items-end">
                    <div className="w-28 h-28 overflow-hidden flex rounded-xl relative blur-2xl">
                        <span className="absolute w-16 h-16 -top-1 -right-1 bg-green-500 rounded-md rotate-45" />
                        <span className="absolute w-16 h-16 -bottom-1 -right-1 bg-teal-500 rounded-md rotate-45" />
                        <span className="absolute w-16 h-16 -bottom-1 -left-1 bg-indigo-300 rounded-md rotate-45" />
                    </div>
                </div>
                <div className="mx-auto text-center max-w-xl md:max-w-2xl relative space-y-8">
                    <h1 className="text-3xl/tight sm:text-4xl/tight md:text-5xl/tight font-bold text-blue-950 dark:text-black">
                        Quick Start your <span className="text-transparent bg-clip-text bg-gradient-to-br from-green-600 from-20% via-green-400 via-30% to-teal-600">Personalized Wellness</span> Journey with us.
                    </h1>
                    <p className="text-gray-700">
                    Take the first step toward a healthier lifestyle with NutreyVibes. Our experts craft personalized nutrition plans tailored to your unique goals, helping you build sustainable habits and achieve real results. Whether you're looking to lose weight, boost energy, or just feel your best, NutreyVibes is here to support you every step of the way.
                    </p>
                    <div className="mx-auto max-w-md sm:max-w-xl flex justify-center">
                        <button className="outline-none h-12 px-5 rounded-xl bg-green-600 text-white flex items-center">
                            Get In touch
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default CTA
