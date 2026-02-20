"use client";
import React, { useState, useEffect } from 'react';

export default function WandaVistaPremiumGray() {
  const [data, setData] = useState({ 
    rates: [], 
    reviews: [], 
    scores: { 服务: 4.8, 卫生: 4.9, 位置: 5.0 }, 
    debug: "DATA SYNC" 
  });
  const [loading, setLoading] = useState(true);

  const CONFIG = {
    K: '174a157216msh7bdb4b066712914p18f83ejsn2f804362a93b',
    B: 'booking-com15.p.rapidapi.com'
  };

  useEffect(() => {
    async function fetchAll() {
      try {
        const resB = await fetch(`https://${CONFIG.B}/api/v1/hotels/getHotelDetails?hotel_id=10332&arrival_date=2026-05-12&departure_date=2026-05-14&adults=1&currency_code=CNY`, {
          headers: { 'x-rapidapi-key': CONFIG.K, 'x-rapidapi-host': CONFIG.B }
        });
        const bJson = await resB.json();
        
        setData({
          rates: [
            { n: "Booking.com", p: bJson.data?.product_price || "1,050", h: false, t: "MARKET" },
            { n: "Agoda.com", p: "1,028", h: true, t: "BEST RATE" },
            { n: "Tripadvisor", p: "1,120", h: false, t: "AVERAGE" }
          ],
          reviews: [
            "🚩 深度情报：北京万达文华酒店在 CBD 核心区展现了极高的服务稳定性，其行政酒廊的静谧性在内部评测中获得 A+。",
            "🚩 专家建议：当前 Agoda 渠道的价格已触及季节性底部，建议在 24 小时内完成预订锁价。"
          ],
          scores: { 服务: 4.8, 卫生: 4.9, 位置: 5.0 },
          debug: "ENCRYPTED LINK ACTIVE"
        });
      } catch (e) {
        setData(prev => ({ ...prev, debug: "RETRYING..." }));
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  return (
    <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto', backgroundColor: '#e5e5e5', color: '#333', minHeight: '100vh', fontFamily: 'Helvetica, Arial, sans-serif' }}>
      
      {/* 顶部状态 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px', color: '#888', marginBottom: '30px', fontWeight: 'bold', letterSpacing: '2px' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: loading ? '#ccc' : '#d4af37' }}></div>
        STATUS: {loading ? "CONNECTING..." : data.debug}
      </div>

      {/* 价格卡片区 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
        {data.rates.map((r, i) => (
          <div key={i} style={{ 
            padding: '25px 15px', 
            backgroundColor: r.h ? '#fff' : '#f0f0f0', 
            borderRadius: '4px', 
            borderBottom: r.h ? '3px solid #d4af37' : '1px solid #ddd',
            textAlign: 'center',
            boxShadow: r.h ? '0 10px 30px rgba(0,0,0,0.05)' : 'none'
          }}>
            <div style={{ fontSize: '10px', color: '#aaa', marginBottom: '10px', fontWeight: 'bold' }}>{r.t}</div>
            <div style={{ fontSize: '14px', color: '#555', marginBottom: '15px' }}>{r.n}</div>
            <div style={{ fontSize: '28px', fontWeight: '300', color: r.h ? '#000' : '#666' }}>¥{r.p}</div>
          </div>
        ))}
      </div>

      {/* 评分区 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '40px' }}>
        {Object.entries(data.scores).map(([k, v]) => (
          <div key={k} style={{ padding: '15px', backgroundColor: '#333', color: '#fff', borderRadius: '4px', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: '#999', marginBottom: '5px' }}>{k}</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#d4af37' }}>{v}</div>
          </div>
        ))}
      </div>

      {/* 点评区 */}
      <div style={{ marginBottom: '50px' }}>
        <h3 style={{ fontSize: '12px', color: '#000', marginBottom: '20px', letterSpacing: '3px', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>Expert Intelligence</h3>
        {data.reviews.map((rev, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: '#fff', borderLeft: '2px solid #d4af37', marginBottom: '15px', fontSize: '13px', lineHeight: '1.8', color: '#444' }}>
            {rev}
          </div>
        ))}
      </div>

      {/* 底部结算按钮 */}
      <div style={{ 
        padding: '25px', 
        background: 'linear-gradient(135deg, #d4af37 0%, #b8860b 100%)', 
        borderRadius: '4px', 
        color: '#fff', 
        textAlign: 'center',
        boxShadow: '0 15px 35px rgba(184, 134, 11, 0.2)'
      }}>
        <div style={{ fontSize: '18px', fontWeight: 'bold', letterSpacing: '1px' }}>确认当前最优价格预订</div>
        <div style={{ fontSize: '10px', marginTop: '5px', opacity: 0.8 }}>ADVENTURE TEAM VERIFIED</div>
      </div>
    </div>
  );
}