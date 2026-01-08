from sqlalchemy.orm import Session
from app.repositories.product_repository import ProductRepository
from app.models.product import Product
from app.schemas.product import ProductCreate

class ProductService:

    def __init__(self):
        self.repository = ProductRepository()

    def get_products(self, db: Session):
        return self.repository.get_all(db)

    def create_product(self, db: Session, data: ProductCreate):
        product = Product(
            name=data.name,
            price=data.price,
            stock=data.stock
        )
        return self.repository.create(db, product)
