import React from 'react'

function Header() {
  return (
    <header className="bg-black border-b-gray-700 border sticky top-0 z-50">
      <nav
        className="mx-4 max-w-7xl flex justify-between py-4 bg-black items-center md:mx-8 lg:mx-auto"
      >
        <div className="flex gap-2">
          <img
            src="https://themewagon.github.io/docgenAI/docgen-ai-logo.svg"
            alt="logo"
            className="max-h-8 w-auto"
          />
          <a
            href="#"
            className="text-xl text-white font-bold hover:text-orange-600 duration-5000 ease-in"
            >DocGenAI</a
          >
        </div>
        <nav className="hidden md:flex gap-x-6 text-gray-400 text-sm">
          <a href="#" className="hover:text-white">How It Works</a>
          <a href="#" className="hover:text-white">Documents</a>
          <a href="#" className="hover:text-white">Pricing</a>
        </nav>
        <div className="flex gap-x-3 text-white">
          <button
            className="hover:bg-orange-600 px-3 py-2 rounded-xl font-bold ease-in-out duration-300"
          >
            Sign In
          </button>
          <button
            className="bg-orange-600 px-3 py-2 rounded-xl font-bold hover:bg-orange-700 ease-in-out duration-300"
          >
            Sign Up
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header