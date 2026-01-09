from sqlalchemy.orm import Session
from app.models.cart import Cart, CartItem

class CartRepository:

    def create_cart(self, db: Session, userId:int) -> Cart:
        cart = Cart(userId=userId)
        db.add(cart)
        db.commit()
        db.refresh(cart)
        return cart

    def add_item(self, db: Session, item: CartItem):
        db.add(item)

    def commit(self, db: Session):
        db.commit()

    def get_all(self, db: Session):
        return db.query(Cart).all()
    
    def get_all_my_carts(self, db: Session, userId: int):
        return db.query(Cart).filter(Cart.userId == userId).all()
    
    def get_by_id(self, db: Session, cart_id: int):
        return db.query(Cart).filter(Cart.id == cart_id).first()

    def delete(self, db: Session, cart: Cart):
        db.delete(cart)
        db.commit()
