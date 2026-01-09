from sqlalchemy.orm import Session
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.security.hash_service import HashService
from app.security.token_service import TokenService
from app.schemas.user import CreateUserDTO, LoginDTO, SessionDTO

class AuthService:

    def __init__(self):
        self.user_repository = UserRepository()
        self.hash_service = HashService()
        self.token_service = TokenService()

    def register(self, db: Session, dto : CreateUserDTO):
        hashed_password = self.hash_service.hash_password(dto.password)

        user = User(
            name=dto.name,
            email=dto.email,
            password=hashed_password
        )

        return self.user_repository.create(db, user)

    def login(self, db: Session, dto: LoginDTO):
        user = self.user_repository.get_by_email(db, dto.email)

        if not user:
            return None

        if not self.hash_service.verify_password(dto.password, user.password):
            return None

        token = self.token_service.create_token(
            user_id=user.userId,
            name=user.name
        )

        return SessionDTO(
            userId=user.userId,
            email=user.email,
            token=token
        )
