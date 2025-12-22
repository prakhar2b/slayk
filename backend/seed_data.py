"""
Seed script to populate initial data for SLAYK store
Run: python seed_data.py
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path
import os
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

categories = [
    {"id": str(uuid.uuid4()), "name": "Bedsheets", "slug": "bedsheets", "image": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop", "count": 0},
    {"id": str(uuid.uuid4()), "name": "Curtains", "slug": "curtains", "image": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&h=400&fit=crop", "count": 0},
    {"id": str(uuid.uuid4()), "name": "Cushion Covers", "slug": "cushion-covers", "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop", "count": 0},
    {"id": str(uuid.uuid4()), "name": "Rugs & Carpets", "slug": "rugs-carpets", "image": "https://images.unsplash.com/photo-1600166898405-da9535204843?w=400&h=400&fit=crop", "count": 0},
    {"id": str(uuid.uuid4()), "name": "Wall Decor", "slug": "wall-decor", "image": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&h=400&fit=crop", "count": 0},
    {"id": str(uuid.uuid4()), "name": "Kitchen", "slug": "kitchen", "image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop", "count": 0},
    {"id": str(uuid.uuid4()), "name": "Lighting", "slug": "lighting", "image": "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=400&fit=crop", "count": 0},
    {"id": str(uuid.uuid4()), "name": "Bath", "slug": "bath", "image": "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&h=400&fit=crop", "count": 0}
]

products = [
    {
        "id": str(uuid.uuid4()),
        "name": "Botanical Dreams Cotton Bedsheet Set",
        "slug": "botanical-dreams-bedsheet",
        "category": "bedsheets",
        "price": 2499,
        "original_price": 4999,
        "discount": 50,
        "rating": 4.8,
        "reviews": 1247,
        "image": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=600&fit=crop",
        "images": ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=600&fit=crop"],
        "description": "Transform your bedroom into a serene botanical paradise with our premium cotton bedsheet set.",
        "features": ["100% Premium Cotton", "300 Thread Count", "Machine Washable", "Includes 1 Bedsheet + 2 Pillow Covers"],
        "colors": ["Sage Green", "Dusty Rose", "Sky Blue"],
        "sizes": ["Single", "Double", "King"],
        "in_stock": True,
        "is_new": True,
        "is_best_seller": True,
        "stock_quantity": 150,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Velvet Luxe Cushion Cover Set of 5",
        "slug": "velvet-luxe-cushion",
        "category": "cushion-covers",
        "price": 1299,
        "original_price": 2599,
        "discount": 50,
        "rating": 4.6,
        "reviews": 892,
        "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop",
        "images": ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop"],
        "description": "Elevate your living space with our luxurious velvet cushion covers.",
        "features": ["Premium Velvet Fabric", "Hidden Zipper", "Set of 5 Covers", "16x16 inches"],
        "colors": ["Emerald", "Navy", "Burgundy", "Mustard"],
        "sizes": ["16x16", "18x18", "20x20"],
        "in_stock": True,
        "is_new": False,
        "is_best_seller": True,
        "stock_quantity": 200,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Handwoven Jute Area Rug",
        "slug": "handwoven-jute-rug",
        "category": "rugs-carpets",
        "price": 3999,
        "original_price": 7999,
        "discount": 50,
        "rating": 4.9,
        "reviews": 567,
        "image": "https://images.unsplash.com/photo-1600166898405-da9535204843?w=600&h=600&fit=crop",
        "images": ["https://images.unsplash.com/photo-1600166898405-da9535204843?w=600&h=600&fit=crop"],
        "description": "Bring natural warmth to your floors with our handwoven jute rug.",
        "features": ["100% Natural Jute", "Handwoven", "Anti-slip Backing", "Easy to Clean"],
        "colors": ["Natural", "Charcoal", "Ivory"],
        "sizes": ["4x6 ft", "5x7 ft", "6x9 ft", "8x10 ft"],
        "in_stock": True,
        "is_new": True,
        "is_best_seller": False,
        "stock_quantity": 75,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Sheer Elegance Curtains Pair",
        "slug": "sheer-elegance-curtains",
        "category": "curtains",
        "price": 1899,
        "original_price": 3799,
        "discount": 50,
        "rating": 4.7,
        "reviews": 1034,
        "image": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&h=600&fit=crop",
        "images": ["https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&h=600&fit=crop"],
        "description": "Let natural light filter through beautifully with our sheer curtains.",
        "features": ["Light Filtering", "Rod Pocket Design", "Machine Washable", "Set of 2 Panels"],
        "colors": ["White", "Ivory", "Light Grey", "Blush"],
        "sizes": ["5 ft", "7 ft", "9 ft"],
        "in_stock": True,
        "is_new": False,
        "is_best_seller": True,
        "stock_quantity": 120,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Boho Macrame Wall Hanging",
        "slug": "boho-macrame-wall",
        "category": "wall-decor",
        "price": 999,
        "original_price": 1999,
        "discount": 50,
        "rating": 4.5,
        "reviews": 678,
        "image": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&h=600&fit=crop",
        "images": ["https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&h=600&fit=crop"],
        "description": "Add bohemian charm to your walls with this handcrafted macrame piece.",
        "features": ["Handcrafted", "100% Cotton Rope", "Ready to Hang", "Wooden Dowel Included"],
        "colors": ["Natural", "White", "Cream"],
        "sizes": ["Small", "Medium", "Large"],
        "in_stock": True,
        "is_new": True,
        "is_best_seller": False,
        "stock_quantity": 90,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Ceramic Dinner Set 24 Pcs",
        "slug": "ceramic-dinner-set",
        "category": "kitchen",
        "price": 4999,
        "original_price": 9999,
        "discount": 50,
        "rating": 4.8,
        "reviews": 445,
        "image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop",
        "images": ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop"],
        "description": "Elevate your dining experience with our elegant ceramic dinner set.",
        "features": ["Premium Ceramic", "Microwave Safe", "Dishwasher Safe", "24 Piece Set"],
        "colors": ["White Gold", "Blue Floral", "Green Leaf"],
        "sizes": ["24 Pcs", "32 Pcs"],
        "in_stock": True,
        "is_new": False,
        "is_best_seller": True,
        "stock_quantity": 50,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Turkish Cotton Bath Towel Set",
        "slug": "turkish-bath-towels",
        "category": "bath",
        "price": 1799,
        "original_price": 3599,
        "discount": 50,
        "rating": 4.9,
        "reviews": 1567,
        "image": "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&h=600&fit=crop",
        "images": ["https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&h=600&fit=crop"],
        "description": "Wrap yourself in luxury with our Turkish cotton towels.",
        "features": ["100% Turkish Cotton", "600 GSM", "Set of 6 Towels", "Quick Dry"],
        "colors": ["White", "Grey", "Navy", "Sage"],
        "sizes": ["Set of 4", "Set of 6", "Set of 8"],
        "in_stock": True,
        "is_new": False,
        "is_best_seller": True,
        "stock_quantity": 180,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Minimalist Pendant Light",
        "slug": "minimalist-pendant-light",
        "category": "lighting",
        "price": 2999,
        "original_price": 5999,
        "discount": 50,
        "rating": 4.6,
        "reviews": 334,
        "image": "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&h=600&fit=crop",
        "images": ["https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&h=600&fit=crop"],
        "description": "Make a statement with our minimalist pendant light.",
        "features": ["E27 Bulb Compatible", "Adjustable Height", "Easy Installation", "Metal + Glass"],
        "colors": ["Black", "Gold", "White"],
        "sizes": ["Small", "Medium", "Large"],
        "in_stock": True,
        "is_new": True,
        "is_best_seller": False,
        "stock_quantity": 65,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Geometric Print Duvet Cover",
        "slug": "geometric-duvet-cover",
        "category": "bedsheets",
        "price": 3499,
        "original_price": 6999,
        "discount": 50,
        "rating": 4.7,
        "reviews": 876,
        "image": "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=600&fit=crop",
        "images": ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=600&fit=crop"],
        "description": "Modern geometric patterns meet supreme comfort in our duvet cover set.",
        "features": ["300 TC Cotton", "Hidden Zipper", "Corner Ties", "Includes 2 Pillow Shams"],
        "colors": ["Terracotta", "Charcoal", "Navy"],
        "sizes": ["Single", "Double", "King", "Super King"],
        "in_stock": True,
        "is_new": True,
        "is_best_seller": True,
        "stock_quantity": 8,  # Low stock for testing
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Blackout Curtains Premium",
        "slug": "blackout-curtains-premium",
        "category": "curtains",
        "price": 2499,
        "original_price": 4999,
        "discount": 50,
        "rating": 4.8,
        "reviews": 1234,
        "image": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&h=600&fit=crop",
        "images": ["https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&h=600&fit=crop"],
        "description": "Sleep better with our premium blackout curtains.",
        "features": ["99% Blackout", "Thermal Insulated", "Noise Reducing", "Grommet Top"],
        "colors": ["Charcoal", "Navy", "Burgundy", "Forest Green"],
        "sizes": ["5 ft", "7 ft", "9 ft"],
        "in_stock": True,
        "is_new": False,
        "is_best_seller": True,
        "stock_quantity": 0,  # Out of stock for testing
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat()
    }
]

# Sample orders for testing
orders = [
    {
        "id": str(uuid.uuid4()),
        "order_number": "SLAYK-A1B2C3D4",
        "items": [
            {"product_id": "test", "product_name": "Botanical Dreams Cotton Bedsheet Set", "product_image": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600", "quantity": 2, "price": 2499, "selected_size": "Double", "selected_color": "Sage Green"}
        ],
        "shipping_address": {"first_name": "Priya", "last_name": "Sharma", "email": "priya@example.com", "address": "123 MG Road", "city": "Mumbai", "state": "Maharashtra", "pincode": "400001", "phone": "9876543210"},
        "payment_method": "card",
        "subtotal": 4998,
        "shipping": 0,
        "total": 4998,
        "status": "Delivered",
        "tracking_number": "TRACK123456",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "order_number": "SLAYK-E5F6G7H8",
        "items": [
            {"product_id": "test", "product_name": "Velvet Luxe Cushion Cover Set", "product_image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600", "quantity": 1, "price": 1299, "selected_size": "16x16", "selected_color": "Emerald"}
        ],
        "shipping_address": {"first_name": "Rahul", "last_name": "Mehta", "email": "rahul@example.com", "address": "45 Park Street", "city": "Delhi", "state": "Delhi", "pincode": "110001", "phone": "9876543211"},
        "payment_method": "upi",
        "subtotal": 1299,
        "shipping": 0,
        "total": 1299,
        "status": "Shipped",
        "tracking_number": "TRACK789012",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "order_number": "SLAYK-I9J0K1L2",
        "items": [
            {"product_id": "test", "product_name": "Handwoven Jute Area Rug", "product_image": "https://images.unsplash.com/photo-1600166898405-da9535204843?w=600", "quantity": 1, "price": 3999, "selected_size": "5x7 ft", "selected_color": "Natural"},
            {"product_id": "test", "product_name": "Turkish Cotton Bath Towel Set", "product_image": "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600", "quantity": 2, "price": 1799, "selected_size": "Set of 6", "selected_color": "White"}
        ],
        "shipping_address": {"first_name": "Anita", "last_name": "Desai", "email": "anita@example.com", "address": "78 Brigade Road", "city": "Bangalore", "state": "Karnataka", "pincode": "560001", "phone": "9876543212"},
        "payment_method": "netbanking",
        "subtotal": 7597,
        "shipping": 0,
        "total": 7597,
        "status": "Pending",
        "tracking_number": None,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "order_number": "SLAYK-M3N4O5P6",
        "items": [
            {"product_id": "test", "product_name": "Ceramic Dinner Set 24 Pcs", "product_image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600", "quantity": 1, "price": 4999, "selected_size": "24 Pcs", "selected_color": "White Gold"}
        ],
        "shipping_address": {"first_name": "Vikram", "last_name": "Singh", "email": "vikram@example.com", "address": "22 Civil Lines", "city": "Jaipur", "state": "Rajasthan", "pincode": "302001", "phone": "9876543213"},
        "payment_method": "cod",
        "subtotal": 4999,
        "shipping": 0,
        "total": 4999,
        "status": "Processing",
        "tracking_number": None,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat()
    }
]

async def seed():
    print("🌱 Seeding database...")
    
    # Clear existing data
    await db.categories.delete_many({})
    await db.products.delete_many({})
    await db.orders.delete_many({})
    
    # Insert categories
    await db.categories.insert_many(categories)
    print(f"✅ Inserted {len(categories)} categories")
    
    # Update category counts based on products
    category_counts = {}
    for product in products:
        cat = product['category']
        category_counts[cat] = category_counts.get(cat, 0) + 1
    
    for slug, count in category_counts.items():
        await db.categories.update_one({"slug": slug}, {"$set": {"count": count}})
    
    # Insert products
    await db.products.insert_many(products)
    print(f"✅ Inserted {len(products)} products")
    
    # Insert orders
    await db.orders.insert_many(orders)
    print(f"✅ Inserted {len(orders)} orders")
    
    print("🎉 Database seeded successfully!")
    client.close()

if __name__ == "__main__":
    asyncio.run(seed())
