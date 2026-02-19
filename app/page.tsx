"use client";

import React, { useState } from 'react';
import { Shield, Zap, Info, Star } from 'lucide-react';

export default function HotelPage() {
  // 遵循 [2026-01-24] 的要求：添加口音偏好选择逻辑
  const [accent, setAccent] = useState('Explorer');

  const data = {
    name: "北京万达文华酒店",
    stars: 5,
    // 更新为四个全球主流平台，包括 Expedia
    prices: [
      { platform: "携程", price: "1580" },
      { platform: "美团", price: "1520" },
      { platform: "Booking", price: "1610" },
      { platform: "Expedia", price: "1625" }
    ],
    minimal: {
      location: "CBD核心区，双地铁交汇",
      service: "前台响应极快，礼宾主动性强",
      hardware: "老牌奢华风，维护痕迹明显"
    },
    highlights: {
      Geek: [
        "冗余度分析：中央空调系统虽旧，但制冷泵数充足，高层震动控制在合理分贝。",
        "响应延迟：客房服务响应中值约 3.8 分钟，优于同地段均值。",
        "硬件衰减：地毯磨损率约 15%，但不影响结构性舒适度。"
      ],
      Explorer: [
        "清晨的第一缕阳光会穿透CBD的雾霭，洒在老牌大理石地面上，很有归属感。",
        "如果你喜欢复古的浪漫，这里的厚重感会让你觉得时光倒流。",
        "哪怕只是下楼取外卖，礼宾的点头示意也充满了老派绅士的温度。"
      ]
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#d4af37] p-4 font-sans">
      <style jsx global>{`
        body { background-color: #0a0a0a; margin: 0; }
        .card { background: #1a1a1a; border: 1px solid #333; border-radius: 12px; padding: 20px; margin-bottom: 16px; }
        .btn-active { background: #d4af37; color: #000; font-weight: bold; }
        .btn-inactive { border: 1px solid #d4af37; color: #d4af37; opacity: 0.5; }
      `}</style>

      {/* 偏好选择按钮 */}
      <div className="flex justify-center gap-3 mb-8">
        {['Geek', 'Explorer'].map((mode) => (
          <button
            key={mode}
            onClick={() => setAccent(mode)}
            className={`px-6 py-2 rounded-full text-xs transition-all ${accent === mode ? 'btn-active' : 'btn-inactive'}`}
          >
            {mode === 'Geek' ? '🤓 GEEK ACCENT' : '🧭 EXPLORER ACCENT'}
          </button>
        ))}
      </div>

      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-1 tracking-tight">{data.name}</h1>
        <div className="flex gap-1 mb-6">
          {[...Array(data.stars)].map((_, i) => <Star key={i} size={14} fill="#d4af37" />)}
        </div>

        {/* 上部分：极简版汇总 (固定显示) */}
        <div className="card shadow-2xl border-t border-t-[#333]">
          <div className="flex items-center gap-2 mb-4 text-white font-bold text-sm uppercase tracking-wider">
            <Zap size={16} className="text-yellow-500" />
            <span>极简快讯 / Minimalist</span>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-[#222] pb-1">
              <span className="opacity-60">地理位置</span>
              <span className="text-gray-200">{data.minimal.location}</span>
            </div>
            <div className="flex justify-between border-b border-[#222] pb-1">
              <span className="opacity-60">服务评价</span>
              <span className="text-gray-200">{data.minimal.service}</span>
            </div>
            <div className="flex justify-between border-b border-[#222] pb-1">
              <span className="opacity-60">硬件设施</span>
              <span className="text-gray-200">{data.minimal.hardware}</span>
            </div>
          </div>
        </div>

        {/* 下部分：深度亮点 (随口音逻辑变化) */}
        <div className="card border-t border-t-[#333]">
          <div className="flex items-center gap-2 mb-4 text-white font-bold text-sm uppercase tracking-wider">
            <Shield size={16} className="text-blue-500" />
            <span>深度亮点 / Deep Insights</span>
          </div>
          <ul className="space-y-4">
            {(accent === 'Geek' ? data.highlights.Geek : data.highlights.Explorer).map((item, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-gray-400 italic font-light">
                <Info size={14} className="mt-1 flex-shrink-0 text-[#d4af37] opacity-70" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* 价格栏：4个平台（含 Expedia） */}
        <div className="grid grid-cols-4 gap-2">
          {data.prices.map((p, i) => (
            <div key={i} className="bg-[#151515] py-3 px-1 rounded-lg border border-[#222] text-center shadow-inner">
              <div className="text-[9px] text-gray-500 mb-1 uppercase font-bold">{p.platform}</div>
              <div className="text-xs font-bold text-white">¥{p.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}