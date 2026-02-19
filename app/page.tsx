"use client";

import React from 'react';
import { Shield, Zap, Star, CreditCard, CheckCircle, Search, MessageCircle, Instagram, Info } from 'lucide-react';

export default function HotelPage() {
  const data = {
    name: "北京万达文华酒店",
    stars: 5,
    prices: [
      { platform: "携程", price: "980" },
      { platform: "美团", price: "956" },
      { platform: "Booking", price: "1020" },
      { platform: "Agoda", price: "998" },
      { platform: "Expedia", price: "1015" }
    ],
    // 聚合评价库：来自你的三位一体分析法 [cite: 24-01-24]
    reviews: [
      { source: 'Google', icon: <Search size={14}/>, color: '#4285F4', text: "硬件素质扎实，客房宽敞，但插座分布和电子设备带有明显的年代感。[cite: 24-01-24]" },
      { source: 'Ctrip', icon: <MessageCircle size={14}/>, color: '#0086F8', text: "服务专业且厚道，前台常主动升房，早餐的淮扬菜系极受好评。[cite: 24-01-24]" },
      { source: 'Meituan', icon: <Zap size={14}/>, color: '#FFD000', text: "CBD核心区难得的千元以下（促销时）五星旗舰，适合商务性价比。[cite: 24-01-24]" },
      { source: '小红书', icon: <Instagram size={14}/>, color: '#FF2442', text: "中式奢华氛围出片率极高，高层270度落日视角是绝佳机位。[cite: 24-01-24]" }
    ],
    summary: "融合Google的硬核反馈与国内平台的细节，这是CBD区域性价比与服务温度的最佳平衡点。[cite: 24-01-24]"
  };

  const cardStyle = { backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '12px', padding: '20px', marginBottom: '15px' };

  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#d4af37', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        
        {/* 1. 标题区：强化文字质感 */}
        <div style={{ borderBottom: '1px solid #333', paddingBottom: '20px', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '32px', margin: '0 0 8px 0', color: '#fff', fontWeight: 'bold', letterSpacing: '1px' }}>{data.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '2px' }}>
              {[...Array(data.stars)].map((_, i) => <Star key={i} size={16} fill="#d4af37" color="#d4af37" />)}
            </div>
            <span style={{ color: '#666', fontSize: '14px', marginLeft: '10px' }}>Luxury Standard</span>
          </div>
        </div>

        {/* 2. 5 平台比价：全包含税版 [cite: 24-01-24] */}
        <div style={{ marginBottom: '35px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontSize: '13px', fontWeight: 'bold' }}>
              <CreditCard size={16} color="#d4af37" /> <span>实时比价 / PRICE CHECK</span>
            </div>
            <div style={{ color: '#00ff00', fontSize: '11px', fontWeight: '500' }}>● 含税全包价 [cite: 24-01-24]</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
            {data.prices.map((p, i) => (
              <div key={i} style={{ backgroundColor: '#111', padding: '15px 5px', borderRadius: '10px', border: '1px solid #d4af3722', textAlign: 'center' }}>
                <div style={{ color: '#888', fontSize: '10px', marginBottom: '6px' }}>{p.platform}</div>
                <div style={{ fontSize: '15px', color: '#fff', fontWeight: 'bold' }}>¥{p.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. 全渠道情报汇总：你的核心竞争力 [cite: 24-01-24] */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '25px', color: '#fff', fontWeight: 'bold', fontSize: '15px' }}>
            <Shield size={20} color="#3b82f6" /> <span>全球洞察汇总 / GLOBAL INSIGHTS</span>
          </div>
          {data.reviews.map((rev, i) => (
            <div key={i} style={{ display: 'flex', gap: '15px', marginBottom: '22px', fontSize: '14px', lineHeight: '1.7' }}>
              <div style={{ 
                display: 'flex', alignItems: 'center', gap: '6px', 
                backgroundColor: rev.color + '15', color: rev.color, 
                padding: '4px 10px', borderRadius: '6px', height: 'fit-content', 
                fontSize: '11px', fontWeight: 'bold', border: `1px solid ${rev.color}33`,
                minWidth: '80px', justifyContent: 'center' 
              }}>
                {rev.source}
              </div>
              <span style={{ color: '#ccc' }}>{rev.text}</span>
            </div>
          ))}
        </div>

        {/* 4. 最终总结建议 [cite: 24-01-24] */}
        <div style={{ ...cardStyle, border: '1px solid #d4af3744', background: 'linear-gradient(145deg, #1a1a1a, #0d0d0d)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#fff', fontWeight: 'bold', fontSize: '15px' }}>
            <Info size={20} color="#d4af37" /> <span>决策建议 / FINAL VERDICT</span>
          </div>
          <p style={{ color: '#fff', fontSize: '14px', fontStyle: 'italic', margin: 0, lineHeight: '1.8' }}>
            "{data.summary}"
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '11px', color: '#333', letterSpacing: '2px' }}>
          DATA INTEGRATION: GOOGLE / CTRIP / MEITUAN / RED
        </div>
      </div>
    </div>
  );
}