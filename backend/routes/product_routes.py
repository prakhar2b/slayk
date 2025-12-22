from fastapi import APIRouter, HTTPException, status, Depends, Query
from models import Product, ProductCreate, ProductUpdate
from auth import require_admin
from database import db
from datetime import datetime, timezone
from typing import List, Optional

router = APIRouter(prefix="/products", tags=["Products"])

def serialize_product(product: dict) -> dict:
    """Convert datetime objects to ISO strings for JSON serialization"""
    if 'created_at' in product and isinstance(product['created_at'], datetime):
        product['created_at'] = product['created_at'].isoformat()
    if 'updated_at' in product and isinstance(product['updated_at'], datetime):
        product['updated_at'] = product['updated_at'].isoformat()
    return product

def deserialize_product(product: dict) -> dict:
    """Convert ISO strings back to datetime objects"""
    if 'created_at' in product and isinstance(product['created_at'], str):
        product['created_at'] = datetime.fromisoformat(product['created_at'])
    if 'updated_at' in product and isinstance(product['updated_at'], str):
        product['updated_at'] = datetime.fromisoformat(product['updated_at'])
    return product

@router.get("", response_model=List[Product])
async def get_products(
    category: Optional[str] = None,
    search: Optional[str] = None,
    limit: int = Query(default=100, le=500),
    skip: int = 0
):
    query = {}
    if category:
        query["category"] = category
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}}
        ]
    
    products = await db.products.find(query, {"_id": 0}).skip(skip).limit(limit).to_list(limit)
    return [deserialize_product(p) for p in products]

@router.get("/{product_id}", response_model=Product)
async def get_product(product_id: str):
    product = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return deserialize_product(product)

@router.get("/slug/{slug}", response_model=Product)
async def get_product_by_slug(slug: str):
    product = await db.products.find_one({"slug": slug}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return deserialize_product(product)

@router.post("", response_model=Product)
async def create_product(product_data: ProductCreate, admin: dict = Depends(require_admin)):
    # Check if slug already exists
    existing = await db.products.find_one({"slug": product_data.slug})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Product with this slug already exists"
        )
    
    product = Product(**product_data.model_dump())
    product_dict = serialize_product(product.model_dump())
    
    await db.products.insert_one(product_dict)
    
    # Update category count
    await db.categories.update_one(
        {"slug": product.category},
        {"$inc": {"count": 1}}
    )
    
    return product

@router.put("/{product_id}", response_model=Product)
async def update_product(product_id: str, product_data: ProductUpdate, admin: dict = Depends(require_admin)):
    existing = await db.products.find_one({"id": product_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Product not found")
    
    update_data = {k: v for k, v in product_data.model_dump().items() if v is not None}
    update_data['updated_at'] = datetime.now(timezone.utc).isoformat()
    
    await db.products.update_one(
        {"id": product_id},
        {"$set": update_data}
    )
    
    updated = await db.products.find_one({"id": product_id}, {"_id": 0})
    return deserialize_product(updated)

@router.delete("/{product_id}")
async def delete_product(product_id: str, admin: dict = Depends(require_admin)):
    existing = await db.products.find_one({"id": product_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Update category count
    await db.categories.update_one(
        {"slug": existing['category']},
        {"$inc": {"count": -1}}
    )
    
    await db.products.delete_one({"id": product_id})
    return {"message": "Product deleted successfully"}

@router.patch("/{product_id}/stock")
async def update_stock(product_id: str, stock_quantity: int, admin: dict = Depends(require_admin)):
    existing = await db.products.find_one({"id": product_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Product not found")
    
    in_stock = stock_quantity > 0
    await db.products.update_one(
        {"id": product_id},
        {"$set": {
            "stock_quantity": stock_quantity,
            "in_stock": in_stock,
            "updated_at": datetime.now(timezone.utc).isoformat()
        }}
    )
    
    return {"message": "Stock updated successfully", "stock_quantity": stock_quantity, "in_stock": in_stock}
