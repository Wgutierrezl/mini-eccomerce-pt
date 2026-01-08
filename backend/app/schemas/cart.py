from pydantic import BaseModel
from typing import List
from app.schemas.product import ProductResponse


class CartItemCreate(BaseModel):
    product_id: int
    quantity: int
    price: float


class CartCreate(BaseModel):
    items: List[CartItemCreate]


class CartItemResponse(BaseModel):
    id: int
    quantity: int
    price: float
    product: ProductResponse

    class Config:
        orm_mode = True


class CartResponse(BaseModel):
    id: int
    items: List[CartItemResponse]

    class Config:
        orm_mode = True
