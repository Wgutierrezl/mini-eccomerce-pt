from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.dependencies import get_db
from app.services.cart_service import CartService
from app.schemas.cart import CartCreate, CartResponse
from app.security.jwt_dependency import get_current_user

router = APIRouter(prefix="/cart", 
                   tags=["Cart"],
                   dependencies=[Depends(get_current_user)])

service = CartService()

@router.post("/")
def save_cart(cart: CartCreate, 
              db: Session = Depends(get_db),
              current_user: dict=Depends(get_current_user)):
    return service.create_cart(db, cart,current_user["userId"])

@router.get("/", response_model=list[CartResponse])
def get_all_carts(db: Session = Depends(get_db)):
    return service.get_all(db)

@router.get("/getMyCarts", response_model=list[CartResponse])
def get_all_my_carts(db: Session = Depends(get_db), current_user:dict=Depends(get_current_user)):
    return service.get_all_my_carts(db,current_user["userId"])

@router.get("/{cart_id}", response_model=CartResponse)
def get_cart_by_id(cart_id: int, db: Session = Depends(get_db)):
    cart = service.get_by_id(db, cart_id)

    if not cart:
        raise HTTPException(status_code=404, detail="Carrito no encontrado")

    return cart

@router.delete("/{cart_id}")
def delete_cart(cart_id: int, db: Session = Depends(get_db)):
    result = service.delete(db, cart_id)

    if not result:
        raise HTTPException(status_code=404, detail="Carrito no encontrado")

    return {"message": "Carrito eliminado correctamente"}
