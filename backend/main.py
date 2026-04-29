from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI(
    title="InstantService API",
    description="Backend API and Dispatch Engine for InstantService",
    version="1.0.0",
)

# Set up CORS for the frontend PWA
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "InstantService Backend"}

from api.routes import analyze_request, tier, dispatch, booking

# Include routers
app.include_router(analyze_request.router, prefix="/api", tags=["Analysis"])
app.include_router(tier.router, prefix="/api", tags=["Tier Selection"])
app.include_router(dispatch.router, prefix="/api", tags=["Dispatching"])
app.include_router(booking.router, prefix="/api", tags=["Booking"])

