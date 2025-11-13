import React from 'react'

export default function Header(){
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl lg:text-4xl font-semibold text-eucalyptus">
          Australian Cultural Diary — Juliet Sostena
        </h1>
        <p className="text-sm text-gray-600 mt-1">BOSP Australia Stanford 2025</p>
      </div>
      <div aria-hidden className="hidden sm:block">
        <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" stroke="#EED6B6" strokeWidth="4"/>
          <path d="M30 60c10-20 40-20 50-10" stroke="#3B7A57" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </div>
    </header>
  )
}
