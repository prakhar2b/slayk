"""
Create default admin user for SLAYK
Run: python create_admin.py
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path
from passlib.context import CryptContext
import os
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ.get('MONGO_URL')
db_name = os.environ.get('DB_NAME', 'slayk')
client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def create_admin():
    print("🔐 Creating admin user...")
    
    # Check if admin already exists
    existing = await db.users.find_one({"email": "admin@slayk.com"})
    if existing:
        print("⚠️ Admin user already exists, updating password...")
        hashed_password = pwd_context.hash("admin123")
        await db.users.update_one(
            {"email": "admin@slayk.com"},
            {"$set": {"hashed_password": hashed_password}}
        )
        print("✅ Admin password updated!")
    else:
        # Create new admin
        hashed_password = pwd_context.hash("admin123")
        admin_user = {
            "id": str(uuid.uuid4()),
            "email": "admin@slayk.com",
            "name": "Admin",
            "role": "admin",
            "hashed_password": hashed_password,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        await db.users.insert_one(admin_user)
        print("✅ Admin user created!")
    
    print("\n📋 Login credentials:")
    print("   Email: admin@slayk.com")
    print("   Password: admin123")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(create_admin())
