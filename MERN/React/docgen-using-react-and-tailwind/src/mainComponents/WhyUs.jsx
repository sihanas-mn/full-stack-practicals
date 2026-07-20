import React from 'react'

function WhyUs() {
  return (
    <section className="py-32 mx-4 max-w-6xl md:mx-8 space-y-10 lg:mx-auto">
        <div className="grid grid-cols md:grid-cols-3 gap-x-6 gap-y-6">
          <div
            className="p-10 border border-gray-700 bg-stone-900 rounded-2xl space-y-4 hover:border-orange-700 ease-in-out duration-300 hover:scale-105 transition-all hover:duration-100"
          >
            <p className="text-4xl">🔒</p>
            <p className="text-xl font-bold">Security</p>
            <p className="text-gray-500">
              Enterprise-grade encryption protects your data
            </p>
          </div>

          <div
            className="p-10 border border-gray-700 bg-stone-900 rounded-2xl space-y-4 hover:border-orange-700 ease-in-out duration-300 hover:scale-105 transition-all hover:duration-100"
          >
            <p className="text-4xl">🛡️</p>
            <p className="text-xl font-bold">Privacy</p>
            <p className="text-gray-500">
              Your documents are never shared or retained
            </p>
          </div>

          <div
            className="p-10 border border-gray-700 bg-stone-900 rounded-2xl space-y-4 hover:border-orange-700 ease-in-out duration-300 hover:scale-105 transition-all hover:duration-100"
          >
            <p className="text-4xl">🇺🇸</p>
            <p className="text-xl font-bold">US-Focused</p>
            <p className="text-gray-500">
              Compliant with all US business regulations
            </p>
          </div>
        </div>

        <div
          className="p-10 border border-gray-700 bg-mist-800 rounded-2xl space-y-3 hover:border-red-400 ease-in-out duration-300 hover:bg-red-950 hover:scale-105 transition-all hover:duration-100"
        >
          <p className="text-xl font-bold">Important Disclaimer</p>
          <p className="text-gray-500">
            This tool does not replace a licensed attorney. Documents generated
            are for informational purposes. For complex legal matters or
            specific legal advice, please consult with a qualified attorney.
          </p>
        </div>
      </section>
  )
}

export default WhyUs