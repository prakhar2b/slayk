from fastapi import APIRouter, HTTPException, status, Depends, Query
from models import Order, OrderCreate, OrderUpdate
from auth import require_admin, get_current_user
from database import db
from datetime import datetime, timezone
from typing import List, Optional

router = APIRouter(prefix="/orders", tags=["Orders"])

def serialize_order(order: dict) -> dict:
    if 'created_at' in order and isinstance(order['created_at'], datetime):
        order['created_at'] = order['created_at'].isoformat()
    if 'updated_at' in order and isinstance(order['updated_at'], datetime):
        order['updated_at'] = order['updated_at'].isoformat()
    return order

def deserialize_order(order: dict) -> dict:
    if 'created_at' in order and isinstance(order['created_at'], str):
        order['created_at'] = datetime.fromisoformat(order['created_at'])
    if 'updated_at' in order and isinstance(order['updated_at'], str):
        order['updated_at'] = datetime.fromisoformat(order['updated_at'])
    return order

@router.get("", response_model=List[Order])
async def get_orders(
    status_filter: Optional[str] = Query(None, alias="status"),
    limit: int = Query(default=100, le=500),
    skip: int = 0,
    admin: dict = Depends(require_admin)
):
    query = {}
    if status_filter:
        query["status"] = status_filter
    
    orders = await db.orders.find(query, {"_id": 0}).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    return [deserialize_order(o) for o in orders]

@router.get("/{order_id}", response_model=Order)
async def get_order(order_id: str, admin: dict = Depends(require_admin)):
    order = await db.orders.find_one({"id": order_id}, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return deserialize_order(order)

@router.post("", response_model=Order)
async def create_order(order_data: OrderCreate):
    order = Order(**order_data.model_dump())
    order_dict = serialize_order(order.model_dump())
    
    await db.orders.insert_one(order_dict)
    
    # Update product stock quantities
    for item in order_data.items:
        await db.products.update_one(
            {"id": item.product_id},
            {"$inc": {"stock_quantity": -item.quantity}}
        )
        # Check if out of stock
        product = await db.products.find_one({"id": item.product_id})
        if product and product.get('stock_quantity', 0) <= 0:
            await db.products.update_one(
                {"id": item.product_id},
                {"$set": {"in_stock": False}}
            )
    
    return order

@router.put("/{order_id}", response_model=Order)
async def update_order(order_id: str, order_data: OrderUpdate, admin: dict = Depends(require_admin)):
    existing = await db.orders.find_one({"id": order_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Order not found")
    
    update_data = {k: v for k, v in order_data.model_dump().items() if v is not None}
    update_data['updated_at'] = datetime.now(timezone.utc).isoformat()
    
    await db.orders.update_one(
        {"id": order_id},
        {"$set": update_data}
    )
    
    updated = await db.orders.find_one({"id": order_id}, {"_id": 0})
    return deserialize_order(updated)

@router.delete("/{order_id}")
async def delete_order(order_id: str, admin: dict = Depends(require_admin)):
    existing = await db.orders.find_one({"id": order_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Order not found")
    
    await db.orders.delete_one({"id": order_id})
    return {"message": "Order deleted successfully"}
