from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

app = FastAPI(title="Asset Tracker API")

# CORS 設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 記憶體資料庫（測試用）
assets_db = {}
next_id = 1

@app.get("/")
def read_root():
    return {"message": "Asset Tracker API"}

@app.get("/api/assets")
def get_assets():
    """取得所有資產"""
    return {"assets": list(assets_db.values())}

@app.post("/api/assets")
def create_asset(name: str, quantity: float, value: float, source: str):
    """建立新資產"""
    global next_id
    asset = {
        "id": next_id,
        "name": name,
        "quantity": quantity,
        "value": value,
        "source": source,
        "total": quantity * value
    }
    assets_db[next_id] = asset
    next_id += 1
    return asset

@app.get("/api/summary")
def get_summary():
    """取得資產總結"""
    if not assets_db:
        return {"total": 0, "by_source": {}, "by_type": {}}
    
    total = sum(asset["total"] for asset in assets_db.values())
    by_source = {}
    by_type = {}
    
    for asset in assets_db.values():
        source = asset["source"]
        if source not in by_source:
            by_source[source] = 0
        by_source[source] += asset["total"]
    
    return {"total": total, "by_source": by_source, "count": len(assets_db)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
