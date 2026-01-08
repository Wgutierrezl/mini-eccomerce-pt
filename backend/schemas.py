from pydantic import BaseModel
from typing import List


class ProductCreate(BaseModel):
    name: str
    price: float
    stock: int = 10

class CartItemCreate(BaseModel):
    product_id: int
    quantity: int
    price: float

class CartCreate(BaseModel):
    items: List[CartItemCreate]


class CartItemResponse(BaseModel):
    id: int
    product_id: int
    quantity: int
    price: float

    class Config:
        orm_mode = True


class CartResponse(BaseModel):
    id: int
    items: List[CartItemResponse]

    class Config:
        orm_mode = True