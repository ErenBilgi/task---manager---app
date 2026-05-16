/**
 * @typedef {Object} Task
 * @property {string}  id          - Benzersiz ID
 * @property {string}  title       - Görev başlığı
 * @property {string}  description - Açıklama
 * @property {string}  category    - Kategori
 * @property {string}  priority    - Öncelik (low | medium | high)
 * @property {boolean} done        - Tamamlandı mı?
 * @property {string}  date        - Oluşturulma tarihi
 * @property {string}  deadline    - Son tarih
 */

export const PRIORITY_LABELS = {
  low: 'Düşük', medium: 'Orta', high: 'Yüksek',
}

export const CATEGORIES = ['Genel', 'İş', 'Kişisel', 'Eğitim', 'Alışveriş']

export const PRIORITIES = [
  { value: 'low',    label: 'Düşük'  },
  { value: 'medium', label: 'Orta'   },
  { value: 'high',   label: 'Yüksek' },
]

export const CATEGORY_COLORS = {
  'Genel':     { bg: 'bg-gray-100 dark:bg-gray-700',     text: 'text-gray-700 dark:text-gray-200'    },
  'İş':        { bg: 'bg-blue-100 dark:bg-blue-900',     text: 'text-blue-700 dark:text-blue-200'    },
  'Kişisel':   { bg: 'bg-purple-100 dark:bg-purple-900', text: 'text-purple-700 dark:text-purple-200' },
  'Eğitim':    { bg: 'bg-green-100 dark:bg-green-900',   text: 'text-green-700 dark:text-green-200'  },
  'Alışveriş': { bg: 'bg-orange-100 dark:bg-orange-900', text: 'text-orange-700 dark:text-orange-200' },
}