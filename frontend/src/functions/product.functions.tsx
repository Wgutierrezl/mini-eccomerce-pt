import type { Product } from "../components/ProductList";
import type { SavedCart } from "../components/SavedCarts";
import type { CartCreate } from "../models/model";
import api from "./ApiReutilizable";
import Swal from "sweetalert2";

//PRODUCTS

//METHOD TO GET ALL PRODUCTS
export async function GetAllProducts() : Promise<Product[] | void> {
    try{
        const response=await api.get<Product[]>('/products');
        console.log(response.data);
        return response.data;


    }catch(error:any){
        const statusCode=error.response.status;
        if(statusCode===404 || statusCode===400){
            Swal.fire('Informacion','aun no hay productos en el mini-eccomerce','info');
            return [];
        }

        throw error;
    }
    
}

//METHOD TO GET ALL CARTS SAVED
export async function GetAllCartsSaved() : Promise<SavedCart[] | void> {
    try{
        const response=await api.get<SavedCart[]>('/cart');
        console.log(response.data);
        return response.data;


    }catch(error:any){
        const statusCode=error.response.status;
        if(statusCode===404 || statusCode===400){
            Swal.fire('Informacion','aun no tienes carritos guardados','info');
            return [];
        }

        throw error;
    }
    
}

//METHOD TO DELETE SELECT CART BY ID
export async function DeleteSavedCardById(id:number) : Promise<boolean | void> {
    try{
        const response=await api.delete(`/cart/${id}`);
        console.log(response.data);
        if (response.status === 200) {
            Swal.fire('Eliminado', 'Carrito eliminado correctamente', 'success');
        return true;
        }

        return false
        


    }catch(error:any){
        const statusCode=error.response.status;
        if(statusCode===404 || statusCode===400){
            Swal.fire('Informacion','aun no tienes carritos guardados','info');
            return false;
        }

        throw error;
    }
    
}

//METHOD TO SAVE A CART INTO OUR BD
export async function SavedCartIntoBD(data:CartCreate) : Promise<boolean | void> {
    try{
        const response=await api.post('/cart',data);
        console.log(response.data);
        if(response.status===200){
            return true;
        }

        return false;

    }catch(error:any){
        const statusCode=error.response.status;
        if(statusCode===404 || statusCode===400){
            Swal.fire('Informacion','no hemos logrado guardar el carrito','info');
            return false;
        }

        throw error;
    }
    
}