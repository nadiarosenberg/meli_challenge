'use client';
import { Button } from "../../components/ui/button";
import { ShoppingCart, CreditCard } from "lucide-react";

export default function BuySection() {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex flex-col gap-3">
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          Comprar ahora
        </Button>
        <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Agregar al carrito
        </Button>
        <div className="flex items-center text-sm text-blue-500 mt-2">
          <CreditCard className="w-4 h-4 mr-2" />
          <a href="#">Conoce los medios de pago</a>
        </div>
      </div>
    </div>
  );
}