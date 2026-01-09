import { useEffect, useState } from 'react';
import { ProductList, type Product } from '../src/components/ProductList';
import { ShoppingCart, type CartItem } from '../src/components/ShoppingCart';
import { SavedCarts, type SavedCart } from '../src/components/SavedCarts';
import { ConfirmationMessage } from '../src/components/ConfirmationMessage';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { GetAllProducts, 
         GetAllMyCartsSaved, 
         DeleteSavedCardById,
         SavedCartIntoBD,
         LoginUser,
         RegisterUser } 
from './functions/product.functions';

import Swal from 'sweetalert2';
import type { CartCreate, CreateUser, LoginDTO } from './models/model';

type View = 'login' | 'register' | 'shop';

export default function App() {
  const [products,setProducts]=useState<Product[]>();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [savedCarts, setSavedCarts] = useState<SavedCart[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentView, setCurrentView] = useState<View>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);



  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(()=> {
    if (!isAuthenticated) return;
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    const fetchData=async()=> {
      try{
        const [productRes, savedCartRes]=await Promise.all([
          GetAllProducts(),
          GetAllMyCartsSaved()
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
  },[isAuthenticated]);


  const handleLogin =async (email: string, password: string) => {

    if(!email || !password){
      Swal.fire('error','debes de digitar los campos de email y password','error');
      return ;
    }

    try{
      const dto:LoginDTO={
        email:email,
        password:password
      }

      const response=await LoginUser(dto);
      if(!response){
        return ;
      }

      localStorage.setItem('token',response.token);
      localStorage.setItem('email',response.email);

      // Aquí se llamaría al backend con el LoginDTO
      console.log('Login:', { email, password });
      setIsAuthenticated(true);
      setCurrentView('shop');

    }catch(error:any){
      Swal.fire('error',`ha ocurrido un error inesperado ${error.message}`,'error');
      return ;
    }
    
  };

  const handleRegister = async (name: string, email: string, password: string) => {

    if (!name || !email || !password) {
      Swal.fire(
        'Campos requeridos',
        'Nombre, email y contraseña son obligatorios',
        'warning'
      );
      return;
    }

    try{
      const dto:CreateUser={
        name:name,
        email:email,
        password:password
      };

      const response=await RegisterUser(dto);
      if(!response){
        return ;
      }

      Swal.fire(
        'Registro exitoso',
        'Ahora puedes iniciar sesión',
        'success'
      );

      setCurrentView('login');

    }catch(error:any){
      Swal.fire('error',`ha ocurrido un error inesperado ${error.message}`,'error');
      return;
    }
    
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('cart');

    setCart([]);
    setIsAuthenticated(false);
    setCurrentView('login');

    Swal.fire(
      'Sesión cerrada',
      'Has cerrado sesión correctamente',
      'info'
    );
  };


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


  const handleRestartQuantity=()=> {
    setCart(cart.map(x=> {
        return x = {
          ...x, quantity: x.quantity-1
        };
    }))
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

      const updatedCartSaved=await GetAllMyCartsSaved();
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

  // Renderizar vista de Login
  if (currentView === 'login') {
    return (
      <Login
        onLogin={handleLogin}
        onNavigateToRegister={() => setCurrentView('register')}
      />
    );
  }

  // Renderizar vista de Registro
  if (currentView === 'register') {
    return (
      <Register
        onRegister={handleRegister}
        onNavigateToLogin={() => setCurrentView('login')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ConfirmationMessage show={showConfirmation} />
      
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl mb-8 text-center text-gray-800">
          Mini Ecommerce
        </h1>
        <button
          onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-colors"
        >
            Cerrar Sesión
        </button>

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
                handleRestartQuantity={handleRestartQuantity}
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