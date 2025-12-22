from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
from datetime import datetime, timezone
import uuid

# ============ USER MODELS ============
class UserBase(BaseModel):
    email: EmailStr
    name: str
    role: str = "admin"

class UserCreate(BaseModel):
    email: EmailStr
    name: str
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(UserBase):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class UserInDB(User):
    hashed_password: str

class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    role: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

# ============ PRODUCT MODELS ============
class ProductBase(BaseModel):
    name: str
    slug: str
    category: str
    price: float
    original_price: float
    discount: int = 0
    description: str
    features: List[str] = []
    colors: List[str] = []
    sizes: List[str] = []
    image: str
    images: List[str] = []
    in_stock: bool = True
    is_new: bool = False
    is_best_seller: bool = False
    stock_quantity: int = 100

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    original_price: Optional[float] = None
    discount: Optional[int] = None
    description: Optional[str] = None
    features: Optional[List[str]] = None
    colors: Optional[List[str]] = None
    sizes: Optional[List[str]] = None
    image: Optional[str] = None
    images: Optional[List[str]] = None
    in_stock: Optional[bool] = None
    is_new: Optional[bool] = None
    is_best_seller: Optional[bool] = None
    stock_quantity: Optional[int] = None

class Product(ProductBase):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    rating: float = 4.5
    reviews: int = 0
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# ============ ORDER MODELS ============
class OrderItem(BaseModel):
    product_id: str
    product_name: str
    product_image: str
    quantity: int
    price: float
    selected_size: Optional[str] = None
    selected_color: Optional[str] = None

class ShippingAddress(BaseModel):
    first_name: str
    last_name: str
    email: str
    address: str
    city: str
    state: str
    pincode: str
    phone: str

class OrderCreate(BaseModel):
    items: List[OrderItem]
    shipping_address: ShippingAddress
    payment_method: str
    subtotal: float
    shipping: float
    total: float

class OrderUpdate(BaseModel):
    status: Optional[str] = None
    tracking_number: Optional[str] = None

class Order(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    order_number: str = Field(default_factory=lambda: f"SLAYK-{str(uuid.uuid4())[:8].upper()}")
    items: List[OrderItem]
    shipping_address: ShippingAddress
    payment_method: str
    subtotal: float
    shipping: float
    total: float
    status: str = "Pending"
    tracking_number: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# ============ CATEGORY MODEL ============
class Category(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    slug: str
    image: str
    count: int = 0

class CategoryCreate(BaseModel):
    name: str
    slug: str
    image: str

# ============ DASHBOARD STATS ============
class DashboardStats(BaseModel):
    total_products: int
    total_orders: int
    total_revenue: float
    pending_orders: int
    low_stock_products: int
    recent_orders: List[Order] = []
