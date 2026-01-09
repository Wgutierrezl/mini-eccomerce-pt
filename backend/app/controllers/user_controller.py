# controllers/auth_controller.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.dependencies import get_db
from app.schemas.user import CreateUserDTO, LoginDTO, SessionDTO
from app.services.user_service import AuthService

router = APIRouter(prefix="/auth", tags=["Auth"])

service = AuthService()

@router.post("/register")
def register_user(dto: CreateUserDTO, db: Session = Depends(get_db)):
    user = service.register(db,dto)
    return user

@router.post("/login", response_model=SessionDTO)
def login_user(dto: LoginDTO, db: Session = Depends(get_db)):
    session = service.login(db, dto)

    if not session:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")

    return session