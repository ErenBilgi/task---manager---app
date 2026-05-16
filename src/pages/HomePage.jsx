import { useState, useMemo } from 'react'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'

const FILTERS = [
  { key: 'all',     label: 'Tümü'            },
  { key: 'active',  label: 'Aktif'           },
  { key: 'done',    label: 'Tamamlanan'      },
  { key: 'high',    label: 'Yüksek Öncelik'  },
  { key: 'overdue', label: '⚠️ Gecikmiş'    },
]

const SORT_OPTIONS = [
  { value: 'default',  label: 'Varsayılan'      },
  { value: 'priority', label: 'Öncelik'          },
  { value: 'deadline', label: 'Son Tarih'        },
  { value: 'date',     label: 'Eklenme Tarihi'   },
  { value: 'name',     label: 'İsim (A-Z)'       },
]

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 }

function isOverdue(deadline, done) {
  if (!deadline || done) return false
  return new Date(deadline) < new Date(new Date().toISOString().slice(0, 10))
}

export default function HomePage({ tasks, onAdd, onUpdate, onDelete, onReorder }) {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [sort,   setSort]   = useState('default')

  const stats = useMemo(() => ({
    total:   tasks.length,
    active:  tasks.filter(t => !t.done).length,
    done:    tasks.filter(t =>  t.done).length,
    high:    tasks.filter(t => t.priority === 'high' && !t.done).length,
    overdue: tasks.filter(t => isOverdue(t.deadline, t.done)).length,
  }), [tasks])

  const progress = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0

  const filtered = useMemo(() => {
    let list = tasks.filter(t => {
      const matchSearch = !search ||
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase())
      const matchFilter =
        filter === 'all'     ||
        (filter === 'active'  && !t.done) ||
        (filter === 'done'    &&  t.done) ||
        (filter === 'high'    && t.priority === 'high' && !t.done) ||
        (filter === 'overdue' && isOverdue(t.deadline, t.done))
      return matchSearch && matchFilter
    })

    if      (sort === 'priority') list = [...list].sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority])
    else if (sort === 'deadline') list = [...list].sort((a, b) => { if (!a.deadline) return 1; if (!b.deadline) return -1; return a.deadline.localeCompare(b.deadline) })
    else if (sort === 'date')     list = [...list].sort((a, b) => b.date.localeCompare(a.date))
    else if (sort === 'name')     list = [...list].sort((a, b) => a.title.localeCompare(b.title, 'tr'))

    return list
  }, [tasks, filter, search, sort])

  const markAllDone    = () => tasks.forEach(t => { if (!t.done) onUpdate(t.id, { done: true }) })
  const clearCompleted = () => tasks.filter(t => t.done).forEach(t => onDelete(t.id))

  return (
    <div>
      {/* İstatistik kartları */}
      <div className="grid grid-cols-5 gap-3 mb-5">
        {[
          { label: 'Toplam',         value: stats.total,   color: 'text-gray-800 dark:text-gray-100'    },
          { label: 'Aktif',          value: stats.active,  color: 'text-indigo-600 dark:text-indigo-400' },
          { label: 'Tamamlanan',     value: stats.done,    color: 'text-green-600 dark:text-green-400'   },
          { label: 'Yüksek Öncelik', value: stats.high,    color: 'text-red-600 dark:text-red-400'       },
          { label: 'Gecikmiş',       value: stats.overdue, color: 'text-orange-600 dark:text-orange-400' },
        ].map(s => (
          <div key={s.label} className="bg-gray-100 dark:bg-gray-800 rounded-xl p-3 text-center transition-colors">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{s.label}</p>
            <p className={`text-2xl font-semibold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-5 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tamamlanma Oranı</span>
          <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">%{progress}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div className="bg-indigo-600 h-3 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-xs text-gray-400 mt-2">{stats.done} / {stats.total} görev tamamlandı</p>
      </div>

      <TaskForm onAdd={onAdd} />

      {/* Filtreler + Sıralama */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <div className="flex items-center gap-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-2">
          <span className="text-gray-400 text-sm">🔍</span>
          <input type="text" placeholder="Ara..." value={search} onChange={e => setSearch(e.target.value)}
            className="py-1.5 text-sm bg-transparent text-gray-900 dark:text-white w-32 focus:outline-none" />
        </div>
        {FILTERS.map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
              filter === f.key
                ? 'bg-indigo-100 border-indigo-300 text-indigo-700 dark:bg-indigo-900 dark:border-indigo-700 dark:text-indigo-300'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300'
            }`}>
            {f.label}
          </button>
        ))}
        <select value={sort} onChange={e => setSort(e.target.value)}
          className="ml-auto border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
          {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {/* Toplu işlemler */}
      {tasks.length > 0 && (
        <div className="flex gap-2 mb-4">
          <button onClick={markAllDone}
            className="text-xs px-3 py-1.5 rounded-lg border border-green-300 text-green-700 dark:border-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900 transition-colors">
            ✅ Tümünü tamamla
          </button>
          {stats.done > 0 && (
            <button onClick={clearCompleted}
              className="text-xs px-3 py-1.5 rounded-lg border border-red-300 text-red-600 dark:border-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 transition-colors">
              🗑️ Tamamlananları temizle ({stats.done})
            </button>
          )}
        </div>
      )}

      <TaskList tasks={filtered} onUpdate={onUpdate} onDelete={onDelete} onReorder={onReorder} />
    </div>
  )
}