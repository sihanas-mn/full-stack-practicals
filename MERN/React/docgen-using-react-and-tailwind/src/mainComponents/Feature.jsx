import React from 'react'

function Feature() {
  return (
    <section className="bg-mist-900 py-32 flex justify-center">
        <div className="max-w-7xl mx-4 space-y-10 md:mx-8 lg:mx-auto">
          <h1 className="text-6xl font-bold text-center">Key Features</h1>

          <div className="grid md:grid-cols-3 gap-8">
            <div
              className="p-12 bg-black rounded-2xl border border-gray-800 space-y-4 hover:border-orange-700 ease-in-out duration-300 hover:bg-gray-900 hover:scale-105 transition-all hover:duration-100"
            >
              <p className="text-4xl">⚡</p>
              <p className="text-xl font-bold">Attorney-reviewed templates</p>
              <p className="text-gray-400">
                Created by legal experts for accuracy and compliance
              </p>
            </div>
            <div
              className="p-12 bg-black rounded-2xl border border-gray-800 space-y-4 hover:border-orange-700 ease-in-out duration-300 hover:bg-gray-900 hover:scale-105 transition-all hover:duration-100"
            >
              <p className="text-4xl">🇺🇸</p>
              <p className="text-xl font-bold">US-business friendly</p>
              <p className="text-gray-400">
                Compliant with US laws and regulations
              </p>
            </div>
            <div
              className="p-12 bg-black rounded-2xl border border-gray-800 space-y-4 hover:border-orange-700 ease-in-out duration-300 hover:bg-gray-900 hover:scale-105 transition-all hover:duration-100"
            >
              <p className="text-4xl">📖</p>
              <p className="text-xl font-bold">No legal jargon</p>
              <p className="text-gray-400">
                Clear, plain English everyone can understand
              </p>
            </div>
            <div
              className="p-12 bg-black rounded-2xl border border-gray-800 space-y-4 hover:border-orange-700 ease-in-out duration-300 hover:bg-gray-900 hover:scale-105 transition-all hover:duration-100"
            >
              <p className="text-4xl">✏️</p>
              <p className="text-xl font-bold">Edit & export anytime</p>
              <p className="text-gray-400">
                Customize documents to your specific needs
              </p>
            </div>
            <div
              className="p-12 bg-black rounded-2xl border border-gray-800 space-y-4 hover:border-orange-700 ease-in-out duration-300 hover:bg-gray-900 hover:scale-105 transition-all hover:duration-100"
            >
              <p className="text-4xl">🔒</p>
              <p className="text-xl font-bold">Secure & private</p>
              <p className="text-gray-400">
                Your documents are never shared or stored
              </p>
            </div>
            <div
              className="p-12 bg-black rounded-2xl border border-gray-800 space-y-4 hover:border-orange-700 ease-in-out duration-300 hover:bg-gray-900 hover:scale-105 transition-all hover:duration-100"
            >
              <p className="text-4xl">⚡</p>
              <p className="text-xl font-bold">Instant generation</p>
              <p className="text-gray-400">
                Get professional documents in under 5 minutes
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Feature