export default function AboutPage() {
  return (
    <div className="max-w-2xl">
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
        <h2 className="text-lg font-semibold mb-3">ℹ️ Proje Hakkında</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Bu proje, modern web geliştirme eğitiminin bir parçası olarak
          ReactJS, Tailwind CSS ve React Router kullanılarak geliştirilmiş
          bir Görev Yönetim Uygulaması'dır.
        </p>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">🛠️ Kullanılan Teknolojiler</h2>
        <div className="grid grid-cols-3 gap-3">
          {['React 18', 'Tailwind CSS', 'React Router', 'Vite', 'GitHub', 'Netlify'].map(t => (
            <div key={t} className="bg-gray-50 rounded-lg p-3 text-center text-sm text-gray-700 font-medium">
              {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}