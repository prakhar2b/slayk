from fastapi import APIRouter, HTTPException, status, Depends
from models import UserCreate, UserLogin, User, UserInDB, UserResponse, Token
from auth import get_password_hash, verify_password, create_access_token, get_current_user
from database import db

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=Token)
async def register(user_data: UserCreate):
    # Check if user already exists
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    hashed_password = get_password_hash(user_data.password)
    user = UserInDB(
        email=user_data.email,
        name=user_data.name,
        hashed_password=hashed_password,
        role="admin"
    )
    
    user_dict = user.model_dump()
    user_dict['created_at'] = user_dict['created_at'].isoformat()
    
    await db.users.insert_one(user_dict)
    
    # Create access token
    access_token = create_access_token(
        data={"sub": user.email, "user_id": user.id, "role": user.role, "name": user.name}
    )
    
    return Token(
        access_token=access_token,
        user=UserResponse(id=user.id, email=user.email, name=user.name, role=user.role)
    )

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
