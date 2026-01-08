import { ShoppingCart } from 'lucide-react';

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function ProductList({ products, onAddToCart }: ProductListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl mb-6">Productos</h2>
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg">{product.name}</h3>
                <p className="text-gray-600 text-sm">Stock: {product.stock}</p>
              </div>
              <p className="text-xl text-blue-600">${product.price.toFixed(2)}</p>
            </div>
            <button
              onClick={() => onAddToCart(product)}
              disabled={product.stock === 0}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} />
              {product.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
