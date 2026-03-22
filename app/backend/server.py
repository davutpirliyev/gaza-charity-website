from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class Story(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    age: int
    location: str
    story: str
    image_url: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class DonationInfo(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    paypal_link: str
    paypal_email: str
    btc_wallet: str
    eth_wallet: str
    usdt_wallet: str

class DonationRecord(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    donor_name: str
    amount: float
    currency: str
    payment_method: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class DonationRecordCreate(BaseModel):
    donor_name: str
    amount: float
    currency: str
    payment_method: str


# Routes
@api_router.get("/")
async def root():
    return {"message": "Gaza Charity API"}

@api_router.get("/stories", response_model=List[Story])
async def get_stories():
    # Return hardcoded stories for now
    stories = [
        {
            "id": str(uuid.uuid4()),
            "name": "Fatima",
            "age": 8,
            "location": "Gaza City",
            "story": "Fatima lost her home and school in the bombings. She dreams of going back to school and playing with her friends again. Your donation can help provide her with food, shelter, and education.",
            "image_url": "https://images.unsplash.com/photo-1727629660683-316b80d92b82",
            "timestamp": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Ahmed",
            "age": 10,
            "location": "Rafah",
            "story": "Ahmed and his family are living in a refugee camp. They lack basic necessities like clean water, food, and medical care. He is brave but needs our help to survive.",
            "image_url": "https://images.unsplash.com/photo-1727629660727-d475baef367f",
            "timestamp": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Layla",
            "age": 6,
            "location": "Khan Younis",
            "story": "Layla was injured during an airstrike and needs urgent medical treatment. Her family cannot afford the care she desperately needs. Every dollar counts.",
            "image_url": "https://images.unsplash.com/photo-1759061728875-e1dbcce479d0",
            "timestamp": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Omar",
            "age": 12,
            "location": "Gaza Strip",
            "story": "Omar lost both parents and is now taking care of his younger siblings. He is struggling to find food and shelter for his family. Your support can give them hope.",
            "image_url": "https://images.pexels.com/photos/6590920/pexels-photo-6590920.jpeg",
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
    ]
    return stories

@api_router.get("/donation-info", response_model=DonationInfo)
async def get_donation_info():
    # Return donation information
    return {
        "id": str(uuid.uuid4()),
        "paypal_link": "https://www.paypal.com/donate",
        "paypal_email": "donations@gazacharity.org",
        "btc_wallet": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
        "eth_wallet": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
        "usdt_wallet": "TRC20: TNDTZVbY7h3xJJCJZrG9YM8SRMJzjLXzKL"
    }

@api_router.post("/donations", response_model=DonationRecord)
async def record_donation(input: DonationRecordCreate):
    donation_obj = DonationRecord(**input.model_dump())
    
    doc = donation_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.donations.insert_one(doc)
    return donation_obj

@api_router.get("/donations", response_model=List[DonationRecord])
async def get_donations():
    donations = await db.donations.find({}, {"_id": 0}).to_list(1000)
    
    for donation in donations:
        if isinstance(donation['timestamp'], str):
            donation['timestamp'] = datetime.fromisoformat(donation['timestamp'])
    
    return donations

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
