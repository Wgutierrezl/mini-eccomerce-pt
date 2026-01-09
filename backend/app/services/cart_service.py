from sqlalchemy.orm import Session
from app.repositories.cart_repository import CartRepository
from app.schemas.cart import CartCreate
from app.models.cart import CartItem

class CartService:

    def __init__(self):
        self.repository = CartRepository()

    def create_cart(self, db: Session, data: CartCreate, userId: int):
        cart = self.repository.create_cart(db,userId=userId)

        for item in data.items:
            cart_item = CartItem(
                cart_id=cart.id,
                product_id=item.product_id,
                quantity=item.quantity,
                price=item.price
            )
            self.repository.add_item(db, cart_item)

        self.repository.commit(db)

        return {
            "message": "Carrito guardado correctamente",
            "cart_id": cart.id
        }

    def get_all(self, db: Session):
        return self.repository.get_all(db)
    
    def get_all_my_carts(self, db: Session, userId : int):
        return self.repository.get_all_my_carts(db,userId)

    def get_by_id(self, db: Session, cart_id: int):
        return self.repository.get_by_id(db, cart_id)

    def delete(self, db: Session, cart_id: int):
        cart = self.repository.get_by_id(db, cart_id)

        if not cart:
            return None

        self.repository.delete(db, cart)
        return True
