from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from extract_skills import extract_text_from_pdf, extract_skills
import uvicorn

app = FastAPI()

# CORS settings: Only allow your frontend URL for security
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://skillextractor.netlify.app"],  # apne frontend URL yahan do
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload/")
async def upload_resume(file: UploadFile = File(...)):
    file_content = await file.read()
    text = extract_text_from_pdf(file_content)
    skills = extract_skills(text)
    return {"skills": skills}

if __name__ == "__main__":
    # Railway par chalate waqt host aur port Railway manage karta hai,
    # local test ke liye ye line chhodo ya comment karo.
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
