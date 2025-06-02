'use client';
import { Product } from '@/types';

interface TechnicalSpecsProps {
  product: Product;
}

export default function TechnicalSpecs({ product }: TechnicalSpecsProps) {
  const { technicalDescription } = product;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-medium mb-4">Características técnicas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {technicalDescription.screenSize && (
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Tamaño de pantalla</span>
            <span>{technicalDescription.screenSize}"</span>
          </div>
        )}
        {technicalDescription.internalMemory && (
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Memoria interna</span>
            <span>{technicalDescription.internalMemory}</span>
          </div>
        )}
        {technicalDescription.backCamera && (
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Cámara trasera principal</span>
            <span>{technicalDescription.backCamera}</span>
          </div>
        )}
        {technicalDescription.frontCamera && (
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Cámara frontal</span>
            <span>{technicalDescription.frontCamera}</span>
          </div>
        )}
        {technicalDescription.hasNfc !== undefined && (
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">NFC</span>
            <span>{technicalDescription.hasNfc ? 'Con NFC' : 'Sin NFC'}</span>
          </div>
        )}
        {technicalDescription.unlockingMethod && (
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Método de desbloqueo</span>
            <span>{technicalDescription.unlockingMethod}</span>
          </div>
        )}
      </div>
    </div>
  );
}