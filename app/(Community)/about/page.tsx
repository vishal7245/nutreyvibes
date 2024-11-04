import Link from "next/link"
import Image from "next/image"

const page = () => {
  return (
    <section className="py-12">
        <div className="max-w-7xl px-5 sm:px-10 md:px-12 lg:px-10 flex flex-col md:flex-row gap-16 py-10 rounded-2xl bg-lime-200 mx-4  xl:mx-auto">
            <div className="flex md:flex-1">
                <Image src="/about1.jpg" alt="working on housing" width={1300} height={900} className="w-full md:h-full object-cover rounded-lg" />
            </div>
            <div className="md:w-1/2 space-y-12 text-gray-700 mt-1 xl:mt-16">
                <div className="flex">
                  <h1 className="text-gray-900 font-semibold text-4xl sm:text-3xl md:text-6xl">
                      Preeti Madaan
                  </h1>
                  <Image
                    src="/bowl-1.png"
                    alt="Bowl"
                    width={50}
                    height={50}
                    className="w-10 ml-2 lg:w-[50px]"
                  />
                </div>
                <p className="text-justify">
                  With over 5 years of experience in the field of nutrition, Preeti Madaan is dedicated to guiding her clients toward healthier and more balanced lifestyles. Her journey into formal qualifications started two years ago, and she has since earned a diploma in Health and Nutrition, further enriched by specialized courses in Ayurveda and Clinical Nutrition.
                </p>
                <p className="text-justify">
                Preeti’s expertise shines particularly in her work with clients managing hormonal health, including PCOD. Her holistic approach combines traditional Ayurvedic principles with modern nutritional science, offering a comprehensive path to wellness. Preeti’s personalized plans are designed to address individual health needs, ensuring sustainable and impactful results for each client.
                </p>
                <ul className="space-y-4">
                    <li className="flex items-center gap-x-4">
                        <span className="w-5 h-5 text-sm flex items-center justify-center rounded-full bg-emerald-700 text-white">✓</span>
                        Hormonal Health & PCOD Management
                    </li>
                    <li className="flex items-center gap-x-4">
                        <span className="w-5 h-5 text-sm flex items-center justify-center rounded-full bg-emerald-700 text-white">✓</span>
                        Ayurveda-Integrated Nutrition
                    </li>
                    <li className="flex items-center gap-x-4">
                        <span className="w-5 h-5 text-sm flex items-center justify-center rounded-full bg-emerald-700 text-white">✓</span>
                        Clinical Nutrition for Holistic Wellness
                    </li>
                </ul>
                <div className="flex">
                    <Link href="#" className="px-5 h-11 flex items-center bg-green-500 hover:bg-lime-300 hover:text-green-700 rounded-lg text-white">
                        Get In touch
                    </Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default page
