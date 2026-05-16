import { useState } from 'react'
import { CATEGORIES, PRIORITIES, PRIORITY_LABELS, CATEGORY_COLORS } from '../interfaces/Task'

const PRIORITY_STYLES = {
  low:    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  high:   'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}

function isOverdue(deadline, done) {
  if (!deadline || done) return false
  return new Date(deadline) < new Date(new Date().toISOString().slice(0, 10))
}

export default function TaskCard({ task, onUpdate, onDelete, onDragStart, onDragOver, onDrop }) {
  const [editing,    setEditing]    = useState(false)
  const [editTitle,  setEditTitle]  = useState(task.title)
  const [editDesc,   setEditDesc]   = useState(task.description || '')
  const [editCat,    setEditCat]    = useState(task.category)
  const [editPri,    setEditPri]    = useState(task.priority)
  const [editDl,     setEditDl]     = useState(task.deadline || '')
  const [showDesc,   setShowDesc]   = useState(false)

  const overdue    = isOverdue(task.deadline, task.done)
  const catColors  = CATEGORY_COLORS[task.category] || CATEGORY_COLORS['Genel']

  const saveEdit = () => {
    if (!editTitle.trim()) return
    onUpdate(task.id, { title: editTitle.trim(), description: editDesc.trim(), category: editCat, priority: editPri, deadline: editDl })
    setEditing(false)
  }

  if (editing) return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-indigo-400 p-4 task-enter transition-colors">
      <div className="flex flex-col gap-3">
        <input type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <textarea value={editDesc} onChange={e => setEditDesc(e.target.value)} rows={2} placeholder="Açıklama..."
          className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <div className="flex flex-wrap gap-2">
          <select value={editCat} onChange={e => setEditCat(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm flex-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={editPri} onChange={e => setEditPri(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm flex-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            {PRIORITIES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
          </select>
          <input type="date" value={editDl} onChange={e => setEditDl(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm flex-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
        </div>
        <div className="flex gap-2 justify-end">
          <button onClick={() => setEditing(false)}
            className="px-4 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
            İptal
          </button>
          <button onClick={saveEdit}
            className="px-4 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Kaydet
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl border p-4 transition-all task-enter ${
        overdue ? 'border-red-300 dark:border-red-700' : 'border-gray-200 dark:border-gray-700'
      } ${task.done ? 'opacity-60' : ''} hover:border-gray-300 dark:hover:border-gray-500`}
      draggable
      onDragStart={() => onDragStart(task.id)}
      onDragOver={e => { e.preventDefault(); onDragOver(task.id) }}
      onDrop={onDrop}
    >
      <div className="flex items-start gap-3">
        <div className="cursor-grab mt-1 text-gray-300 dark:text-gray-600 hover:text-gray-500 flex-shrink-0 select-none text-lg leading-none" title="Sürükle">⠿</div>

        <button
          onClick={() => onUpdate(task.id, { done: !task.done })}
          className={`w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
            task.done ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300 hover:border-indigo-400'
          }`}
        >
          {task.done && <span className="text-white text-xs">✓</span>}
        </button>

        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium ${task.done ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-white'}`}>
            {task.title}
          </p>

          {task.description && (
            <button onClick={() => setShowDesc(s => !s)} className="text-xs text-indigo-500 hover:underline mt-0.5">
              {showDesc ? '▲ gizle' : '▼ açıklama'}
            </button>
          )}
          {showDesc && task.description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{task.description}</p>
          )}

          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${catColors.bg} ${catColors.text}`}>
              {task.category}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${PRIORITY_STYLES[task.priority]}`}>
              {PRIORITY_LABELS[task.priority]}
            </span>
            <span className="text-xs text-gray-400">📅 {task.date}</span>
            {task.deadline && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                overdue
                  ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 font-semibold'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
              }`}>
                {overdue ? '⚠️' : '🎯'} {task.deadline}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-1 flex-shrink-0">
          <button onClick={() => setEditing(true)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900 transition-colors">
            ✏️
          </button>
          <button onClick={() => onDelete(task.id)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900 transition-colors">
            🗑️
          </button>
        </div>
      </div>
    </div>
  )
}