import React from 'react'
import Link from "next/link"

const page = () => {
  return (
    <section className="py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 divide-y divide-gray-200">
            <div className="flex md:justify-between md:flex-row flex-col gap-3 md:items-center">
                <div className="max-w-2xl space-y-3">
                    <h1 className="text-3xl/tight sm:text-4xl/tight font-bold text-gray-900 ">
                        Get Access to All NutreyVibes Plans for <span className="text-green-500">₹4000/month</span><span className='text-sm'> (on 6 months plans) </span>
                    </h1>
                    <p className="text-gray-700 ">
                    Find the right plan and start your journey to a healthier, balanced lifestyle with NutreyVibes.
                    </p>
                </div>
            </div>
            {/* Pricing Boxes  */}
            <div className="grid mt-10 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 mx-auto">
                    <div className="rounded-lg border border-gray-100 bg-lime-200 p-6 sm:p-10 space-y-6">
                        <div className="text-center space-y-3">
                            <h2 className="font-semibold text-2xl text-gray-900">
                                Monthly
                            </h2>
                            <p className="text-gray-700">
                            Kickstart your wellness with personalized diet plans, weekly check-ins, and expert support.
                            </p>
                        </div>
                        <div className="flex relative py-3 before:absolute before:top-1/2 before:inset-0 before:h-px before:bg-gray-700" />
                        <div className="text-center space-y-2">
                            <p className="text-3xl font-bold text-gray-900">
                                ₹5000 <br /><span className='text-sm'>(Save ₹0)</span>
                            </p>
                            <span className="text-gray-700">Per user</span>
                        </div>
                        <div className="flex relative py-3 before:absolute before:top-1/2 before:inset-0 before:h-px before:bg-gray-700" />
                        <div className="flex justify-center">
                            <a href="#" className="outline-none w-max flex items-center mx-auto h-11 px-5 rounded-md bg-gray-100 text-green-700">
                                Get Started
                            </a>
                        </div>
                    </div>
                    <div className="rounded-lg relative border border-gray-100 bg-lime-300 p-6 sm:p-10">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 px-3 py-1 rounded-b-lg bg-green-600 text-white">
                            Recommended
                        </div>
                        <div className="space-y-6">
                            <div className="text-center space-y-3">
                                <h2 className="font-semibold text-2xl text-gray-900">
                                    6 Months
                                </h2>
                                <p className="text-gray-700">
                                    Deep, lasting results with comprehensive support, detox diets, and monthly adjustments.
                                </p>
                            </div>
                            <div className="flex relative py-3 before:absolute before:top-1/2 before:inset-0 before:h-px before:bg-gray-700" />
                            <div className="text-center space-y-2">
                                <p className="text-3xl font-bold text-gray-900">
                                    ₹24000 <br /><span className='text-sm'>(Save ₹6000)</span>
                                </p>
                                <span className="text-gray-700">Per user</span>
                            </div>
                            <div className="flex relative py-3 before:absolute before:top-1/2 before:inset-0 before:h-px before:bg-gray-700" />
                            <div className="flex justify-center">
                                <Link href="#" className="outline-none w-max mx-auto flex items-center h-11 px-5 rounded-md bg-green-500 text-white">
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border border-gray-100 bg-lime-200 p-6 sm:p-10 space-y-6">
                        <div className="text-center space-y-3">
                            <h2 className="font-semibold text-2xl text-gray-900">
                                3 Months
                            </h2>
                            <p className="text-gray-700">
                                Extended guidance for sustainable progress with personalized plans and regular follow-ups.
                            </p>
                        </div>
                        <div className="flex relative py-3 before:absolute before:top-1/2 before:inset-0 before:h-px before:bg-gray-700" />
                        <div className="text-center space-y-2">
                            <p className="text-3xl font-bold text-gray-900">
                            ₹13000 <br /><span className='text-sm'> (Save ₹2000) </span>
                            </p>
                            <span className="text-gray-700">Per user</span>
                        </div>
                        <div className="flex relative py-3 before:absolute before:top-1/2 before:inset-0 before:h-px before:bg-gray-700" />
                        <div className="flex justify-center">
                            <Link href="#" className="outline-none w-max mx-auto flex items-center h-11 px-5 rounded-md bg-gray-100 text-green-700">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>

            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10 pt-6">
                <div className="md:col-span-2 lg:col-span-1 space-y-3">
                    <span className="pl-5 relative before:absolute before:w-4 before:h-0.5 before:rounded-md before:left-0 before:top-1/2 before:bg-emerald-700  text-emerald-700">
                        All you need to manage your calories
                    </span>
                    <h2 className="text-3xl font-bold text-gray-900">
                        Take control of your wellness with NutreyVibes.
                    </h2>
                    <p className="text-gray-700">
                        Effortless Wellness, Tailored for You – with NutreyVibes.
                    </p>
                </div>
                <ul className="divide-y divide-gray-200 text-gray-700 children:py-3 last:pb-0 first:pt-0">
                    
                    <li className="flex py-3 items-center gap-x-4">
                        <span className="w-5 h-5 text-sm flex items-center justify-center rounded-full bg-green-500 text-white">✓</span>
                        Customized Nutrition Plans
                    </li>
                    <li className="flex py-3 items-center gap-x-4">
                        <span className="w-5 h-5 text-sm flex items-center justify-center rounded-full bg-green-500 text-white">✓</span>
                        Real-Time Progress Tracking
                    </li>
                    <li className="flex py-3 items-center gap-x-4">
                        <span className="w-5 h-5 text-sm flex items-center justify-center rounded-full bg-green-500 text-white">✓</span>
                        Expert Guidance
                    </li>
                    <li className="flex py-3 items-center gap-x-4">
                        <span className="w-5 h-5 text-sm flex items-center justify-center rounded-full bg-green-500 text-white">✓</span>
                        Weekly Check-ins
                    </li>
                    <li className="flex py-3 items-center gap-x-4">
                        <span className="w-5 h-5 text-sm flex items-center justify-center rounded-full bg-green-500 text-white">✓</span>
                        Detox Diets
                    </li>
                </ul>
                <ul className="divide-y divide-gray-200 text-gray-700 children:py-3 last:pb-0 first:pt-0">
                    <li className="flex py-3 items-center gap-x-4">
                        <span className="w-5 h-5 text-sm flex items-center justify-center rounded-full bg-green-500 text-white">✓</span>
                        Flexible Plans
                    </li>
                    <li className="flex py-3 items-center gap-x-4">
                        <span className="w-5 h-5 text-sm flex items-center justify-center rounded-full bg-green-500 text-white">✓</span>
                        24/7 Support via Chat
                    </li>
                    <li className="flex py-3 items-center gap-x-4">
                        <span className="w-5 h-5 text-sm flex items-center justify-center rounded-full bg-green-500 text-white">✓</span>
                        Flexible Meal Options
                    </li>
                    <li className="flex py-3 items-center gap-x-4">
                        <span className="w-5 h-5 text-sm flex items-center justify-center rounded-full bg-green-500 text-white">✓</span>
                        Exclusive Recipes
                    </li>
                    <li className="flex py-3 items-center gap-x-4">
                        <span className="w-5 h-5 text-sm flex items-center justify-center rounded-full bg-green-500 text-white">✓</span>
                        Monthly Progress Reports
                    </li>
                </ul>
            </div>
        </div>
    </section>
  )
}

export default page
