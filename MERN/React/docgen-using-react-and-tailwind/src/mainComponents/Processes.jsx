import React from 'react'

function Processes() {
  return (
    <section className="max-w-7xl mx-4 py-32 space-y-24 md:mx-8 lg:mx-auto">
        <div className="flex flex-col items-center gap-y-6">
          <h1 className="text-6xl font-bold">How It Works</h1>
          <p className="text-2xl text-gray-400">
            Simple, intuitive, and fast. Three steps to your legal documents.
          </p>
        </div>

        <div className="grid justify-center gap-y-10 gap-x-10 md:grid-cols-3">
          <div
            className="border border-gray-700 p-10 space-y-4 rounded-2xl hover:border-orange-700 ease-in-out duration-300 hover:bg-gray-900"
          >
            <h1 className="text-6xl font-bold text-orange-600/30">01</h1>
            <p className="text-xl font-bold">Choose a Document Type</p>
            <p className="text">
              Select from NDA, Contract, Privacy Policy, and more
            </p>
          </div>

          <div
            className="border border-gray-700 p-10 space-y-4 rounded-2xl hover:border-orange-700 ease-in-out duration-300 hover:bg-gray-900"
          >
            <h1 className="text-6xl font-bold text-orange-600/30">02</h1>
            <p className="text-xl font-bold">Answer Simple Questions</p>
            <p>Our AI asks just what it needs to know about your business</p>
          </div>

          <div
            className="border border-gray-700 p-10 space-y-4 rounded-2xl hover:border-orange-700 ease-in-out duration-300 hover:bg-gray-900"
          >
            <h1 className="text-6xl font-bold text-orange-600/30">03</h1>
            <p className="text-xl font-bold">Download or Edit Instantly</p>
            <p>Get your document ready to use or customize further</p>
          </div>
        </div>
      </section>
  )
}

export default Processes