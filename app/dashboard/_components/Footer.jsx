import React from 'react'

function Footer() {
  return (
    <footer className="text-center py-6 mt-auto text-xs text-slate-400 dark:text-slate-500 border-t border-slate-200/60 dark:border-slate-800/60">
      &copy; {new Date().getFullYear()} Prep-Genin. All rights reserved.
    </footer>
  )
}

export default Footer
