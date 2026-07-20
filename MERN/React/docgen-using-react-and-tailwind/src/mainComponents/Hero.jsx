import React from 'react'
import botImg from '../assets/bot.png'

function Hero() {
  return (
    <section
        className="grid pt-20 gap-x-16 gap-y-16 max-w-7xl mx-4 py-32 md:grid-cols-2 md:mx-8 lg:mx-auto"
      >
        <div className="flex flex-col justify-center gap-y-10">
          <span
            className="bg-orange-600/20 py-1 px-3 w-fit rounded-4xl text-orange-600 font-bold border border-orange-600"
            >󠁯 ● Trusted by 10,000+ companies</span
          >
          <h1 className="text-7xl font-bold max-w-xs md:w-sm">
            Legal Docs <span className="text-orange-700">in Minutes</span>
          </h1>
          <p className="text-xl text-gray-400 md:max-w-md">
            Generate compliant NDAs, contracts, and policies with AI. Fast,
            affordable, and simple—no lawyer required.
          </p>
          <div className="flex gap-x-5">
            <button
              className="bg-orange-600 px-4 py-3 rounded-lg font-bold hover:bg-orange-700 ease-in-out duration-300"
            >
              Start Free
            </button>
            <button
              className="bg-black px-4 py-3 rounded-lg font-bold border-2 border-orange-700 hover:bg-orange-600 ease-in-out duration-300"
            >
              View Samples
            </button>
          </div>
        </div>
        <div
          className="border border-orange-600/40 rounded-2xl bg-orange-600/10 felx flex-col place-items-center p-8"
        >
          <img
            src={botImg}
            alt="bot-img"
          />
          <p className="w-fit">AI-Powered Document Generation</p>
        </div>
      </section>
  )
}

export default Hero