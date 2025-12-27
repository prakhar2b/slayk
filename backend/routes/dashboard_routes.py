from fastapi import APIRouter
from models import DashboardStats, Order
from database import db
from datetime import datetime

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

def deserialize_order(order: dict) -> dict:
    if 'created_at' in order and isinstance(order['created_at'], str):
        order['created_at'] = datetime.fromisoformat(order['created_at'])
    if 'updated_at' in order and isinstance(order['updated_at'], str):
        order['updated_at'] = datetime.fromisoformat(order['updated_at'])
    return order

@router.get("/stats", response_model=DashboardStats)
async def get_dashboard_stats():
    total_products = await db.products.count_documents({})
    total_orders = await db.orders.count_documents({})
    
    revenue_pipeline = [
        {"$match": {"status": {"$in": ["Delivered", "Shipped", "Processing"]}}},
        {"$group": {"_id": None, "total": {"$sum": "$total"}}}
    ]
    revenue_result = await db.orders.aggregate(revenue_pipeline).to_list(1)
    total_revenue = revenue_result[0]['total'] if revenue_result else 0
    
    pending_orders = await db.orders.count_documents({"status": "Pending"})
    low_stock_products = await db.products.count_documents({"stock_quantity": {"$lt": 10}})
    
    recent_orders_docs = await db.orders.find({}, {"_id": 0}).sort("created_at", -1).limit(5).to_list(5)
    recent_orders = [deserialize_order(o) for o in recent_orders_docs]
    
    return DashboardStats(
        total_products=total_products,
        total_orders=total_orders,
        total_revenue=total_revenue,
        pending_orders=pending_orders,
        low_stock_products=low_stock_products,
        recent_orders=recent_orders
    )

@router.get("/inventory")
async def get_inventory_status():
    products = await db.products.find(
        {},
        {"_id": 0, "id": 1, "name": 1, "slug": 1, "category": 1, "stock_quantity": 1, "in_stock": 1, "image": 1, "price": 1}
    ).sort("stock_quantity", 1).to_list(500)
    
    out_of_stock = [p for p in products if p.get('stock_quantity', 0) == 0]
    low_stock = [p for p in products if 0 < p.get('stock_quantity', 0) < 10]
    in_stock = [p for p in products if p.get('stock_quantity', 0) >= 10]
    
    return {
        "out_of_stock": out_of_stock,
        "low_stock": low_stock,
        "in_stock": in_stock,
        "summary": {
            "total": len(products),
            "out_of_stock_count": len(out_of_stock),
            "low_stock_count": len(low_stock),
            "in_stock_count": len(in_stock)
        }
    }
