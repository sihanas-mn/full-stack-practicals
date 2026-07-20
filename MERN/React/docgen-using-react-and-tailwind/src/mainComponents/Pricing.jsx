import React from 'react'

function Pricing() {
  return (
    <section className="max-w-7xl mx-4 space-y-20 md:mx-8 py-32 lg:mx-auto">
        <div className="space-y-4 flex flex-col justify-center">
          <h1 className="text-4xl text-center font-bold md:text-6xl">
            Simple, Transparent Pricing
          </h1>
          <p className="text-gray-400 text-xl text-center">
            Choose the plan that fits your needs
          </p>
        </div>

        <div className="grid grid-cols md:grid-cols-3 gap-x-6 gap-y-6">
          <div
            className="bg-gray-900 rounded-2xl p-10 space-y-8 border border-gray-700 md:space-y-4 hover:border-orange-700 ease-in-out duration-300"
          >
            <p className="text-2xl font-bold">Starter</p>
            <p className="text-gray-400">Perfect for getting started</p>
            <h1 className="text-6xl font-bold">$0</h1>
            <button
              className="w-full py-2 bg-black font-bold rounded-2xl border border-gray-700 hover:bg-orange-700 ease-in-out duration-300"
            >
              Get Started
            </button>
            <p className="text-sm">
              <span className="text-orange-700 font-bold">✓</span> 1 document per
              month
            </p>
            <p className="text-sm">
              <span className="text-orange-700 font-bold">✓</span> Watermarked
              documents
            </p>
            <p className="text-sm">
              <span className="text-orange-700 font-bold">✓</span> Basic templates
            </p>
            <p className="text-sm">
              <span className="text-orange-700 font-bold">✓</span> Email support
            </p>
          </div>

          <div
            className="bg-gray-900 rounded-2xl p-10 space-y-8 border border-gray-700 scale-x-105 md:scale-y-110 md:space-y-4 hover:border-orange-700 ease-in-out duration-300"
          >
            <p
              className="text-orange-600 text-sm font-bold bg-orange-700/20 px-3 py-1 w-fit rounded-2xl"
            >
              RECOMMENDED
            </p>
            <p className="text-2xl font-bold">Pro</p>
            <p className="text-gray-400">For most small businesses</p>
            <h1 className="text-6xl font-bold flex items-end">
              $29<span className="text-xl font-normal">/month</span>
            </h1>

            <button
              className="w-full py-2 bg-black font-bold rounded-2xl border border-gray-700 hover:bg-orange-700 ease-in-out duration-300"
            >
              Start Free Trial
            </button>
            <p className="text-sm">
              <span className="text-orange-700 font-bold">✓</span>
              Unlimited documents
            </p>
            <p className="text-sm">
              <span className="text-orange-700 font-bold">✓</span> No watermark
            </p>
            <p className="text-sm">
              <span className="text-orange-700 font-bold">✓</span> Editable formats
            </p>
            <p className="text-sm">
              <span className="text-orange-700 font-bold">✓</span> Priority support
            </p>
            <p className="text-sm">
              <span className="text-orange-700 font-bold">✓</span> Advanced
              templates
            </p>
          </div>

          <div
            className="bg-gray-900 rounded-2xl p-10 space-y-8 border border-gray-700 md:space-y-4 hover:border-orange-700 ease-in-out duration-300"
          >
            <p className="text-2xl font-bold">Business</p>
            <p className="text-gray-400">For growing teams</p>
            <h1 className="text-6xl font-bold flex items-end">
              $79 <span className="text-xl font-normal">/month</span>
            </h1>
            <button
              className="w-full py-2 bg-black font-bold rounded-2xl border border-gray-700 hover:bg-orange-700 ease-in-out duration-300"
            >
              Contact Sales
            </button>
            <p className="text-sm">
              <span className="text-orange-700 font-bold">✓</span> Everything in Pro
            </p>
            <p className="text-sm">
              <span className="text-orange-700 font-bold">✓</span> Team access
            </p>
            <p className="text-sm">
              <span className="text-orange-700 font-bold">✓</span> Client documents
            </p>
            <p className="text-sm">
              <span className="text-orange-700 font-bold">✓</span>
              Priority support
            </p>
            <p className="text-sm">
              <span className="text-orange-700 font-bold">✓</span>
              Custom templates
            </p>
          </div>
        </div>
      </section>
  )
}

export default Pricing