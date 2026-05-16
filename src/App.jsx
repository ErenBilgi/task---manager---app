import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'

const STORAGE_KEY = 'tm_tasks'
const DARK_KEY    = 'tm_dark'

const SAMPLE_TASKS = [
  { id: '1', title: 'React hooks konusunu çalış',    description: 'useState, useEffect ve useContext konularını detaylı incele.',         category: 'Eğitim',  priority: 'high',   done: false, date: '2026-04-28', deadline: '2026-05-20' },
  { id: '2', title: 'Tailwind CSS dokümanını oku',   description: 'Utility-first yaklaşımı ve responsive tasarım bölümlerini çalış.',    category: 'Eğitim',  priority: 'medium', done: true,  date: '2026-04-25', deadline: '2026-05-05' },
  { id: '3', title: 'GitHub profilini güncelle',     description: 'README dosyası ekle ve pinned projelerini düzenle.',                  category: 'Kişisel', priority: 'low',    done: false, date: '2026-04-30', deadline: '2026-05-25' },
  { id: '4', title: 'Netlify deploy ayarları yap',   description: 'netlify.toml dosyasını oluştur ve environment değişkenlerini ayarla.',category: 'İş',      priority: 'high',   done: false, date: '2026-05-01', deadline: '2026-05-18' },
  { id: '5', title: 'Proje sunumu hazırla',          description: 'Slaytları hazırla ve ekran görüntülerini ekle.',                     category: 'İş',      priority: 'high',   done: false, date: '2026-05-05', deadline: '2026-05-22' },
]

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : SAMPLE_TASKS
  })

  const [dark, setDark] = useState(() => localStorage.getItem(DARK_KEY) === 'true')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    const activeCount = tasks.filter(t => !t.done).length
    document.title = activeCount > 0 ? `(${activeCount}) Task Manager` : 'Task Manager'
  }, [tasks])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem(DARK_KEY, dark)
  }, [dark])

  const addTask = (taskData) => {
    setTasks(prev => [{
      ...taskData,
      id: crypto.randomUUID(),
      done: false,
      date: new Date().toISOString().slice(0, 10),
    }, ...prev])
  }

  const updateTask = (id, changes) =>
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...changes } : t))

  const deleteTask = (id) =>
    setTasks(prev => prev.filter(t => t.id !== id))

  const reorderTasks = (fromId, toId) => {
    setTasks(prev => {
      const arr = [...prev]
      const fromIdx = arr.findIndex(t => t.id === fromId)
      const toIdx   = arr.findIndex(t => t.id === toId)
      if (fromIdx === -1 || toIdx === -1) return prev
      const [moved] = arr.splice(fromIdx, 1)
      arr.splice(toIdx, 0, moved)
      return arr
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar dark={dark} onToggleDark={() => setDark(d => !d)} tasks={tasks} />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={
            <HomePage
              tasks={tasks}
              onAdd={addTask}
              onUpdate={updateTask}
              onDelete={deleteTask}
              onReorder={reorderTasks}
            />
          } />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
    </div>
  )
}