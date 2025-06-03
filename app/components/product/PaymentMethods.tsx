'use client';
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcPaypal,
  FaCcApplePay,
  FaCcStripe,
} from 'react-icons/fa';
import { SiMercadopago, SiOclif } from 'react-icons/si';
import { PiBankFill, PiWalletFill } from 'react-icons/pi';
import { CreditCard, Banknote } from 'lucide-react';
import { ProductPaymentMethods } from '../../../entities/paymentMethods/paymentMethods.types';

interface PaymentMethodsProps {
  paymentMethods: ProductPaymentMethods;
}

const PaymentIcon = ({ method }: { method: string }) => {
  switch (method.toLowerCase()) {
    case 'visa':
      return <FaCcVisa className="text-blue-600 w-6 h-6" />;
    case 'mastercard':
      return <FaCcMastercard className="text-red-600 w-6 h-6" />;
    case 'amex':
      return <FaCcAmex className="text-blue-800 w-6 h-6" />;
    case 'oca':
      return <SiOclif className="text-yellow-600 w-6 h-6" />;
    case 'mercadopago':
      return <SiMercadopago className="text-blue-500 w-6 h-6" />;
    case 'paypal':
      return <FaCcPaypal className="text-blue-700 w-6 h-6" />;
    case 'applepay':
      return <FaCcApplePay className="text-black w-6 h-6" />;
    case 'stripe':
      return <FaCcStripe className="text-purple-600 w-6 h-6" />;
    case 'pagofacil':
    case 'rapipago':
      return <PiBankFill className="text-green-600 w-6 h-6" />;
    case 'uala':
      return <PiWalletFill className="text-purple-700 w-6 h-6" />;
    default:
      return <span className="text-sm capitalize">{method}</span>;
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
    <div className="border rounded-lg p-4 space-y-4">
      <h3 className="font-semibold text-gray-800">Medios de pago</h3>
      <div className="bg-green-100 text-green-700 text-sm font-medium p-2 rounded text-center">
        ¡Pagá hasta en 12 cuotas sin interés!
      </div>

      {/* credit cards */}
      {creditCards.length > 0 && (
        <div>
            <div className="text-sm text-gray-600 mt-1 mb-3">
            {creditCards.some((card) => card.installmentsInterest === false) &&
              '¡Cuotas sin interés en bancos seleccionados!'}
          </div>
          <div className="flex items-center mb-2 text-sm text-gray-700 font-medium">
            <CreditCard className="w-4 h-4 mr-2" />
            Tarjetas de crédito
          </div>
          <div className="flex flex-wrap items-center gap-5">
            {creditCards.map((card, index) => (
              <div key={index} className="flex items-center space-x-1">
                <PaymentIcon method={card.method} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* debit cards */}
      {debitCards.length > 0 && (
        <div>
          <div className="flex items-center mb-2 text-sm text-gray-700 font-medium">
            <CreditCard className="w-4 h-4 mr-2" />
            Tarjetas de débito
          </div>
          <div className="flex flex-wrap items-center gap-5">
            {debitCards.map((card, index) => (
              <div key={index}>
                <PaymentIcon method={card.method} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* cash */}
      {cashMethods.length > 0 && (
        <div>
          <div className="flex items-center mb-2 text-sm text-gray-700 font-medium">
            <Banknote className="w-4 h-4 mr-2" />
            Efectivo
          </div>
          <div className="flex flex-wrap items-center gap-5">
            {cashMethods.map((method, index) => (
              <div key={index}>
                <PaymentIcon method={method.method} />
              </div>
            ))}
          </div>
        </div>
      )}

      <a
        href="#"
        className="block text-sm text-blue-500 hover:underline text-left"
      >
        Conocé otros medios de pago
      </a>
    </div>
  );
}
