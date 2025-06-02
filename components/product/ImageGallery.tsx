'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: string[];
  mainImage: string;
}

export default function ImageGallery({ images, mainImage }: ImageGalleryProps) {
  const [currentImage, setCurrentImage] = useState(mainImage);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex flex-row md:flex-col gap-2 overflow-auto md:max-h-[500px]">
        {images.map((image, index) => (
          <button
            key={index}
            className={cn(
              "relative min-w-[60px] min-h-[60px] w-[60px] h-[60px] border rounded",
              activeIndex === index ? "border-blue-500" : "border-gray-200"
            )}
            onClick={() => {
              setCurrentImage(image);
              setActiveIndex(index);
            }}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-contain p-1"
            />
          </button>
        ))}
      </div>
      <div className="relative h-[400px] md:h-[500px] w-full md:max-w-[400px] border rounded">
        <Image
          src={currentImage}
          alt="Product image"
          fill
          className="object-contain p-2"
        />
      </div>
    </div>
  );
}