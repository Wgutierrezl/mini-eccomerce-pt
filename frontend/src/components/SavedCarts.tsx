import type { CartItem } from '../components/ShoppingCart';
import { Trash2 } from 'lucide-react';

export interface SavedCart {
  id: number;
  items: CartItem[];
  savedAt: string;
}

interface SavedCartsProps {
  carts: SavedCart[];
  onDeleteCart: (id: number) => void;
}

export function SavedCarts({ carts, onDeleteCart }: SavedCartsProps) {
  if (carts.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <h2 className="text-2xl mb-6">Carritos Guardados</h2>
      
      <div className="space-y-6">
        {carts.map((cart) => {
          const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
          
          return (
            <div
              key={cart.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex justify-between items-center mb-3 pb-3 border-b">
                <h3 className="text-lg">Carrito #{cart.id}</h3>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">{cart.savedAt}</span>
                  <button
                    onClick={() => onDeleteCart(cart.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    title="Eliminar carrito"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              
              <div className="space-y-2 mb-3">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center text-sm"
                  >
                    <div className="flex-1">
                      <span>{item.name}</span>
                      <span className="text-gray-500 ml-2">x{item.quantity}</span>
                    </div>
                    <span className="text-gray-700">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center pt-3 border-t">
                <span className="text-gray-700">Total:</span>
                <span className="text-lg text-blue-600">${total.toFixed(2)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}