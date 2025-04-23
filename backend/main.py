from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ai.verify_user_trust import router as custom_request_router  # update path if needed

app = FastAPI()

# Allow frontend access (localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Register all routers here
app.include_router(custom_request_router)
