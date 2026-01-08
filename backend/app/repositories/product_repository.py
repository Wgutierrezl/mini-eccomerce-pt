from sqlalchemy.orm import Session
from app.models.product import Product

class ProductRepository:

    def get_all(self, db: Session):
        return db.query(Product).all()

    def create(self, db: Session, product: Product):
        db.add(product)
        db.commit()
        db.refresh(product)
        return product
