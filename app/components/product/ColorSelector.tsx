'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '../../../lib/utils';

interface Color {
  colorName: string;
  productImage: string;
}

interface ColorSelectorProps {
  colors: Color[];
  onColorChange: (colorImage: string) => void;
}

export default function ColorSelector({ colors, onColorChange }: ColorSelectorProps) {
  const [selectedColor, setSelectedColor] = useState(colors[0].colorName);

  const handleColorChange = (color: Color) => {
    setSelectedColor(color.colorName);
    onColorChange(color.productImage);
  };

  return (
    <div className="flex gap-2">
      {colors.map((color) => (
        <button
          key={color.colorName}
          className={cn(
            "relative w-12 h-12 border-2 rounded-full overflow-hidden",
            selectedColor === color.colorName ? "border-blue-500" : "border-gray-200"
          )}
          onClick={() => handleColorChange(color)}
          title={color.colorName}
        >
          <Image
            src={color.productImage}
            alt={color.colorName}
            fill
            className="object-cover"
          />
        </button>
      ))}
    </div>
  );
}