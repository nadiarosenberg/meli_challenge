'use client';

import { Button } from "../ui/button";
import { ShoppingCart, CreditCard, RotateCcw, Shield, Headphones } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Store } from "../../entities/store/types";
import { Product } from "../../entities/product/types";

interface PurchaseInfoProps {
  store: Store,
  product: Product
}

export default function PurchaseInfo({ store, product }: PurchaseInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const maxQuantity = product.stock.available;

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="text-sm font-bold text-green-600">Envío gratis a todo el país</div>
      <div className="text-sm text-gray-500">Conoce los tiempos y formas de envío</div>
      <a href="#" className="text-sm text-blue-500">Calcular cuándo llega</a>

      <div className="text-sm font-bold mt-4">Stock disponible</div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={quantity}
          min={1}
          max={maxQuantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-16 border rounded px-2 py-1 text-sm"
        />
        <span className="text-xs text-gray-500">({maxQuantity} disponibles)</span>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          Comprar ahora
        </Button>
        <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Agregar al carrito
        </Button>
      </div>

      <div className="flex items-center mt-4 gap-2">
        <Image src={store.profileImage} alt="store logo" width={32} height={32} className="rounded-full" />
        <div className="text-sm">
          <div className="font-semibold">Tienda oficial {store.name}</div>
          <div className="text-xs text-gray-600 font-bold">+{store.sellsAmount} ventas</div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-start gap-2">
          <RotateCcw className="w-4 h-4 text-blue-500 mt-1" />
          <div className="text-sm">
            <a href="#" className="text-blue-500">Devolución gratis</a>
            <div className="text-xs text-gray-500">Tienes 30 días desde que lo recibes</div>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Shield className="w-4 h-4 text-blue-500 mt-1" />
          <div className="text-sm">
            <a href="#" className="text-blue-500">Compra protegida</a>
            <div className="text-xs text-gray-500">
              Recibe el producto que esperabas o te devolvemos tu dinero
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Headphones className="w-4 h-4 text-blue-500 mt-1" />
          <div className="text-sm">
            1 años de garantía de fábrica
          </div>
        </div>
      </div>

      <div className="text-sm text-blue-500 mt-4 flex items-center">
        <CreditCard className="w-4 h-4 mr-2" />
        <a href="#">Conoce los medios de pago</a>
      </div>
    </div>
  );
}
