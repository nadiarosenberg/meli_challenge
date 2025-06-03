'use client';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { Store } from '../../../entities/store/store.types';

interface StoreInfoProps {
  store: Store;
}

export default function StoreInfo({ store }: StoreInfoProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Banner */}
      <div className="relative h-24 bg-gray-200">
        <Image
          src={store.bannerImage}
          alt="Banner de tienda"
          fill
          className="object-cover"
        />
      </div>

      {/* Profile */}
      <div className="relative px-4 pb-4 bg-white">
        <div className="absolute -top-6 left-4 w-16 h-16 rounded-md overflow-hidden border-2 border-white shadow-md bg-white">
          <Image
            src={store.profileImage}
            alt={store.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="pl-20 pt-2">
          <h3 className="text-base font-medium">{store.name}</h3>

          {store.isOfficialStore && (
            <div className="mt-1 flex items-center text-sm text-gray-600">
              <div className="bg-blue-600 text-white rounded-full p-1 mr-2">
                <Check className="w-3 h-3" />
              </div>
              Tienda oficial de Mercado Libre
            </div>
          )}

          <div className="text-sm mt-2 text-gray-800">
            <strong>+{store.sellsAmount}</strong> vendidos
          </div>
        </div>
      </div>

      {/* Sells info */}
        <div className="bg-gray-50 border-t text-sm text-gray-700 flex divide-x divide-gray-300 mt-2">
          <div className="flex-1 px-4 py-2">
            <span className="block text-gray-500">Productos</span>
            <span className="font-medium">{store.productAmount}</span>
          </div>
          <div className="flex-1 px-4 py-2">
            <span className="block text-gray-500">Ventas</span>
            <span className="font-medium">+{store.sellsAmount}</span>
          </div>
          <div className="flex-1 px-4 py-2">
            <span className="block text-gray-500">Entrega a tiempo</span>
          </div>
        </div>
        <div className="px-4 pt-2 pb-4 bg-white border-t text-sm text-gray-700 flex justify-between">
        <a
          href={store.storeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="self-end w-full text-center bg-blue-100 text-blue-700 py-2 rounded-md mt-2"
        >
          Ir a la tienda oficial
        </a>
      </div>
    </div>
  );
}
