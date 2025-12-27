import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Zap,
  RefreshCw,
  Coins,
  Wallet
} from 'lucide-react';

const App = () => {
  // 對標幣安 (Binance) 階梯保證金率 Tier 1
  const BINANCE_TIERS = {
    BTC: { name: 'Bitcoin', mmr: 0.004, maxLev: 125, color: 'text-orange-400' },
    ETH: { name: 'Ethereum', mmr: 0.005, maxLev: 100, color: 'text-blue-400' },
    SOL: { name: 'Solana', mmr: 0.0065, maxLev: 50, color: 'text-purple-400' }
  };

  const [asset, setAsset] = useState('BTC');
  const [side, setSide] = useState('long');
  const [entryPrice, setEntryPrice] = useState('');
  const [margin, setMargin] = useState('');
  const [leverage, setLeverage] = useState(10);
  const [liqPrice, setLiqPrice] = useState(null);
  const [distance, setDistance] = useState(null);
  const [notional, setNotional] = useState(0);

  // 精確模擬幣安公式計算
  useEffect(() => {
    if (!entryPrice || !leverage) {
      setLiqPrice(null);
      setDistance(null);
      setNotional(0);
      return;
    }

    const P = parseFloat(entryPrice);
    const L = parseFloat(leverage);
    const M = parseFloat(margin) || 0;
    const MMR = BINANCE_TIERS[asset].mmr;

    setNotional(M * L);

    let price;
    if (side === 'long') {
      price = P * (1 - (1 / L) + MMR);
    } else {
      price = P * (1 + (1 / L) - MMR);
    }

    const finalPrice = price > 0 ? price : 0;
    setLiqPrice(finalPrice.toFixed(asset === 'BTC' ? 2 : 3));

    const dist = ((Math.abs(finalPrice - P) / P) * 100).toFixed(2);
    setDistance(dist);
  }, [side, entryPrice, leverage, asset, margin]);

  const resetAll = () => {
    setEntryPrice('');
    setMargin('');
    setLeverage(10);
  };

  return (
    <div className="min-h-screen bg-[#0b0e11] text-[#eaecef] flex items-center justify-center p-4 font-sans overflow-x-hidden relative">
      {/* 增強背景科技感 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#f3ba2f]/10 blur-[180px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 blur-[180px] rounded-full animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/5 blur-[120px] rounded-full"></div>
        {/* 科技網格背景 */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
      </div>

      <div className="w-full max-w-lg relative z-10 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 px-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-[#f3ba2f] to-[#f0b90b] rounded-xl shadow-[0_0_25px_rgba(243,186,47,0.5),0_0_50px_rgba(243,186,47,0.2)] hover:shadow-[0_0_35px_rgba(243,186,47,0.7)] transition-all duration-300 hover:scale-110">
              <Zap size={22} className="text-black fill-black" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">ZS 爆倉算表 ✨</h1>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse"></span>
                Smart Trading Terminal
              </p>
            </div>
          </div>
          <button onClick={resetAll} className="p-2.5 hover:bg-white/10 rounded-xl transition-all duration-300 text-slate-500 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:scale-110">
            <RefreshCw size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          {/* Main Interface Card */}
          <div className="bg-[#181a20] border border-[#2b2f36] rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(243,186,47,0.1)] overflow-hidden backdrop-blur-md hover:shadow-[0_25px_70px_rgba(0,0,0,0.6),0_0_50px_rgba(243,186,47,0.15)] transition-shadow duration-500">
            {/* Asset Tabs - 增強 3D 效果 */}
            <div className="flex border-b border-[#2b2f36] bg-gradient-to-b from-[#1e2026] to-[#181a20]">
              {Object.keys(BINANCE_TIERS).map((symbol) => {
                const colors = {
                  BTC: { gradient: 'from-orange-500 to-yellow-500', shadow: 'shadow-orange-500/50' },
                  ETH: { gradient: 'from-blue-500 to-cyan-400', shadow: 'shadow-blue-500/50' },
                  SOL: { gradient: 'from-purple-500 to-pink-500', shadow: 'shadow-purple-500/50' }
                };
                return (
                  <button
                    key={symbol}
                    onClick={() => setAsset(symbol)}
                    className={`flex-1 py-6 text-lg font-black transition-all duration-300 relative group ${asset === symbol
                        ? `text-transparent bg-clip-text bg-gradient-to-r ${colors[symbol].gradient} scale-110`
                        : 'text-slate-500 hover:text-slate-300 hover:bg-[#2b2f36]/20 hover:scale-105'
                      }`}
                  >
                    <span className={`relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] ${asset === symbol ? 'text-shadow-lg' : ''}`}>
                      {symbol}
                    </span>
                    {asset === symbol && (
                      <>
                        <div className={`absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r ${colors[symbol].gradient} shadow-[0_0_20px] ${colors[symbol].shadow} animate-pulse`}></div>
                        <div className={`absolute inset-0 bg-gradient-to-t ${colors[symbol].gradient} opacity-10 blur-xl`}></div>
                      </>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="p-8">
              {/* Long/Short Switcher */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <button
                  onClick={() => setSide('long')}
                  className={`py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all duration-300 transform ${side === 'long'
                    ? 'bg-gradient-to-br from-[#2ebd85] to-[#26a17b] text-white shadow-[0_8px_20px_rgba(46,189,133,0.4),0_0_40px_rgba(46,189,133,0.2),inset_0_1px_0_rgba(255,255,255,0.2)] scale-[1.02] hover:scale-[1.05] hover:shadow-[0_12px_30px_rgba(46,189,133,0.5),0_0_50px_rgba(46,189,133,0.3)]'
                    : 'bg-[#2b2f36] text-slate-500 hover:bg-[#2b2f36]/80 shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_20px_rgba(46,189,133,0.2)] hover:text-[#2ebd85] hover:scale-[1.02]'
                    }`}
                >
                  <TrendingUp size={18} /> 做多 LONG
                </button>
                <button
                  onClick={() => setSide('short')}
                  className={`py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all duration-300 transform ${side === 'short'
                    ? 'bg-gradient-to-br from-[#f6465d] to-[#d93853] text-white shadow-[0_8px_20px_rgba(246,70,93,0.4),0_0_40px_rgba(246,70,93,0.2),inset_0_1px_0_rgba(255,255,255,0.2)] scale-[1.02] hover:scale-[1.05] hover:shadow-[0_12px_30px_rgba(246,70,93,0.5),0_0_50px_rgba(246,70,93,0.3)]'
                    : 'bg-[#2b2f36] text-slate-500 hover:bg-[#2b2f36]/80 shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_20px_rgba(246,70,93,0.2)] hover:text-[#f6465d] hover:scale-[1.02]'
                    }`}
                >
                  <TrendingDown size={18} /> 做空 SHORT
                </button>
              </div>

              {/* Inputs */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">保證金 (Margin)</label>
                    <div className="relative group">
                      <input
                        type="number"
                        value={margin}
                        onChange={(e) => setMargin(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-[#0b0e11] border border-[#2b2f36] focus:border-[#f3ba2f] focus:shadow-[0_0_20px_rgba(243,186,47,0.3),inset_0_1px_0_rgba(243,186,47,0.1)] rounded-2xl py-4 px-5 text-xl font-mono text-white outline-none transition-all duration-300 hover:border-[#f3ba2f]/30"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-slate-600 font-bold">₮</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">入場價 (Entry)</label>
                    <div className="relative group">
                      <input
                        type="number"
                        value={entryPrice}
                        onChange={(e) => setEntryPrice(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-[#0b0e11] border border-[#2b2f36] focus:border-[#f3ba2f] focus:shadow-[0_0_20px_rgba(243,186,47,0.3),inset_0_1px_0_rgba(243,186,47,0.1)] rounded-2xl py-4 px-5 text-xl font-mono text-white outline-none transition-all duration-300 hover:border-[#f3ba2f]/30"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">槓桿倍數 (Leverage)</label>
                    <span className="text-xl font-mono font-black text-[#f3ba2f]">{leverage}x</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max={BINANCE_TIERS[asset].maxLev}
                    value={leverage}
                    onChange={(e) => setLeverage(e.target.value)}
                    className="w-full h-2 bg-[#2b2f36] rounded-lg appearance-none cursor-pointer accent-[#f3ba2f]"
                  />
                </div>

                {/* Position Stats */}
                <div className="bg-[#0b0e11] p-5 rounded-[1.5rem] border border-white/5 space-y-3 shadow-inner">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500 flex items-center gap-2"><Wallet size={14} className="text-[#f3ba2f]" /> 名義價值</span>
                    <span className="text-white font-mono font-bold">{notional.toFixed(2)} USDT</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500 flex items-center gap-2"><Coins size={14} className="text-[#f3ba2f]" /> 持倉數量</span>
                    <span className="text-slate-400 font-mono">
                      {entryPrice > 0 ? (notional / entryPrice).toFixed(4) : '0.0000'} {asset}
                    </span>
                  </div>
                </div>
              </div>

              {/* Result Area - 增強炫彩效果 */}
              <div className="mt-10 bg-gradient-to-br from-[#0b0e11] via-[#1a1d2e] to-[#181a20] rounded-[2rem] p-8 border-2 border-[#f3ba2f]/20 shadow-[0_0_50px_rgba(243,186,47,0.3),0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden group hover:shadow-[0_0_70px_rgba(243,186,47,0.5)] transition-all duration-500">
                {/* 3D 光暈背景 */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#f3ba2f]/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>

                {/* 大型幣種符號 - 帶陰影 */}
                <div className="absolute top-4 right-6 opacity-10 select-none pointer-events-none">
                  <span className={`text-9xl font-black ${asset === 'BTC' ? 'text-orange-500 drop-shadow-[0_0_30px_rgba(249,115,22,0.6)]' :
                      asset === 'ETH' ? 'text-blue-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]' :
                        'text-purple-500 drop-shadow-[0_0_30px_rgba(168,85,247,0.6)]'
                    }`}>{asset}</span>
                </div>

                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#f3ba2f] via-yellow-400 to-orange-500 shadow-[0_0_20px_#f3ba2f]"></div>

                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] mb-3 relative z-10 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#f3ba2f] rounded-full animate-pulse shadow-[0_0_10px_#f3ba2f]"></span>
                  對標幣安強平價 (LIQ. PRICE)
                </p>
                <div className={`text-6xl font-mono font-black tracking-tighter relative z-10 ${liqPrice
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]'
                    : 'text-slate-800'
                  }`}>
                  {liqPrice || '0000.00'}
                </div>

                {liqPrice && (
                  <div className="mt-6 pt-6 border-t border-gradient-to-r from-transparent via-[#f3ba2f]/30 to-transparent relative z-10">
                    <div className="flex items-center justify-between bg-slate-900/50 p-4 rounded-xl backdrop-blur-sm border border-white/5">
                      <span className="text-sm font-bold text-slate-400 tracking-wide">距爆倉百分比</span>
                      <span className={`text-2xl font-mono font-black ${parseFloat(distance) < 5
                          ? 'text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-red-600 animate-pulse drop-shadow-[0_0_15px_rgba(244,63,94,0.8)]'
                          : 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500 drop-shadow-[0_0_15px_rgba(52,211,153,0.6)]'
                        }`}>
                        {distance}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 px-4 flex flex-col items-center gap-4">
          <div className="flex gap-4 p-5 bg-orange-500/5 border border-orange-500/10 rounded-[1.5rem] w-full">
            <AlertTriangle className="text-orange-500 shrink-0 mt-1" size={18} />
            <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
              <span className="text-orange-400 font-black">實戰提醒：</span>本工具對標幣安第一階梯維持保證金率 (MMR)。高槓桿合約具備極高風險，請自行評估承受能力。
            </p>
          </div>
          <p className="text-[10px] text-slate-700 font-black tracking-[0.5em] uppercase">
            ZS Smart Trading Engine v3.0
          </p>
        </div>
      </div>

      <style>{`
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: #f3ba2f;
          cursor: pointer;
          border: 3px solid #181a20;
          box-shadow: 0 0 15px rgba(243,186,47,0.5);
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
