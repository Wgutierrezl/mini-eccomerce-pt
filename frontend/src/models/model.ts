
//INTERFACES TO CREATE A CART
export interface CartItemCreate {
  product_id: number;
  quantity: number;
  price: number;
}

export interface CartCreate {
  items: CartItemCreate[];
}


//INTERFACES TO AUTH
export interface LoginDTO{
  email:string;
  password:string;
}


export interface CreateUser{
  name:string;
  email:string;
  password:string;
}


export interface SessionDTO{
  userId:number;
  email:string;
  token:string
}