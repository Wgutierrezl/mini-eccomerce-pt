import { useEffect, useState } from 'react';
import { ProductList, type Product } from '../src/components/ProductList';
import { ShoppingCart, type CartItem } from '../src/components/ShoppingCart';
import { SavedCarts, type SavedCart } from '../src/components/SavedCarts';
import { ConfirmationMessage } from '../src/components/ConfirmationMessage';
import { GetAllProducts, 
         GetAllCartsSaved, 
         DeleteSavedCardById,
         SavedCartIntoBD } from './functions/product.functions';

import Swal from 'sweetalert2';
import type { CartCreate } from './models/model';

export default function App() {
  const [products,setProducts]=useState<Product[]>();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [savedCarts, setSavedCarts] = useState<SavedCart[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(()=> {

    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    const fetchData=async()=> {
      try{
        const [productRes, savedCartRes]=await Promise.all([
          GetAllProducts(),
          GetAllCartsSaved()
        ]);

        setProducts(productRes ?? []);
        setSavedCarts(savedCartRes ?? []);

      }catch(error:any){
        Swal.fire('error',`ha ocurrido un error inesperado ${error.message}`,'error');
        setProducts([]);
        return ;

      }
    }
    fetchData();
  },[]);


  

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
        price: product.price,
        quantity: 1,
        product: product
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

  const handleSaveCart = async () => {
    if (cart.length === 0) return;

    const payload: CartCreate = {
      items: cart.map(item => ({
                product_id: item.product.id,
                quantity: item.quantity,
                price: item.price
              }))
    };
    try{
      const response=await SavedCartIntoBD(payload);

      if(!response){
        Swal.fire('error','no hemos logrado guardar el carrito','info');
        return;
      }

      const updatedCartSaved=await GetAllCartsSaved();
      setSavedCarts(updatedCartSaved ?? []);

      setCart([]);
      localStorage.removeItem("cart");
    
      // Mostrar mensaje de confirmación
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 3000)


    }catch(error:any){
      Swal.fire('error',`ha ocurrido un error inesperado ${error.message}`,'error');
      return;
    }

  };

  const handleDeleteCart = async (id: number) => {
    try{
      const response=await DeleteSavedCardById(id);
      if(!response){
        Swal.fire('error','no hemos logrado borrar el carrito que se guardo','error');
        return ;
      }

      setSavedCarts(savedCarts.filter(cart => cart.id !== id));

    }catch(error:any){
      Swal.fire('error',`ha ocurrido un error inesperado ${error.message}`,'error');
      return ;
    }
    
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
              products={products ?? []}
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