import { useRef } from 'react'
import TaskCard from './TaskCard'

export default function TaskList({ tasks, onUpdate, onDelete, onReorder }) {
  const dragId     = useRef(null)
  const dragOverId = useRef(null)

  const handleDragStart = (id) => { dragId.current = id }
  const handleDragOver  = (id) => { dragOverId.current = id }
  const handleDrop      = () => {
    if (dragId.current && dragId.current !== dragOverId.current) {
      onReorder(dragId.current, dragOverId.current)
    }
    dragId.current = dragOverId.current = null
  }

  if (!tasks.length) return (
    <div className="text-center py-12 text-gray-400 dark:text-gray-600">
      <p className="text-4xl mb-3">📋</p>
      <p className="text-sm">Hiç görev bulunamadı.</p>
    </div>
  )

  return (
    <div className="flex flex-col gap-2">
      {tasks.map(task => (
        <TaskCard
          key={task.id} task={task}
          onUpdate={onUpdate} onDelete={onDelete}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
      ))}
    </div>
  )
}