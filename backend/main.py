from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes.health import router as health_router
from api.routes.contractor import router as contractor_router

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

# from backend.api.routes import analyze_request, tier, dispatch, booking, voice

# Include routers
# app.include_router(analyze_request.router, prefix="/api", tags=["Analysis"])
# app.include_router(tier.router, prefix="/api", tags=["Tier Selection"])
# app.include_router(dispatch.router, prefix="/api", tags=["Dispatching"])
# app.include_router(booking.router, prefix="/api", tags=["Booking"])
# app.include_router(voice.router, prefix="/api", tags=["Voice"])
app.include_router(contractor_router)
