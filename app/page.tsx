"use client";

import React, { useState } from 'react';

// --- 1. 类型定义 ---
type AccentType = 'Geek' | 'Explorer';

interface HotelData {
  name: string;
  stars: number;
  rates: { platform: string; price: number }[];
  dimensions: {
    location: string[];
    service: string[];
    hardware: string[];
    amenities: string[];
    socialHighlights: string[];   
    dehydratedWarnings: string[]; 
  };
  suggestion: string;
}

// --- 2. 核心 Mock 数据 (包含小红书脱水内容) ---
const MOCK_DATA: HotelData = {
  name: "北京万达文华酒店",
  stars: 5,
  rates: [
    { platform: '携程', price: 1580 },
    { platform: '美团', price: 1520 },
    { platform: 'Google', price: 1610 }
  ],
  dimensions: {
    location: ['CBD核心区', '紧邻长安街', '下楼万达广场'],
    service: ['前台响应极快', '主动提供儿童洗漱包'],
    hardware: ['万达文华之床 (9.0+)', '隔音优秀'],
    amenities: ['早餐含地道北京小吃', '24h健身房'],
    socialHighlights: ['21层走廊尽头拍国贸三期绝美', '行政酒廊落地窗出片率高'],
    dehydratedWarnings: ['淋浴间角落有细微霉点', '空调外机在高层有轻微共振', '外卖只能送至楼下外卖柜']
  },
  suggestion: "五星级老牌酒店，若比周边柏悦便宜500元以上则性价比极高。入住务必备注‘高层非吸烟房’。"
};

// --- 3. 页面主组件 ---
export default function HotelPage() {
  const [accent, setAccent] = useState<AccentType>('Geek'); // 默认极客口音

  const isGeek = accent === 'Geek';

  return (
    <div className={`min-h-screen p-4 md:p-8 transition-colors duration-500 ${isGeek ? 'bg-slate-950' : 'bg-blue-50'}`}>
      <div className="max-w-4xl mx-auto">
        
        {/* 口音切换开关 (Accent Preference Selection) */}
        <div className="flex justify-end mb-8">
          <div className="bg-slate-800 p-1 rounded-lg flex gap-1">
            {(['Geek', 'Explorer'] as AccentType[]).map((type) => (
              <button
                key={type}
                onClick={() => setAccent(type)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  accent === type ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {type === 'Geek' ? '🤓 Geek 模式' : '🧭 Explorer 模式'}
              </button>
            ))}
          </div>
        </div>

        {/* 酒店核心风向标组件 */}
        <div className={`p-6 rounded-3xl border transition-all duration-500 shadow-2xl ${
          isGeek ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-blue-100 text-slate-900'
        }`}>
          {/* 头部：标题与星级 */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{MOCK_DATA.name}</h1>
              <div className="flex items-center gap-1 mt-2">
                {[...Array(MOCK_DATA.stars)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-xl">★</span>
                ))}
                <span className="text-xs ml-3 uppercase tracking-widest opacity-60">Luxury Stay</span>
              </div>
            </div>
            <div className="flex gap-2">
              {MOCK_DATA.rates.map(r => (
                <div key={r.platform} className={`px-3 py-2 rounded-xl border ${isGeek ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <p className="text-[10px] opacity-60 uppercase">{r.platform}</p>
                  <p className="text-sm font-bold text-blue-500">¥{r.price}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 左侧：硬核评价 & 避雷 */}
            <div className="space-y-6">
              <section>
                <h4 className={`text-xs font-bold mb-4 uppercase tracking-tighter ${isGeek ? 'text-slate-500' : 'text-blue-600'}`}>
                  ● 深度素质分析 (Dehydrated Data)
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-bold opacity-60 mb-1">📍 地理</p>
                    <p>{MOCK_DATA.dimensions.location[0]}</p>
                  </div>
                  <div>
                    <p className="font-bold opacity-60 mb-1">🤝 服务</p>
                    <p>{MOCK_DATA.dimensions.service[0]}</p>
                  </div>
                </div>
              </section>

              <section className={`p-5 rounded-2xl border-l-4 border-red-500 ${isGeek ? 'bg-red-500/10' : 'bg-red-50'}`}>
                <h4 className="text-xs font-bold text-red-500 mb-3 uppercase flex items-center gap-2">
                  ⚠️ 小红书脱水避雷针
                </h4>
                <ul className="space-y-2 text-sm">
                  {MOCK_DATA.dimensions.dehydratedWarnings.map(w => (
                    <li key={w} className={isGeek ? 'text-red-400' : 'text-red-700'}>• {w}</li>
                  ))}
                </ul>
              </section>
            </div>

            {/* 右侧：社交高光 & 最终建议 */}
            <div className="space-y-6">
              <section className={`p-5 rounded-2xl ${isGeek ? 'bg-blue-500/5' : 'bg-gradient-to-br from-blue-50 to-pink-50'}`}>
                <h4 className={`text-xs font-bold mb-4 uppercase ${isGeek ? 'text-blue-400' : 'text-pink-500'}`}>
                  📸 社交出片机位 / 隐藏玩法
                </h4>
                <div className="flex flex-wrap gap-2">
                  {MOCK_DATA.dimensions.socialHighlights.map(h => (
                    <span key={h} className={`text-[11px] px-3 py-1 rounded-full border ${
                      isGeek ? 'bg-slate-800 border-slate-700 text-blue-300' : 'bg-white border-pink-200 text-pink-600 shadow-sm'
                    }`}>
                      # {h}
                    </span>
                  ))}
                </div>
              </section>

              <section className={`p-6 rounded-2xl border-2 transition-all ${
                isGeek ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-blue-400 bg-white shadow-xl'
              }`}>
                <p className="text-sm leading-relaxed">
                  <span className="text-lg mr-2 font-bold">💡</span>
                  <strong>{isGeek ? '系统结论：' : '达人建议：'}</strong>
                  {MOCK_DATA.suggestion}
                </p>
              </section>
            </div>
          </div>
        </div>

        <p className="text-center mt-8 text-[10px] opacity-40 uppercase tracking-[0.2em]">
          Powered by Adventure Team Engine • 2026
        </p>
      </div>
    </div>
  );
}