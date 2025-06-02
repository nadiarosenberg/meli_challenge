/*import { render, screen } from '@testing-library/react';
import ProductInfo from '@/components/product/ProductInfo';
import { Product } from '@/types';

const mockProduct: Product = {
  id: 'test-id',
  storeData: {
    id: 'store-id',
    name: 'Test Store'
  },
  categories: {
    mainId: 'cat1',
    mainName: 'Category 1',
    secondaryId: 'cat2',
    secondaryName: 'Category 2'
  },
  title: 'Test Product',
  soldAmount: 100,
  isNew: true,
  isBestSelling: true,
  rating: 4.8,
  ratingVotes: 200,
  priceConfig: {
    currency: 'USD',
    originalPrice: 499,
    price: 399,
    discount: 0.1,
    acceptInstallments: true,
    installmentsAmount: 10,
    installmentsPrice: 1914.04,
    installmentsInterest: false
  },
  mainImage: 'data:image/png;base64,test',
  stock: {
    original: 500,
    available: 100
  },
  mainDescription: ['Feature 1', 'Feature 2'],
  description: 'Test description',
  technicalDescription: {
    screenSize: '6.5'
  },
  freeShipment: true,
  createdAt: new Date(),
  updatedAt: new Date()
};

describe('ProductInfo Component', () => {
  test('renders product title', () => {
    render(<ProductInfo product={mockProduct} onColorChange={() => {}} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  test('displays price information correctly', () => {
    render(<ProductInfo product={mockProduct} onColorChange={() => {}} />);
    expect(screen.getByText(/USD 399/)).toBeInTheDocument();
    expect(screen.getByText(/USD 499/)).toBeInTheDocument();
    expect(screen.getByText(/20% OFF/)).toBeInTheDocument();
  });

  test('shows installment information', () => {
    render(<ProductInfo product={mockProduct} onColorChange={() => {}} />);
    expect(screen.getByText(/en 12 cuotas de USD 33 sin interés/)).toBeInTheDocument();
  });

  test('displays tags for new and best selling products', () => {
    render(<ProductInfo product={mockProduct} onColorChange={() => {}} />);
    expect(screen.getByText('Nuevo')).toBeInTheDocument();
    expect(screen.getByText('Más vendido')).toBeInTheDocument();
  });

  test('shows product main description', () => {
    render(<ProductInfo product={mockProduct} onColorChange={() => {}} />);
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();
  });

  test('displays stock information', () => {
    render(<ProductInfo product={mockProduct} onColorChange={() => {}} />);
    expect(screen.getByText(/Stock disponible - 100 unidades/)).toBeInTheDocument();
  });
});*/