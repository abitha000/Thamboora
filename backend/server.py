from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


class ReservationCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    date: str
    time: str
    guests: int
    special_requests: Optional[str] = None


class Reservation(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    date: str
    time: str
    guests: int
    special_requests: Optional[str] = None
    status: str = "pending"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    message: str


@api_router.get("/")
async def root():
    return {"message": "Thamboora Restaurant API"}


@api_router.post("/reservations", response_model=Reservation)
async def create_reservation(reservation_data: ReservationCreate):
    try:
        reservation = Reservation(**reservation_data.model_dump())
        doc = reservation.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        
        await db.reservations.insert_one(doc)
        return reservation
    except Exception as e:
        logging.error(f"Error creating reservation: {e}")
        raise HTTPException(status_code=500, detail="Failed to create reservation")


@api_router.get("/reservations", response_model=List[Reservation])
async def get_reservations():
    try:
        reservations = await db.reservations.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
        
        for reservation in reservations:
            if isinstance(reservation.get('created_at'), str):
                reservation['created_at'] = datetime.fromisoformat(reservation['created_at'])
        
        return reservations
    except Exception as e:
        logging.error(f"Error fetching reservations: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch reservations")


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(message_data: ContactMessageCreate):
    try:
        message = ContactMessage(**message_data.model_dump())
        doc = message.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        
        await db.contact_messages.insert_one(doc)
        return message
    except Exception as e:
        logging.error(f"Error creating contact message: {e}")
        raise HTTPException(status_code=500, detail="Failed to send message")


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
