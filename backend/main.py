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

# We will include routers here as we build them
