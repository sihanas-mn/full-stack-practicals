import React from 'react'

function FAQ() {
  return (
    <section className="py-32 mx-4 max-w-2xl md:mx-auto space-y-12 lg:mx-auto">
        <div className="flex items-center flex-col gap-y-4">
          <p className="text-4xl font-bold text-center">
            Frequently Asked Questions
          </p>
          <p className="text-xl text-gray-400">Everything you need to know</p>
        </div>

        <div className="space-y-4">
          <details
            className="p-6 border rounded-2xl border-gray-800 hover:border-orange-700 ease-in-out duration-300"
          >
            <summary className="flex justify-between items-center font-bold">
              Is this legally binding?<i
                className="fa-solid fa-angle-down text-orange-600 group-open:rotate-180"
              ></i>
            </summary>
            <p className="text-gray-400 mt-4">
              Yes, documents generated are legally binding when properly executed. However, for complex situations, we recommend having a lawyer review your document.
            </p>
          </details>
          <details
            className="p-6 border rounded-2xl border-gray-800 hover:border-orange-700 ease-in-out duration-300"
          >
            <summary className="flex justify-between items-center font-bold transition-transform duration-300 group-open:rotate-180">
              Can I customize documents?<i
                className="fa-solid fa-angle-down text-orange-600"
              ></i>
            </summary>
            <p className="text-gray-400 mt-4">
              All documents are fully editable. You can customize them to match your specific business needs before download.
            </p>
          </details>
          <details
          className="p-6 border rounded-2xl border-gray-800 hover:border-orange-700 ease-in-out duration-300"
          >
          <summary className="flex justify-between items-center font-bold">
            Is this US-specific?<i
            className="fa-solid fa-angle-down text-orange-600"
            ></i>
          </summary>
          <p className="text-gray-400 mt-4">
            Yes, all our templates are created to comply with US federal and state laws. International support is coming soon.
          </p>
        </details>
        <details
        className="p-6 border rounded-2xl border-gray-800 hover:border-orange-700 ease-in-out duration-300"
        >
        <summary className="flex justify-between items-center font-bold">
          Can I cancel anytime?<i
          className="fa-solid fa-angle-down text-orange-600"
          ></i>
        </summary>
        <p className="text-gray-400 mt-4">
              Yes, you can cancel your subscription at any time with no penalties or hidden fees. Your documents remain accessible forever.
            </p>
          </details>
          <details
            className="p-6 border rounded-2xl border-gray-800 hover:border-orange-700 ease-in-out duration-300"
          >
            <summary className="flex justify-between items-center font-bold">
              How long does generation take?<i
                className="fa-solid fa-angle-down text-orange-600"
              ></i>
            </summary>
            <p className="text-gray-400 mt-4">
              Most documents are generated in under 5 minutes. Once generated, you can download or edit immediately.
            </p>
          </details>

          <details
            className="p-6 border rounded-2xl border-gray-800 hover:border-orange-700 ease-in-out duration-300 group cursor-pointer"
          >
            <summary className="flex justify-between items-center font-bold">
              Are my documents private?<i
                className="fa-solid fa-angle-down text-orange-600"
              ></i>
            </summary>
            <p className="text-gray-400 mt-4">
              Complete privacy is guaranteed. We never store your documents after generation, and they're not shared with anyone.
            </p>
          </details>

        </div>
      </section>
  )
}

export default FAQ