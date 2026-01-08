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


class ProductResponse(BaseModel):
    id: int
    name: str
    price: float

    class Config:
        orm_mode = True

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