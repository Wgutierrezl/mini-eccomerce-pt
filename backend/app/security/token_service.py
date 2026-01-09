from datetime import datetime, timedelta
from jose import jwt

class TokenService:

    SECRET_KEY = "HH24qJLS/mRBsykjM9LG6e4qEOLoVOBkwbaQzRdZcM3XX3lK62mTYqGseMmrr16/24wUdOHEg+SxxNahr/RNaQ=="
    ALGORITHM = "HS256"
    EXPIRE_MINUTES = 60

    def create_token(self, user_id: int, name: str) -> str:
        payload = {
            "userId": user_id,
            "name": name,
            "exp": datetime.utcnow() + timedelta(minutes=self.EXPIRE_MINUTES)
        }

        return jwt.encode(
            payload,
            self.SECRET_KEY,
            algorithm=self.ALGORITHM
        )
