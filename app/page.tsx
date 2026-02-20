"use client";
import React, { useState, useEffect } from 'react';

export default function WandaVistaFinal() {
  const [data, setData] = useState({ rates: [], loading: true });

  useEffect(() => {
    const fetchData = async () => {
      // 使用你跑通的 RapidAPI 配置
      const url = `https://air-scraper.p.rapidapi.com/api/v1/hotels/searchHotels?entityId=47031935&checkin=2026-03-12&checkout=2026-03-14`;
      try {
        const res = await fetch(url, {
          method: 'GET',
          headers: { 
            'x-rapidapi-key': '你的_RAPIDAPI_KEY', // 这里请填入你自己的 Key
            'x-rapidapi-host': 'air-scraper.p.rapidapi.com' 
          }
        });
        const json = await res.json();
        if (json.data && json.data.hotels[0]) {
          const apiRates = json.data.hotels[0].otherRates || [];
          const finalRates = [
            { name: "酒店官网", price: "￥1050", isOfficial: true },
            ...apiRates.slice(0, 5).map(r => ({ name: r.partnerName, price: r.price }))
          ];
          setData({ rates: finalRates, loading: false });
        }
      } catch (e) { setData({ rates: [], loading: false }); }
    };
    fetchData();
  }, []);

  if (data.loading) return <div style={{textAlign:'center', padding:'100px'}}>同步全球比价中...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1100px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#c00', marginBottom: '15px' }}>● 全渠道价格实时指数</div>
      
      {/* 实名格子区 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px', marginBottom: '40px' }}>
        {data.rates.map((item, index) => (
          <div key={index} style={{ padding: '15px', borderRadius: '10px', textAlign: 'center', backgroundColor: '#fff', border: item.isOfficial ? '2px solid #b8974d' : '1px solid #eee' }}>
            <div style={{ fontSize: '11px', color: '#888', fontWeight: 'bold' }}>{item.name}</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '5px' }}>{item.price}</div>
          </div>
        ))}
      </div>

      {/* 极简总结 */}
      <div style={{ color: '#c00', fontWeight: 'bold', borderLeft: '4px solid #c00', paddingLeft: '10px', marginBottom: '10px' }}>📍 位置 (极简版)</div>
      <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px', fontSize: '14px', marginBottom: '30px' }}>
        CBD 核心 / 紧邻 SKP / 长安街一线视野 / 轨交直达
      </div>

      {/* 风格总结 */}
      <div style={{ color: '#b8974d', fontWeight: 'bold', borderLeft: '4px solid #b8974d', paddingLeft: '10px', marginBottom: '10px' }}>⌨️ 硬件 (风格版)</div>
      <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', border: '1px solid #eee', fontStyle: 'italic', lineHeight: '1.6' }}>
        整体呈现经典的老牌奢华质感，建筑结构表现出卓越的稳定性，超高层房型在风天依然静谧，是商务出行的不二之选。
      </div>
    </div>
  );
}