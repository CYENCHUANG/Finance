import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Plus, Upload, TrendingUp, Wallet, PieChart as PieChartIcon } from 'lucide-react';

const Dashboard = () => {
  const [assets, setAssets] = useState([
    { id: 1, name: 'AAPL', symbol: 'AAPL', quantity: 50, currentPrice: 180, source: 'IB', type: 'stock', totalValue: 9000 },
    { id: 2, name: '0050 (元大台灣50)', symbol: '0050', quantity: 100, currentPrice: 120, source: 'Bank', type: 'etf', totalValue: 12000 },
    { id: 3, name: '國泰基金', symbol: 'GTF001', quantity: 5000, currentPrice: 12.5, source: 'Fund', type: 'fund', totalValue: 62500 },
  ]);

  const [totalAssets, setTotalAssets] = useState(0);
  const [assetsByType, setAssetsByType] = useState([]);

  // 計算總資產和資產配置
  useEffect(() => {
    const total = assets.reduce((sum, asset) => sum + asset.totalValue, 0);
    setTotalAssets(total);

    // 按類型統計資產
    const typeBreakdown = {};
    assets.forEach(asset => {
      typeBreakdown[asset.type] = (typeBreakdown[asset.type] || 0) + asset.totalValue;
    });

    const typeData = Object.entries(typeBreakdown).map(([type, value]) => ({
      name: type.charAt(0).toUpperCase() + type.slice(1),
      value: Math.round(value)
    }));
    setAssetsByType(typeData);
  }, [assets]);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  // 模擬新增資產
  const handleAddAsset = () => {
    const newAsset = {
      id: assets.length + 1,
      name: `Asset ${assets.length + 1}`,
      symbol: `SYM${assets.length + 1}`,
      quantity: Math.floor(Math.random() * 1000),
      currentPrice: Math.floor(Math.random() * 200) + 50,
      source: ['IB', 'Bank', 'Fund'][Math.floor(Math.random() * 3)],
      type: ['stock', 'etf', 'fund'][Math.floor(Math.random() * 3)],
      totalValue: 0
    };
    newAsset.totalValue = newAsset.quantity * newAsset.currentPrice;
    setAssets([...assets, newAsset]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
          <Wallet className="w-10 h-10 text-blue-400" />
          資產統計儀表板
        </h1>
        <p className="text-slate-300">實時監控您的投資組合</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-semibold">總淨資產</p>
              <p className="text-3xl font-bold text-white mt-2">
                NT${(totalAssets / 1000).toFixed(1)}K
              </p>
            </div>
            <Wallet className="w-12 h-12 text-blue-200 opacity-30" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-semibold">持倉數量</p>
              <p className="text-3xl font-bold text-white mt-2">{assets.length}</p>
            </div>
            <PieChartIcon className="w-12 h-12 text-green-200 opacity-30" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-semibold">未實現收益</p>
              <p className="text-3xl font-bold text-white mt-2">+12.5%</p>
            </div>
            <TrendingUp className="w-12 h-12 text-purple-200 opacity-30" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Asset Allocation Pie Chart */}
        <div className="bg-slate-700 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-4">資產配置</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={assetsByType}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: NT$${(value/1000).toFixed(0)}K`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {assetsByType.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `NT$${(value/1000).toFixed(1)}K`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Asset Performance Bar Chart */}
        <div className="bg-slate-700 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-4">資產淨值分佈</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={assets.map(asset => ({
                name: asset.symbol,
                value: asset.totalValue
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="name" stroke="#cbd5e1" />
              <YAxis stroke="#cbd5e1" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                labelStyle={{ color: '#fff' }}
                formatter={(value) => `NT$${(value/1000).toFixed(1)}K`}
              />
              <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Assets Table */}
      <div className="bg-slate-700 rounded-lg p-6 shadow-lg mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">持倉明細</h2>
          <button
            onClick={handleAddAsset}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Plus className="w-4 h-4" />
            新增資產
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-600">
              <tr className="text-slate-300">
                <th className="px-4 py-3 text-left font-semibold">代碼</th>
                <th className="px-4 py-3 text-left font-semibold">名稱</th>
                <th className="px-4 py-3 text-right font-semibold">數量</th>
                <th className="px-4 py-3 text-right font-semibold">現價</th>
                <th className="px-4 py-3 text-right font-semibold">市值</th>
                <th className="px-4 py-3 text-left font-semibold">來源</th>
                <th className="px-4 py-3 text-left font-semibold">類型</th>
              </tr>
            </thead>
            <tbody>
              {assets.map(asset => (
                <tr key={asset.id} className="border-b border-slate-600 hover:bg-slate-600 transition">
                  <td className="px-4 py-3 text-white font-mono font-bold">{asset.symbol}</td>
                  <td className="px-4 py-3 text-slate-200">{asset.name}</td>
                  <td className="px-4 py-3 text-right text-white">{asset.quantity.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-white">NT${asset.currentPrice.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right text-green-400 font-semibold">
                    NT${asset.totalValue.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                      asset.source === 'IB' ? 'bg-blue-900 text-blue-200' :
                      asset.source === 'Bank' ? 'bg-green-900 text-green-200' :
                      'bg-purple-900 text-purple-200'
                    }`}>
                      {asset.source}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-amber-900 text-amber-200">
                      {asset.type.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-700 rounded-lg p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <Upload className="w-6 h-6 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">IB 導入</h3>
          </div>
          <p className="text-slate-300 text-sm">
            直接從 Interactive Brokers 導入現有持倉，快速同步資料
          </p>
        </div>

        <div className="bg-slate-700 rounded-lg p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <Wallet className="w-6 h-6 text-green-400" />
            <h3 className="text-lg font-semibold text-white">多銀行支援</h3>
          </div>
          <p className="text-slate-300 text-sm">
            支援各大銀行證券帳戶，集中管理所有資產
          </p>
        </div>

        <div className="bg-slate-700 rounded-lg p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">實時統計</h3>
          </div>
          <p className="text-slate-300 text-sm">
            即時計算總資產、損益、配置比例等關鍵指標
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
