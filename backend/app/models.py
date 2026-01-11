from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Enum, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
import enum

Base = declarative_base()

class User(Base):
    """用戶模型"""
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # 關係
    assets = relationship("Asset", back_populates="owner", cascade="all, delete-orphan")
    ib_accounts = relationship("IBAccount", back_populates="owner", cascade="all, delete-orphan")
    banks = relationship("Bank", back_populates="owner", cascade="all, delete-orphan")


class Asset(Base):
    """資產模型 - 支援 IB、銀行、基金"""
    __tablename__ = "assets"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # 基本資訊
    symbol = Column(String, index=True)  # 代號如 AAPL, 0050 等
    name = Column(String)  # 名稱
    asset_type = Column(String)  # stock, etf, fund, bond, cash
    source = Column(String)  # ib, bank, fund_company 等來源
    currency = Column(String, default="TWD")
    
    # 數量和價格
    quantity = Column(Float)  # 單位數量
    unit_price = Column(Float, nullable=True)  # 單價 (購買時或最後更新)
    current_price = Column(Float, nullable=True)  # 當前市價
    cost_basis = Column(Float, nullable=True)  # 原始成本
    
    # 銀行/來源資訊
    bank_id = Column(Integer, ForeignKey("banks.id"), nullable=True)
    ib_account_id = Column(Integer, ForeignKey("ib_accounts.id"), nullable=True)
    
    # 日期
    purchase_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # 關係
    owner = relationship("User", back_populates="assets")
    bank = relationship("Bank", back_populates="assets")
    ib_account = relationship("IBAccount", back_populates="assets")
    
    @property
    def market_value(self):
        """市場價值 = 數量 × 當前市價"""
        if self.current_price and self.quantity:
            return self.quantity * self.current_price
        return 0
    
    @property
    def unrealized_pnl(self):
        """未實現損益"""
        if self.cost_basis and self.current_price:
            return self.market_value - self.cost_basis
        return 0


class Bank(Base):
    """銀行模型 - 儲存各銀行的證券帳戶"""
    __tablename__ = "banks"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    bank_name = Column(String)  # 銀行名稱 如 中信銀, 台新銀等
    account_name = Column(String)  # 帳戶名稱
    account_id = Column(String)  # 帳號
    notes = Column(String, nullable=True)  # 備註
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # 關係
    owner = relationship("User", back_populates="banks")
    assets = relationship("Asset", back_populates="bank", cascade="all, delete-orphan")


class IBAccount(Base):
    """Interactive Brokers 帳戶模型"""
    __tablename__ = "ib_accounts"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    account_id = Column(String, unique=True)  # IB帳號
    account_name = Column(String)  # 帳戶別名
    last_import_date = Column(DateTime, nullable=True)  # 最後導入日期
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # 關係
    owner = relationship("User", back_populates="ib_accounts")
    assets = relationship("Asset", back_populates="ib_account", cascade="all, delete-orphan")


class IBImportLog(Base):
    """IB 導入紀錄"""
    __tablename__ = "ib_import_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    ib_account_id = Column(Integer, ForeignKey("ib_accounts.id"))
    
    import_date = Column(DateTime, default=datetime.utcnow)
    status = Column(String)  # success, failed, partial
    file_name = Column(String)
    rows_imported = Column(Integer)
    error_message = Column(String, nullable=True)
    
    ib_account = relationship("IBAccount")
