import Link from 'next/link';
import { Search, ShoppingCart, User, Bell, MapPin } from 'lucide-react';
import { Input } from './input';

export default function Header() {
  return (
    <header className="bg-yellow-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col py-2">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-blue-600 font-semibold text-2xl">
              MercadoLibre
            </Link>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-600" />
              <div className="text-xs text-gray-600">
                <div>Enviar a</div>
                <div className="font-medium">Capital Federal</div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mt-2">
            <div className="flex-1 relative">
              <Input 
                placeholder="Buscar productos, marcas y más..."
                className="pr-10 py-2 bg-white"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <div className="flex items-center gap-4 text-gray-600">
              <User className="w-5 h-5" />
              <Bell className="w-5 h-5" />
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}