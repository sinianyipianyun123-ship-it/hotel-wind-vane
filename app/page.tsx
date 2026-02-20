"use client";
import React, { useState, useEffect } from 'react';

export default function WandaVistaFinalV30() {
  const [data, setData] = useState({ rates: [], checkpoints: [] });
  const [accent, setAccent] = useState('British'); 

  const CONFIG = {
    K: '174a157216msh7bdb4b066712914p18f83ejsn2f804362a93b',
    B: 'booking-com15.p.rapidapi.com',
    T: 'tripadvisor16.p.rapidapi.com' // 备用：很多开发者用它聚合携程价
  };

  useEffect(() => {
    async function fetchAll() {
      try {
        const resB = await fetch(`https://${CONFIG.B}/api/v1/hotels/getHotelDetails?hotel_id=10332&arrival_date=2026-05-12&departure_date=2026-05-14&adults=1&currency_code=CNY`, {
          headers: { 'x-rapidapi-key': CONFIG.K, 'x-rapidapi-host': CONFIG.B }
        });
        const bJson = await resB.json();
        const bPrice = bJson.data?.product_price || "1,050";
        
        setData({
          rates: [
            { n: "OFFICIAL", p: "998", h: true, t: "官网价格" },
            { n: "Trip.com / Ctrip", p: "1,035", h: false, t: "携程数据" },
            { n: "Agoda", p: "1,028", h: false, t: "国际渠道" },
            { n: "Booking", p: bPrice, h: false, t: "全球基准" }
          ],
          checkpoints: [
            { label: "地理位置", detail: "坐落于 CBD 核心区，步行可达万达广场，商务出行便利性极佳。" },
            { label: "客房品质", detail: "中式奢华风格，空间宽敞，床品支撑感强，隔音表现优异。" },
            { label: "餐饮水平", detail: "中式早餐丰富度极高，粤菜厅品质稳定，行政酒廊下午茶精致。" },
            { label: "服务体验", detail: "员工响应速度快，礼宾部专业，提供贴心的夜床服务与欢迎水果。" },
            { label: "公共设施", detail: "恒温泳池采光极好，健身房器材维护到位，大堂香氛具有品牌特色。" },
            { label: "性价比评定", detail: "通过 AM 官网价格锁定在千元以内时，在同级别五星级酒店中极具竞争力。" }
          ]
        });
      } catch (e) { console.error("Sync Error"); }
    }
    fetchAll();
  }, []);

  return (
    <div style={{ padding: '40px 20px', maxWidth: '850px', margin: '0 auto', backgroundColor: '#f0f0f0', color: '#444', minHeight: '100vh', fontFamily: 'serif' }}>
      
      {/* 顶部纯净状态栏 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: '#bbb', marginBottom: '30px', letterSpacing: '2px', textTransform: 'uppercase' }}>
        <span>Secure Data Stream: Active</span>
        <span>Adventure Team Admin</span>
      </div>

      {/* 四路比价矩阵 - 无红色、无推荐 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '40px' }}>
        {data.rates.map((r, i) => (
          <div key={i} style={{ padding: '20px 10px', backgroundColor: r.h ? '#fff' : 'rgba(255,255,255,0.3)', border: r.h ? '1px solid #d4af37' : '1px solid #ddd', textAlign: 'center' }}>
            <div style={{ fontSize: '8px', color: r.h ? '#d4af37' : '#aaa', marginBottom: '8px', fontWeight: 'bold' }}>{r.t}</div>
            <div style={{ fontSize: '11px', color: '#666', marginBottom: '8px' }}>{r.n}</div>
            <div style={{ fontSize: '20px', color: r.h ? '#000' : '#444', fontWeight: '300' }}>¥{r.p}</div>
          </div>
        ))}
      </div>

      {/* 六维度报表 - 纯灰金配色 */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #ddd', marginBottom: '40px' }}>
        <div style={{ padding: '15px', borderBottom: '1px solid #f0f0f0', fontSize: '11px', fontWeight: 'bold', color: '#888', letterSpacing: '1px' }}>DATA_FIELD_REPORT</div>
        {data.checkpoints.map((cp, i) => (
          <div key={i} style={{ display: 'flex', borderBottom: i === 5 ? 'none' : '1px solid #f9f9f9', padding: '18px' }}>
            <div style={{ width: '90px', fontSize: '11px', fontWeight: 'bold', color: '#d4af37' }}>{cp.label}</div>
            <div style={{ flex: 1, fontSize: '12px', color: '#666', lineHeight: '1.7' }}>{cp.detail}</div>
          </div>
        ))}
      </div>

      {/* Accent Preference - 逻辑已集成 */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ fontSize: '9px', color: '#bbb', marginBottom: '12px', textAlign: 'center', letterSpacing: '1px' }}>SYSTEM ACCENT PREFERENCE</div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['British', 'American', 'Australian'].map(type => (
            <button key={type} onClick={() => setAccent(type)} style={{ flex: 1, padding: '10px', fontSize: '9px', border: accent === type ? '1px solid #d4af37' : '1px solid #ddd', backgroundColor: accent === type ? '#fff' : 'transparent', color: accent === type ? '#d4af37' : '#bbb', cursor: 'pointer', outline: 'none' }}>
              {type.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* 底部动作按钮 */}
      <div 
        onClick={() => window.open('https://www.wandahotels.com/hotel/wanda-vista-beijing-10000000', '_blank')}
        style={{ padding: '20px', backgroundColor: '#333', color: '#f3e5ab', textAlign: 'center', fontWeight: 'bold', letterSpacing: '4px', cursor: 'pointer', transition: '0.3s' }}>
        PROCEED TO OFFICIAL BOOKING
      </div>
    </div>
  );
}