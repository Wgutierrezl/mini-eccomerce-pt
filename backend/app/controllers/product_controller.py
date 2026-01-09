from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.dependencies import get_db
from app.services.product_service import ProductService
from app.schemas.product import ProductCreate
from app.security.jwt_dependency import get_current_user

router = APIRouter(prefix="/products", 
                   tags=["Products"],
                   dependencies=[Depends(get_current_user)])

service = ProductService()

@router.get("/")
def get_products(db: Session = Depends(get_db)):
    return service.get_products(db)

@router.post("/")
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    return service.create_product(db, product)
