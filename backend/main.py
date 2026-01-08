from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models as models
from schemas import ProductCreate, CartCreate, CartResponse
from fastapi.middleware.cors import CORSMiddleware


models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción se limita
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/products")
def get_products(db: Session = Depends(get_db)):
    products = db.query(models.Product).all()
    return products


@app.post("/cart")
def save_cart(cart: CartCreate, db: Session = Depends(get_db)):
    new_cart = models.Cart()
    db.add(new_cart)
    db.commit()
    db.refresh(new_cart)

    for item in cart.items:
        cart_item = models.CartItem(
            cart_id=new_cart.id,
            product_id=item.product_id,
            quantity=item.quantity,
            price=item.price
        )
        db.add(cart_item)

    db.commit()

    return {
        "message": "Carrito guardado correctamente",
        "cart_id": new_cart.id
    }


@app.post("/products")
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    new_product = models.Product(
        name=product.name,
        price=product.price,
        stock=product.stock
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product


@app.get("/cart", response_model=list[CartResponse])
def get_all_carts(db: Session = Depends(get_db)):
    carts = db.query(models.Cart).all()
    return carts


@app.get("/cart/{cart_id}", response_model=CartResponse)
def get_cart_by_id(cart_id: int, db: Session = Depends(get_db)):
    cart = db.query(models.Cart).filter(models.Cart.id == cart_id).first()

    if not cart:
        return {"error": "Carrito no encontrado"}

    return cart


@app.delete("/cart/{cart_id}")
def delete_cart(cart_id: int, db: Session = Depends(get_db)):
    cart = db.query(models.Cart).filter(models.Cart.id == cart_id).first()

    if not cart:
        return {"error": "Carrito no encontrado"}

    db.delete(cart)
    db.commit()

    return {"message": "Carrito eliminado correctamente"}

