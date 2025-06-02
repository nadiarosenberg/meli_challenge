'use client';
import { Product } from "../../entities/product/types";

interface TechnicalSpecsProps {
  product: Product;
}

'use client';
import {
  Smartphone,
  HardDrive,
  Camera,
  CameraOff,
  Nfc,
  Lock,
} from 'lucide-react';

export default function ProductTechnicalSpecs({ product }: TechnicalSpecsProps) {
  const { technicalDescription } = product;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-medium mb-4">Características técnicas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {technicalDescription.screenSize && (
          <div className="flex items-start gap-2">
            <Smartphone className="w-5 h-5 mt-1 text-gray-600" />
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Tamaño de pantalla</span>
              <span>{technicalDescription.screenSize}"</span>
            </div>
          </div>
        )}
        {technicalDescription.internalMemory && (
          <div className="flex items-start gap-2">
            <HardDrive className="w-5 h-5 mt-1 text-gray-600" />
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Memoria interna</span>
              <span>{technicalDescription.internalMemory}</span>
            </div>
          </div>
        )}
        {technicalDescription.backCamera && (
          <div className="flex items-start gap-2">
            <Camera className="w-5 h-5 mt-1 text-gray-600" />
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Cámara trasera principal</span>
              <span>{technicalDescription.backCamera}</span>
            </div>
          </div>
        )}
        {technicalDescription.frontCamera && (
          <div className="flex items-start gap-2">
            <CameraOff className="w-5 h-5 mt-1 text-gray-600" />
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Cámara frontal</span>
              <span>{technicalDescription.frontCamera}</span>
            </div>
          </div>
        )}
        {technicalDescription.hasNfc !== undefined && (
          <div className="flex items-start gap-2">
            <Nfc className="w-5 h-5 mt-1 text-gray-600" />
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">NFC</span>
              <span>{technicalDescription.hasNfc ? 'Con NFC' : 'Sin NFC'}</span>
            </div>
          </div>
        )}
        {technicalDescription.unlockingMethod && (
          <div className="flex items-start gap-2">
            <Lock className="w-5 h-5 mt-1 text-gray-600" />
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Método de desbloqueo</span>
              <span>{technicalDescription.unlockingMethod}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
