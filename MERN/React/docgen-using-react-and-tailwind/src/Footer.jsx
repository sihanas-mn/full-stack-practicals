import React from 'react'

function Footer() {
  return (
    <footer
      className="py-20 flex items-center flex-col gap-y-6 mx-4 md:mx-8 lg:mx-auto"
    >
      <div
        className="max-w-5xl grid grid-cols gap-x-4 gap-y-6 md:grid-cols-2 lg:grid-cols-4"
      >
        <div className="space-y-4">
          <div className="flex gap-x-3 items-center">
            <img
              src="https://themewagon.github.io/docgenAI/docgen-ai-logo.svg"
              alt=""
              className="max-h-8"
            />
            <p className="font-bold text-lg">DocGenAI</p>
          </div>
          <p className="text-sm text-gray-700">
            AI Legal Document Generator for US businesses
          </p>
        </div>

        <div className="flex flex-col space-y-2 md:space-y-5">
          <p className="font-bold">Product</p>
          <div className="space-y-2 flex flex-col">
            <a
              href="#"
              className="text-sm text-gray-700 hover:text-black ease-in-out duration-300"
              >Product</a
            >
            <a
              href="#"
              className="text-sm text-gray-700 hover:text-black ease-in-out duration-300"
              >How It Works</a
            >
            <a
              href="#"
              className="text-sm text-gray-700 hover:text-black ease-in-out duration-300"
              >Documents
            </a>
            <a
              href="#"
              className="text-sm text-gray-700 hover:text-black ease-in-out duration-300"
              >Pricing</a
            >
          </div>
        </div>

        <div className="flex flex-col space-y-2 md:space-y-5">
          <p className="font-bold">Company</p>
          <div className="space-y-2 flex flex-col">
            <a
              href="#"
              className="text-sm text-gray-700 hover:text-black ease-in-out duration-300"
              >About</a
            >
            <a
              href="#"
              className="text-sm text-gray-700 hover:text-black ease-in-out duration-300"
              >Blog</a
            >
            <a
              href="#"
              className="text-sm text-gray-700 hover:text-black ease-in-out duration-300"
              >Contact</a
            >
            <a
              href="#"
              className="text-sm text-gray-700 hover:text-black ease-in-out duration-300"
              >Careers</a
            >
          </div>
        </div>

        <div className="flex flex-col space-y-2 md:space-y-5">
          <p className="font-bold">Legal</p>
          <div className="space-y-2 flex flex-col">
            <a
              href="#"
              className="text-sm text-gray-700 hover:text-black ease-in-out duration-300"
              >Privacy Policy</a
            >
            <a
              href="#"
              className="text-sm text-gray-700 hover:text-black ease-in-out duration-300"
              >Terms of Service</a
            >
            <a
              href="#"
              className="text-sm text-gray-700 hover:text-black ease-in-out duration-300"
              >Disclaimer</a
            >
            <a
              href="#"
              className="text-sm text-gray-700 hover:text-black ease-in-out duration-300"
              >Contact Us</a
            >
          </div>
        </div>
      </div>

      <div className="max-w-5xl w-full">
        <div className="max-w-5xl mx-auto border-t border-gray-500 my-8"></div>
      </div>

      <div className="max-w-5xl">
        <p className="text-sm text-gray-600">
          © 2025 DocGenAI. All rights reserved. This tool does not replace a
          licensed attorney.
        </p>
      </div>

      <button
        className="fixed right-5 bottom-5 bg-orange-600 text-white py-3 px-7 rounded-xl font-bold hover:bg-orange-700 ease-in-out duration-300"
      >
        Download Now
      </button>
    </footer>
  )
}

export default Footer