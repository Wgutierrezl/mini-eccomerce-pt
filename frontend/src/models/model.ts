
//INTERFACES TO CREATE A CART
export interface CartItemCreate {
  product_id: number;
  quantity: number;
  price: number;
}

export interface CartCreate {
  items: CartItemCreate[];
}