import React from 'react'

function Template() {
  return (
    <section className="max-w-7xl mx-4 py-32 space-y-18 md:mx-8 lg:mx-auto">
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-bold">Document Templates</h1>
          <p className="text-xl text-gray-400">
            Professional, attorney-reviewed templates for every business need
          </p>
        </div>

        <div className="grid max-w-7xl mx-5 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div
            className="border border-gray-500 rounded-2xl py-9 px-20 text-center bg-mist-900 space-y-4 hover:border-orange-700 ease-in-out duration-300 hover:bg-gray-900 hover:scale-105 transition-all hover:duration-100"
          >
            <p className="text-5xl">🤝</p>
            <p className="font-bold text-sm">NDA (Mutual)</p>
          </div>
          <div
            className="border border-gray-500 rounded-2xl py-9 px-20 text-center bg-mist-900 space-y-4 hover:border-orange-700 ease-in-out duration-300 hover:bg-gray-900 hover:scale-105 transition-all hover:duration-100"
          >
            <p className="text-5xl">🔐</p>
            <p className="font-bold text-sm">NDA (Non-Mutual)</p>
          </div>
          <div
            className="border border-gray-500 rounded-2xl py-9 px-20 text-center bg-mist-900 space-y-4 hover:border-orange-700 ease-in-out duration-300 hover:bg-gray-900 hover:scale-105 transition-all hover:duration-100"
          >
            <p className="text-5xl">📋</p>
            <p className="font-bold text-sm">Privacy Policy</p>
          </div>
          <div
            className="border border-gray-500 rounded-2xl py-9 px-20 text-center bg-mist-900 space-y-4 hover:border-orange-700 ease-in-out duration-300 hover:bg-gray-900 hover:scale-105 transition-all hover:duration-100"
          >
            <p className="text-5xl">⚖️</p>
            <p className="font-bold text-sm">Terms of Service</p>
          </div>
          <div
            className="border border-gray-500 rounded-2xl py-9 px-20 text-center bg-mist-900 space-y-4 hover:border-orange-700 ease-in-out duration-300 hover:bg-gray-900 hover:scale-105 transition-all hover:duration-100"
          >
            <p className="text-5xl">💼</p>
            <p className="font-bold text-sm">Freelance Contract</p>
          </div>
          <div
            className="border border-gray-500 rounded-2xl py-9 px-20 text-center bg-mist-900 space-y-4 hover:border-orange-700 ease-in-out duration-300 hover:bg-gray-900 hover:scale-105 transition-all hover:duration-100"
          >
            <p className="text-5xl">👥</p>
            <p className="font-bold text-sm">Employment Agreement</p>
          </div>
          <div
            className="border border-gray-500 rounded-2xl py-9 px-20 text-center bg-mist-900 space-y-4 hover:border-orange-700 ease-in-out duration-300 hover:bg-gray-900 hover:scale-105 transition-all hover:duration-100"
          >
            <p className="text-5xl">📞</p>
            <p className="font-bold text-sm">Consulting Agreement</p>
          </div>
          <div
            className="border border-gray-500 rounded-2xl py-9 px-20 text-center bg-mist-900 space-y-4 hover:border-orange-700 ease-in-out duration-300 hover:bg-gray-900 hover:scale-105 transition-all hover:duration-100"
          >
            <p className="text-5xl">📄</p>
            <p className="font-bold text-sm">Service Agreement</p>
          </div>
        </div>
      </section>
  )
}

export default Template