from pydantic import BaseModel

class CreateUserDTO(BaseModel):
    name: str
    email: str
    password: str

class LoginDTO(BaseModel):
    email: str
    password: str

class SessionDTO(BaseModel):
    userId: int
    email: str
    token: str