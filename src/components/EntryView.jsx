import React, { useState } from 'react'
import Comments from './Comments'

export default function EntryView({ entry }) {
  const [galleryIndex, setGalleryIndex] = useState(0)

  if (!entry) return <div>Select an entry</div>

  return (
    <article className="bg-white shadow rounded p-6">
      <h2 className="text-xl font-semibold text-eucalyptus">{entry.title}</h2>
      <div className="text-xs text-gray-500 mb-3">{entry.date}</div>

      <div className="grid grid-cols-1 gap-6">
        <div className="md:col-span-2">
          {/* MAIN IMAGE – fixed height, NO CROPPING */}
          <div className="w-full h-60 bg-white rounded flex items-center justify-center overflow-hidden">
            <img
              src={`/australian-cultural-diary/images/${entry.images[galleryIndex]}`}
              alt=""
              className="max-h-full max-w-full object-contain"
              onError={(e) => (e.currentTarget.style.opacity = 0.5)}
            />
          </div>

          {/* THUMBNAILS – keep cropping for uniformity */}
          <div className="mt-2 flex gap-2">
            {entry.images.map((img, idx) => (
              <button
                key={img}
                onClick={() => setGalleryIndex(idx)}
                className={`w-16 h-12 rounded overflow-hidden border ${
                  galleryIndex === idx
                    ? 'border-eucalyptus'
                    : 'border-gray-200'
                }`}
              >
                <img
                  src={`/australian-cultural-diary/images/${img}`}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-1">
          <h3 className="font-medium">Description</h3>
          <p className="text-sm text-gray-700 mb-4">{entry.description}</p>

          <h3 className="font-medium">
            Reflection <span className="text-xs text-gray-500"></span>
          </h3>
          <div className="prose text-sm text-gray-800">
            {entry.reflection
              .split('\n\n')
              .map((p, i) => (
                <p key={i}>{p}</p>
              ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Comments entryId={entry.id} />
      </div>
    </article>
  )
}
