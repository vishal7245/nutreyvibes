import { FAQ_DATA } from "@/constants"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

const FAQ = () => {
  return (
    <div className="w-full max-w-6xl mx-auto py-16 px-6 xl:bg-[#f4ffe6] bg-transparent rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold text-center mb-12 text-green-500">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {FAQ_DATA.map((faq, index) => (
          <AccordionItem key={`faq-${index}`} value={`item-${index + 1}`} className="bg-white rounded-md shadow">
            <AccordionTrigger className="text-base font-semibold px-6 py-4 hover:bg-green-100 transition-colors duration-200">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-base px-6 py-4 leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default FAQ
