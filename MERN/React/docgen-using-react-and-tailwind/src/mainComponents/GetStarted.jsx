import React from 'react'

function GetStarted() {
  return (
    <section className="py-32 bg-orange-700/10 border-t border-y-orange-700">
        <div
          className="max-w-2xl mx-4 md:mx-auto flex flex-col items-center gap-y-10 lg:mx-auto"
          >
          <h1 className="text-7xl font-bold text-center">
            Stop Paying for <span className="text-orange-600">Basic Lawyers.</span>
          </h1>
          <p className="text-xl text-center max-w-sm">
            Generate professional, compliant legal documents today. No credit
            card required.
          </p>
          <button
            className="py-3 px-6 text-xl font-bold bg-orange-600 text-white rounded-xl hover:bg-orange-700 ease-in-out duration-300"
          >
            Generate Your First Document
          </button>
        </div>
      </section>
  )
}

export default GetStarted