import os
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum

from api.llm import generate_branding_snippet, generate_brand_keywords

OPENAI_MODEL = os.getenv("OPENAI_MODEL", "no model specified")
MAX_INPUT_LENGTH = 32


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


@app.get("/model/")
def model():
    return {"message": f"Using: {OPENAI_MODEL}."}


@app.get("/generate_snippet")
async def generate_snippet_api(data: str):
    validate_input_lenth(data)
    response = generate_branding_snippet(data)
    return {"snippet": response.content}


@app.get("/generate_keywords")
async def generate_keywords_api(data: str):
    validate_input_lenth(data)
    response = generate_brand_keywords(data)
    return {"keywords": response.hashtags}


def validate_input_lenth(data: str):
    if len(data) >= MAX_INPUT_LENGTH:
        raise HTTPException(
            status_code=400,
            detail=f"Input length is to long. Must be under {MAX_INPUT_LENGTH} characters.",
        )
