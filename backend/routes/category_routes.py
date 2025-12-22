from fastapi import APIRouter, HTTPException, Depends
from models import Category, CategoryCreate
from auth import require_admin
from motor.motor_asyncio import AsyncIOMotorClient
import os
import uuid
from typing import List

router = APIRouter(prefix="/categories", tags=["Categories"])

# Get database connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

@router.get("", response_model=List[Category])
async def get_categories():
    categories = await db.categories.find({}, {"_id": 0}).to_list(100)
    return categories

@router.post("", response_model=Category)
async def create_category(category_data: CategoryCreate, admin: dict = Depends(require_admin)):
    existing = await db.categories.find_one({"slug": category_data.slug})
    if existing:
        raise HTTPException(status_code=400, detail="Category with this slug already exists")
    
    category = Category(
        id=str(uuid.uuid4()),
        name=category_data.name,
        slug=category_data.slug,
        image=category_data.image,
        count=0
    )
    
    await db.categories.insert_one(category.model_dump())
    return category

@router.delete("/{category_id}")
async def delete_category(category_id: str, admin: dict = Depends(require_admin)):
    existing = await db.categories.find_one({"id": category_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Category not found")
    
    await db.categories.delete_one({"id": category_id})
    return {"message": "Category deleted successfully"}
