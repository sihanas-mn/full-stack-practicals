import React from 'react'

function Brief() {
  return (
    <section
        className="grid max-w-7xl mx-4 gap-x-16 gap-y-16 py-32 md:grid-cols-2 md:mx-8 lg:mx-auto"
      >
        <div className="space-y-10 flex flex-col justify-center">
          <h1 className="text-6xl font-bold text-center">The Problem</h1>

          <div className="flex space-x-6">
            <p className="text-4xl">💰</p>
            <div>
              <p className="text-lg font-bold">Hiring lawyers is expensive</p>
              <p className="text-gray-400">
                Legal services can cost thousands for simple documents
              </p>
            </div>
          </div>

          <div className="flex space-x-6">
            <p className="text-4xl">⏱️</p>
            <div>
              <p className="text-lg font-bold">Legal documents take time</p>
              <p className="text-gray-400">
                Traditional drafting takes weeks or months
              </p>
            </div>
          </div>

          <div className="flex space-x-6">
            <p className="text-4xl">📖</p>
            <div>
              <p className="text-lg font-bold">Confusing legal language</p>
              <p className="text-gray-400">
                Complex jargon makes documents hard to understand
              </p>
            </div>
          </div>
        </div>

        <div
          className="border border-orange-600/40 rounded-2xl bg-orange-600/10 felx flex-col px-10 py-12 space-y-6"
        >
          <h1 className="text-5xl font-bold">Our Solution</h1>
          <p className="text-lg text-gray-400">
            Our AI creates clear, ready-to-use legal documents tailored to your
            business in minutes. No legal jargon. No confusion. Just documents
            you can understand and use immediately.
          </p>
          <div className="flex items-center gap-x-2 text-lg">
            <i className="fa-solid fa-circle-check text-orange-600 text-2xl"></i>
            <p>Save thousands on legal fees</p>
          </div>

          <div className="flex items-center gap-x-2 text-lg">
            <i className="fa-solid fa-circle-check text-orange-600 text-2xl"></i>
            <p>Get documents in minutes, not months</p>
          </div>

          <div className="flex items-center gap-x-2 text-lg">
            <i className="fa-solid fa-circle-check text-orange-600 text-2xl"></i>
            <p>Clear, plain English language</p>
          </div>
        </div>
      </section>
  )
}

export default Brief