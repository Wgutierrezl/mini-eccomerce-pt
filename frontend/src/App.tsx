import { useState } from 'react';
import { ProductList, type Product } from '../src/components/ProductList';
import { ShoppingCart, type CartItem } from '../src/components/ShoppingCart';
import { SavedCarts, type SavedCart } from '../src/components/SavedCarts';
import { ConfirmationMessage } from '../src/components/ConfirmationMessage';

export default function App() {
  // Mock de productos (simulando respuesta del backend)
  const [products] = useState<Product[]>([
    { id: 1, name: 'Laptop HP Pavilion', price: 899.99, stock: 15 },
    { id: 2, name: 'Mouse Logitech MX', price: 79.99, stock: 30 },
    { id: 3, name: 'Teclado Mecánico RGB', price: 129.99, stock: 20 },
    { id: 4, name: 'Monitor 27" 4K', price: 449.99, stock: 8 },
    { id: 5, name: 'Webcam HD 1080p', price: 59.99, stock: 25 },
    { id: 6, name: 'Auriculares Bluetooth', price: 149.99, stock: 0 },
  ]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [savedCarts, setSavedCarts] = useState<SavedCart[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleAddToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      }]);
    }
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const handleRemoveItem = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleSaveCart = () => {
    if (cart.length === 0) return;

    const newCart: SavedCart = {
      id: savedCarts.length + 1,
      items: [...cart],
      savedAt: new Date().toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setSavedCarts([...savedCarts, newCart]);
    setCart([]);
    
    // Mostrar mensaje de confirmación
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  const handleDeleteCart = (id: number) => {
    setSavedCarts(savedCarts.filter(cart => cart.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ConfirmationMessage show={showConfirmation} />
      
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl mb-8 text-center text-gray-800">
          Mini Ecommerce
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Columna izquierda: Productos */}
          <div>
            <ProductList
              products={products}
              onAddToCart={handleAddToCart}
            />
            
            {/* Carritos guardados debajo de productos en pantallas grandes */}
            <div className="hidden lg:block">
              <SavedCarts carts={savedCarts} onDeleteCart={handleDeleteCart} />
            </div>
          </div>

          {/* Columna derecha: Carrito */}
          <div>
            <div className="lg:sticky lg:top-6">
              <ShoppingCart
                items={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onSaveCart={handleSaveCart}
              />
            </div>
            
            {/* Carritos guardados en mobile */}
            <div className="lg:hidden">
              <SavedCarts carts={savedCarts} onDeleteCart={handleDeleteCart} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}