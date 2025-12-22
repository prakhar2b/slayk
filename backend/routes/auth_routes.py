from fastapi import APIRouter, HTTPException, status, Depends
from models import UserLogin, UserResponse, Token
from auth import verify_password, create_access_token, get_current_user
from database import db

router = APIRouter(prefix="/auth", tags=["Authentication"])

# Registration disabled - only one admin allowed
# Admin credentials: admin@slayk.com / admin123

@router.post("/login", response_model=Token)
async def login(credentials: UserLogin):
    # Find user
    user_doc = await db.users.find_one({"email": credentials.email})
    if not user_doc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Verify password
    if not verify_password(credentials.password, user_doc['hashed_password']):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Create access token
    access_token = create_access_token(
        data={"sub": user_doc['email'], "user_id": user_doc['id'], "role": user_doc['role'], "name": user_doc['name']}
    )
    
    return Token(
        access_token=access_token,
        user=UserResponse(
            id=user_doc['id'],
            email=user_doc['email'],
            name=user_doc['name'],
            role=user_doc['role']
        )
    )

@router.get("/me", response_model=UserResponse)
async def get_me(current_user: dict = Depends(get_current_user)):
    user_doc = await db.users.find_one({"id": current_user['user_id']})
    if not user_doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return UserResponse(
        id=user_doc['id'],
        email=user_doc['email'],
        name=user_doc['name'],
        role=user_doc['role']
    )
