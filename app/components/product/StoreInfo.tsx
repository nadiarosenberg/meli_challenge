'use client';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { Store } from '../../entities/store/types';

interface StoreInfoProps {
  store: Store;
}

export default function StoreInfo({ store }: StoreInfoProps) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          <Image
            src={store.profileImage}
            alt={store.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium">{store.name}</h3>
          {store.isOfficialStore && (
            <div className="flex items-center text-sm text-green-600">
              <Check className="w-4 h-4 mr-1" />
              <span>Tienda oficial</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-700">Productos</span>
          <span>{store.productAmount}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-700">Ventas</span>
          <span>+{store.sellsAmount}</span>
        </div>
        <a
          href={store.storeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-blue-100 text-blue-700 py-2 rounded-md mt-4"
        >
          Ir a la tienda oficial
        </a>
      </div>
    </div>
  );
}