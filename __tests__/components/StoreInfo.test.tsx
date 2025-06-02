/*import { render, screen } from '@testing-library/react';
import StoreInfo from '@/components/product/StoreInfo';
import { Store } from '@/types';

const mockStore: Store = {
  id: 'store-id',
  name: 'Test Store',
  profileImage: 'data:image/png;base64,test',
  bannerImage: 'data:image/png;base64,test',
  isOfficialStore: true,
  productAmount: 50,
  sellsAmount: 1000,
  storeUrl: 'https://example.com/store'
};

describe('StoreInfo Component', () => {
  test('renders store name', () => {
    render(<StoreInfo store={mockStore} />);
    expect(screen.getByText('Test Store')).toBeInTheDocument();
  });

  test('displays official store badge when applicable', () => {
    render(<StoreInfo store={mockStore} />);
    expect(screen.getByText('Tienda oficial')).toBeInTheDocument();
  });

  test('shows product and sales information', () => {
    render(<StoreInfo store={mockStore} />);
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('+1000')).toBeInTheDocument();
  });

  test('contains link to store', () => {
    render(<StoreInfo store={mockStore} />);
    const storeLink = screen.getByText('Ir a la tienda oficial');
    expect(storeLink).toBeInTheDocument();
    expect(storeLink).toHaveAttribute('href', 'https://example.com/store');
  });

  test('does not show official store badge for non-official stores', () => {
    const nonOfficialStore = { ...mockStore, isOfficialStore: false };
    render(<StoreInfo store={nonOfficialStore} />);
    expect(screen.queryByText('Tienda oficial')).not.toBeInTheDocument();
  });
});*/