'use client';
import { PaymentMethod, ProductPaymentMethods } from '@/types';
import { CreditCard, Banknote } from 'lucide-react';

interface PaymentMethodsProps {
  paymentMethods: ProductPaymentMethods;
}

const PaymentIcon = ({ method }: { method: string }) => {
  switch (method) {
    case 'visa':
      return <span className="font-bold text-blue-700">VISA</span>;
    case 'mastercard':
      return <span className="font-bold text-red-700">Mastercard</span>;
    case 'amex':
      return <span className="font-bold text-blue-900">AMEX</span>;
    case 'oca':
      return <span className="font-bold text-yellow-600">OCA</span>;
    case 'rapipago':
      return <span className="font-bold text-green-700">Rapipago</span>;
    case 'pagofacil':
      return <span className="font-bold text-yellow-600">PagoFácil</span>;
    case 'mercadopago':
      return <span className="font-bold text-blue-500">MercadoPago</span>;
    case 'uala':
      return <span className="font-bold text-purple-700">Ualá</span>;
    default:
      return <span>{method}</span>;
  }
};

export default function PaymentMethods({ paymentMethods }: PaymentMethodsProps) {
  const creditCards = paymentMethods.methods.filter(
    (method) => method.type === 'creditCard'
  );
  
  const debitCards = paymentMethods.methods.filter(
    (method) => method.type === 'debitCard'
  );
  
  const cashMethods = paymentMethods.methods.filter(
    (method) => method.type === 'cash' || method.type === 'wallet'
  );

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-medium mb-4">Medios de pago</h3>
      
      {creditCards.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2 flex items-center">
            <CreditCard className="w-4 h-4 mr-2" />
            Tarjetas de crédito
          </h4>
          <ul className="space-y-1 text-sm">
            {creditCards.map((card, index) => (
              <li key={index} className="flex items-center">
                <PaymentIcon method={card.method} />
                {card.installments && (
                  <span className="ml-2 text-gray-600">
                    {card.installments} cuotas
                    {card.installmentsInterest === false && " sin interés"}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {debitCards.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2 flex items-center">
            <CreditCard className="w-4 h-4 mr-2" />
            Tarjetas de débito
          </h4>
          <ul className="space-y-1 text-sm">
            {debitCards.map((card, index) => (
              <li key={index} className="flex items-center">
                <PaymentIcon method={card.method} />
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {cashMethods.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-2 flex items-center">
            <Banknote className="w-4 h-4 mr-2" />
            Efectivo
          </h4>
          <ul className="space-y-1 text-sm">
            {cashMethods.map((method, index) => (
              <li key={index} className="flex items-center">
                <PaymentIcon method={method.method} />
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <a
        href="#"
        className="block w-full text-center text-blue-500 mt-4 text-sm"
      >
        Ver más opciones
      </a>
    </div>
  );
}