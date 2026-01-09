import type { Product } from "../components/ProductList";
import type { SavedCart } from "../components/SavedCarts";
import type { CartCreate, CreateUser, LoginDTO, SessionDTO } from "../models/model";
import api from "./ApiReutilizable";
import Swal from "sweetalert2";

//------------------------------------PRODUCTS
//METHOD TO GET ALL PRODUCTS
export async function GetAllProducts() : Promise<Product[] | void> {
    try{
        const response=await api.get<Product[]>('/products/');
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


//------------------------------------CARTS
//METHOD TO GET ALL CARTS SAVED
export async function GetAllMyCartsSaved() : Promise<SavedCart[] | void> {
    try{
        const response=await api.get<SavedCart[]>('/cart/getMyCarts');
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
        const response=await api.post('/cart/',data);
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


//------------------------------------USER/AUTH
//METHOD TO LOG A USER
export async function LoginUser(data:LoginDTO) : Promise<SessionDTO | void> {
    try{
        const response=await api.post<SessionDTO>('/auth/login',data);
        console.log(response.data);
        return response.data;


    }catch(error:any){
        const statusCode=error.response.status;
        if(statusCode===404 || statusCode===400){
            Swal.fire('Informacion','usuario o contraseña incorrecta','info');
            return
        }

        throw error;
    }
    
}

//METHOD TO REGISTER AN USER
export async function RegisterUser(data:CreateUser) : Promise<boolean | void> {
    try{
        const response=await api.post('/auth/register',data);
        console.log(response.data);
        if(response.status===200){
            return true;
        }
        return false;


    }catch(error:any){
        const statusCode=error.response.status;
        if(statusCode===404 || statusCode===400){
            Swal.fire('Informacion','np hemos logrado crear a el usuario','info');
            return false
        }

        throw error;
    }
    
}