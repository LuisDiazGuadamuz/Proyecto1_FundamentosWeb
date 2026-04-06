import { useState } from 'react'

function PropertyGallery({ images, title }) {
  const [activeImage, setActiveImage] = useState(images[0])

  return (
    <section className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-samara-stone/70">
        <img src={activeImage} alt={`Imagen principal de ${title}`} className="h-80 w-full object-cover sm:h-[420px]" />
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {images.map((image) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveImage(image)}
            className={`overflow-hidden rounded-xl border transition ${
              activeImage === image ? 'border-samara-gold' : 'border-samara-stone/70'
            }`}
          >
            <img src={image} alt={`Miniatura de ${title}`} className="h-20 w-full object-cover" />
          </button>
        ))}
      </div>
    </section>
  )
}

export default PropertyGallery
