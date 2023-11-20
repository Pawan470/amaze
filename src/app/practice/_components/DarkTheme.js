'use client'

import React, { useState } from 'react'

export default function DarkTheme() {
  const [darkMode, setDarkMode] = useState(false)
  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark-mode', !darkMode)
    setDarkMode(!darkMode)
  }

  return (
    <div>
      <div>
        <h1 style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
          Hello, Dark Theme World!
        </h1>
      </div>

      <button onClick={toggleTheme}>
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
    </div>
  )
}
