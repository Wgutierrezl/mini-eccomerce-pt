from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import engine, Base
from app.controllers.product_controller import router as product_router
from app.controllers.cart_controller import router as cart_router
from app.controllers.user_controller import router as user_router

# Crear tablas
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(product_router)
app.include_router(cart_router)
app.include_router(user_router)
