# Asset Tracker Application

可執行的資產追蹤應用程式

## 快速開始

### 1. 安裝依賴

#### 後端
```bash
cd backend
pip install -r requirements.txt
```

#### 前端
```bash
cd backend/app/frontend
npm install
```

### 2. 運行應用

#### 開啟兩個終端視窗

**終端 1 - 啟動後端 API (FastAPI)**
```bash
cd backend
python -m app.main
```
服務器將在 http://localhost:8000 啟動

**終端 2 - 啟動前端應用 (React)**
```bash
cd backend/app/frontend
npm start
```
應用將在 http://localhost:3000 打開

## API 端點

- `GET /` - API 狀態檢查
- `GET /api/assets` - 取得所有資產
- `POST /api/assets` - 建立新資產 (參數: name, quantity, value, source)
- `GET /api/summary` - 取得資產總結

## 功能

✅ 實時資產統計
✅ 按來源分配（IB、銀行、基金）
✅ 資產總值計算
✅ 響應式儀表板
✅ 互動式圖表與表格

## 注意事項

- IB 導入功能暫未實現
- 目前使用記憶體資料庫（重啟後數據丟失）
- 前端連接後端地址: http://localhost:8000
