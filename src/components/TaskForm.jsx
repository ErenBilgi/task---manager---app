import { useState } from 'react'
import { CATEGORIES, PRIORITIES } from '../interfaces/Task'

export default function TaskForm({ onAdd }) {
  const [title,       setTitle]       = useState('')
  const [description, setDescription] = useState('')
  const [category,    setCategory]    = useState('Genel')
  const [priority,    setPriority]    = useState('medium')
  const [deadline,    setDeadline]    = useState('')
  const [open,        setOpen]        = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    onAdd({ title: title.trim(), description: description.trim(), category, priority, deadline })
    setTitle('')
    setDescription('')
    setDeadline('')
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 mb-5 transition-colors">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between text-base font-semibold text-gray-900 dark:text-white"
      >
        <span>➕ Yeni Görev Ekle</span>
        <span className="text-gray-400 text-sm">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
          <input
            type="text" value={title} onChange={e => setTitle(e.target.value)}
            placeholder="Görev başlığını yazın..."
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <textarea
            value={description} onChange={e => setDescription(e.target.value)}
            placeholder="Açıklama ekleyin (isteğe bağlı)..." rows={2}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
          />
          <div className="flex flex-wrap gap-3">
            <select value={category} onChange={e => setCategory(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm flex-1 min-w-28 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={priority} onChange={e => setPriority(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm flex-1 min-w-28 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              {PRIORITIES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
            <div className="flex flex-col gap-1 flex-1 min-w-36">
              <label className="text-xs text-gray-500 dark:text-gray-400">Son tarih</label>
              <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
            <button type="submit"
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors self-end">
              Ekle
            </button>
          </div>
        </form>
      )}
    </div>
  )
}