import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize application services"""
    # await db.init()
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

handler = Mangum(app)


@app.get("/health-check/")
def health_check():
    return {"message": "OK"}


@app.get("/test/")
def test():
    res = os.getenv("OPENAI_MODEL", "IT DID NOT FUCKING WORK")
    return {"message": f"Just wanted to ensure everything is working. {res}"}