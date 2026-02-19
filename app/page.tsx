"use client";

import React from 'react';
import { Shield, Zap, Info, Star, CreditCard } from 'lucide-react';

export default function HotelPage() {
  const data = {
    name: "北京万达文华酒店",
    stars: 5,
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
    combinedInsights: [
      "冗余度分析：中央空调系统虽旧但制冷泵数充足，高层震动控制优异。",
      "清晨的第一缕阳光会穿透CBD雾霭洒在石地面上，很有归属感。",
      "硬件衰减：地毯磨损率约 15%，但不影响结构性舒适度。",
      "哪怕只是下楼取外卖，礼宾的点头示意也充满了老派绅士的温度。"
    ]
  };

  const cardStyle = {
    backgroundColor: '#1a1a1a',
    border: '1px solid #333',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '15px'
  };

  const labelStyle = { color: '#888', fontSize: '11px', marginBottom: '4px', textTransform: 'uppercase' };
  const valueStyle = { color: '#fff', fontSize: '14px', fontWeight: '600' };

  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#d4af37', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        {/* 1. 酒店标题 */}
        <div style={{ marginBottom: '20px', textAlign: 'left' }}>
          <h1 style={{ fontSize: '24px', margin: '0 0 5px 0', color: '#fff' }}>{data.name}</h1>
          <div style={{ display: 'flex', gap: '2px' }}>
            {[...Array(data.stars)].map((_, i) => <Star key={i} size={14} fill="#d4af37" color="#d4af37" />)}
          </div>
        </div>

        {/* 2. 价格比价（顶置区） */}
        <div style={{ marginBottom: '25px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px', color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>
            <CreditCard size={14} color="#d4af37" /> <span>实时比价 / PRICE COMPARISON</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
            {data.prices.map((p, i) => (
              <div key={i} style={{ backgroundColor: '#111', padding: '12px 4px', borderRadius: '8px', border: '1px solid #d4af3744', textAlign: 'center' }}>
                <div style={labelStyle}>{p.platform}</div>
                <div style={{ fontSize: '13px', color: '#fff', fontWeight: 'bold' }}>¥{p.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. 极简快讯区 */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px', color: '#eab308', fontWeight: 'bold', fontSize: '13px' }}>
            <Zap size={16} /> <span>极简快讯 / MINIMALIST</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            <div><div style={labelStyle}>位置</div><div style={valueStyle}>CBD核心</div></div>
            <div><div style={labelStyle}>服务</div><div style={valueStyle}>响应极快</div></div>
            <div><div style={labelStyle}>硬件</div><div style={valueStyle}>老牌奢华</div></div>
          </div>
        </div>

        {/* 4. 深度亮点汇总（底部评价区） */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px', color: '#3b82f6', fontWeight: 'bold', fontSize: '13px' }}>
            <Shield size={16} /> <span>深度评价 / DEEP INSIGHTS</span>
          </div>
          {data.combinedInsights.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '12px', fontSize: '13px', color: '#ccc', lineHeight: '1.6' }}>
              <Info size={14} style={{ marginTop: '3px', flexShrink: 0, color: '#d4af37', opacity: 0.8 }} />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '10px', color: '#333' }}>
          Refreshed: Feb 2026 | Global Hub
        </div>
      </div>
    </div>
  );
}