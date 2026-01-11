# 📊 資產統計 APP (Asset Tracker)

跨平台資產追蹤應用，支援手機和電腦同時使用。可從 Interactive Brokers 導入現有資產，手動追蹤銀行證券及基金單位，實時計算總資產。

## ✨ 核心功能

- **IB 帳戶導入**: 從 Interactive Brokers 匯入現有持倉
- **資產管理**: 手動添加/編輯銀行證券、基金、現金等
- **實時計算**: 即時統計總淨資產 (NAV)
- **多平台同步**: Web + Mobile 無縫同步
- **損益追蹤**: 計算未實現損益
- **資產配置**: 視覺化投資組合比例

## 🏗️ 技術棧

### 後端
- **框架**: FastAPI (Python)
- **數據庫**: PostgreSQL + SQLAlchemy ORM
- **快取**: Redis (可選)
- **部署**: Render

### 前端
- **Web**: React + TypeScript
- **Mobile**: React Native (計畫中)
- **狀態管理**: Redux / Zustand
- **API 通訊**: Axios + WebSocket

## 📁 專案結構

```
asset-tracker/
├── backend/
│   ├── app/
│   │   ├── models/           # 數據模型
│   │   ├── schemas/          # Pydantic schemas
│   │   ├── routes/           # API 端點
│   │   ├── services/         # 業務邏輯
│   │   ├── utils/            # 工具函數
│   │   └── config.py
│   ├── tests/
│   ├── requirements.txt
│   ├── main.py
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.tsx
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
├── .github/workflows/        # CI/CD
└── README.md
```

## 🚀 快速開始

### 開發環境設置

```bash
# Clone repository
git clone https://github.com/CYENCHUANG/Finance.git
cd Finance

# 後端
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# 前端
cd ../frontend
npm install

# 啟動服務
docker-compose up
```

## 📋 API 端點 (規劃)

### 認證
- `POST /api/auth/register` - 註冊
- `POST /api/auth/login` - 登入

### 資產管理
- `GET /api/assets` - 列表資產
- `POST /api/assets` - 新增資產
- `PUT /api/assets/{id}` - 編輯資產
- `DELETE /api/assets/{id}` - 刪除資產

### IB 導入
- `POST /api/ib/import` - 上傳 IB CSV
- `GET /api/ib/status` - 導入狀態

### 投資組合
- `GET /api/portfolio/summary` - 總淨值
- `GET /api/portfolio/allocation` - 資產配置
- `GET /api/portfolio/performance` - 績效分析

## 🔑 主要開發里程碑

**Phase 1 (MVP)** - 2 週
- [ ] 用戶認證系統
- [ ] 資產 CRUD
- [ ] 淨值計算
- [ ] Web 基礎 UI

**Phase 2** - 1 週
- [ ] IB CSV 導入
- [ ] 多銀行支援
- [ ] 資產配置視圖

**Phase 3** - 2 週
- [ ] React Native 行動應用
- [ ] 本地同步
- [ ] 離線支援

## 📝 貢獻指南

Fork 本儲存庫並建立功能分支:

```bash
git checkout -b feature/your-feature
git commit -m "Add your feature"
git push origin feature/your-feature
```

## 📄 授權

MIT License

---

**開發者**: CYENCHUANG
**開始日期**: 2026-01-11
**主要聯絡**: 可透過 GitHub Issues 反饋
