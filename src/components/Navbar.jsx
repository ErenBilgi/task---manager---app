import { Link, useLocation } from 'react-router-dom'

export default function Navbar({ dark, onToggleDark, tasks }) {
  const { pathname } = useLocation()
  const activeCount = tasks ? tasks.filter(t => !t.done).length : 0

  const linkClass = (path) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      pathname === path
        ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
    }`

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 h-14 flex items-center justify-between transition-colors">
      <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
        ✅ TaskManager
        {activeCount > 0 && (
          <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full">{activeCount}</span>
        )}
      </Link>
      <div className="flex items-center gap-1">
        <Link to="/"      className={linkClass('/')}>Görevler</Link>
        <Link to="/about" className={linkClass('/about')}>Hakkında</Link>
        <button
          onClick={onToggleDark}
          className="ml-2 p-2 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Karanlık mod"
        >
          {dark ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  )
}