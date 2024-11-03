import React from 'react'
import Link from "next/link"

const page = () => {
  return (
    <section className="py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 divide-y divide-gray-200">
            <div className="flex md:justify-between md:flex-row flex-col gap-3 md:items-center">
                <div className="max-w-2xl space-y-3">
                    <h1 className="text-3xl/tight sm:text-4xl/tight font-bold text-gray-900 ">
                        Get access to all MediCare Soft for only <span className="text-green-500">$1200</span>
                    </h1>
                    <p className="text-gray-700 ">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, deserunt atque.
                    </p>
                </div>
                <div>
                    <Link href="#" className="h-12 flex items-center w-max px-5 rounded-lg bg-green-500  text-white transition ease-linear hover:bg-opacity-80">
                        Get Started now
                    </Link>
                </div>
            </div>

            <div className="grid mt-10 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 mx-auto">
                    <div className="rounded-lg border border-gray-100 bg-white p-6 sm:p-10 space-y-6">
                        <div className="text-center space-y-3">
                            <h2 className="font-semibold text-2xl text-gray-900">
                                Starter Plan
                            </h2>
                            <p className="text-gray-700">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </p>
                        </div>
                        <div className="flex relative py-3 before:absolute before:top-1/2 before:inset-0 before:h-px before:bg-gray-100" />
                        <div className="text-center space-y-2">
                            <p className="text-3xl font-bold text-gray-900">
                                $40.00
                            </p>
                            <span className="text-gray-700">Per Month/Per user</span>
                        </div>
                        <div className="flex relative py-3 before:absolute before:top-1/2 before:inset-0 before:h-px before:bg-gray-100" />
                        <div className="flex justify-center">
                            <a href="#" className="outline-none w-max flex items-center mx-auto h-11 px-5 rounded-md bg-gray-100 text-green-500">
                                Get Started
                            </a>
                        </div>
                    </div>
                    <div className="rounded-lg relative border border-gray-100 bg-gray-100 p-6 sm:p-10">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 px-3 py-1 rounded-b-lg bg-gray-200 text-gray-700">
                            Recommended
                        </div>
                        <div className="space-y-6">
                            <div className="text-center space-y-3">
                                <h2 className="font-semibold text-2xl text-gray-900">
                                    Profesional
                                </h2>
                                <p className="text-gray-700">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </p>
                            </div>
                            <div className="flex relative py-3 before:absolute before:top-1/2 before:inset-0 before:h-px before:bg-gray-200" />
                            <div className="text-center space-y-2">
                                <p className="text-3xl font-bold text-gray-900">
                                    $100.00
                                </p>
                                <span className="text-gray-700">Per Month/Per user</span>
                            </div>
                            <div className="flex relative py-3 before:absolute before:top-1/2 before:inset-0 before:h-px before:bg-gray-200" />
                            <div className="flex justify-center">
                                <Link href="#" className="outline-none w-max mx-auto flex items-center h-11 px-5 rounded-md bg-green-500 text-white">
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border border-gray-100 bg-white p-6 sm:p-10 space-y-6">
                        <div className="text-center space-y-3">
                            <h2 className="font-semibold text-2xl text-gray-900">
                                Starter Plan
                            </h2>
                            <p className="text-gray-700">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </p>
                        </div>
                        <div className="flex relative py-3 before:absolute before:top-1/2 before:inset-0 before:h-px before:bg-gray-100" />
                        <div className="text-center space-y-2">
                            <p className="text-3xl font-bold text-gray-900">
                                $40.00
                            </p>
                            <span className="text-gray-700">Per Month/Per user</span>
                        </div>
                        <div className="flex relative py-3 before:absolute before:top-1/2 before:inset-0 before:h-px before:bg-gray-100" />
                        <div className="flex justify-center">
                            <Link href="#" className="outline-none w-max mx-auto flex items-center h-11 px-5 rounded-md bg-gray-100 text-green-500">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>

            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10 pt-6">
                <div className="md:col-span-2 lg:col-span-1 space-y-3">
                    <span className="pl-5 relative before:absolute before:w-4 before:h-0.5 before:rounded-md before:left-0 before:top-1/2 before:bg-emerald-700  text-emerald-700">
                        All you need to manage your clinic
                    </span>
                    <h2 className="text-3xl font-bold text-gray-900">
                        Modern way to have control on your clinic
                    </h2>
                    <p className="text-gray-700">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, deserunt atque.
                    </p>
                </div>
                <ul className="divide-y divide-gray-200 text-gray-700 children:py-3 last:pb-0 first:pt-0">
                    
                    <li className="flex py-3 items-center gap-x-4">
                        <span className="w-5 h-5 text-sm flex items-center justify-center rounded-full bg-green-500 text-white">✓</span>
                        Advantage 1
                    </li>
                    <li className="flex py-3 items-center gap-x-4">
                        <span className="w-5 h-5 text-sm flex items-center justify-center rounded-full bg-green-500 text-white">✓</span>
                        Advantage 2
                    </li>
                    <li className="flex py-3 items-center gap-x-4">
                        <span className="w-5 h-5 text-sm flex items-center justify-center rounded-full bg-green-500 text-white">✓</span>
                        Advantage 3
                    </li>
                    <li className="flex py-3 items-center gap-x-4">
                        <span className="w-5 h-5 text-sm flex items-center justify-center rounded-full bg-green-500 text-white">✓</span>
                        Advantage 4
                    </li>
                    <li className="flex py-3 items-center gap-x-4">
                        <span className="w-5 h-5 text-sm flex items-center justify-center rounded-full bg-green-500 text-white">✓</span>
                        Advantage 6
                    </li>
                </ul>
                <ul className="divide-y divide-gray-200 text-gray-700 children:py-3 last:pb-0 first:pt-0">
                    <li className="flex py-3 items-center gap-x-4">
                        <span className="w-5 h-5 text-sm flex items-center justify-center rounded-full bg-green-500 text-white">✓</span>
                        Advantage 1
                    </li>
                    <li className="flex py-3 items-center gap-x-4">
                        <span className="w-5 h-5 text-sm flex items-center justify-center rounded-full bg-green-500 text-white">✓</span>
                        Advantage 2
                    </li>
                    <li className="flex py-3 items-center gap-x-4">
                        <span className="w-5 h-5 text-sm flex items-center justify-center rounded-full bg-green-500 text-white">✓</span>
                        Advantage 3
                    </li>
                    <li className="flex py-3 items-center gap-x-4">
                        <span className="w-5 h-5 text-sm flex items-center justify-center rounded-full bg-green-500 text-white">✓</span>
                        Advantage 4
                    </li>
                    <li className="flex py-3 items-center gap-x-4">
                        <span className="w-5 h-5 text-sm flex items-center justify-center rounded-full bg-green-500 text-white">✓</span>
                        Advantage 6
                    </li>
                </ul>
            </div>
        </div>
    </section>
  )
}

export default page
