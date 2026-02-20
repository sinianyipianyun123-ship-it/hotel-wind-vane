"use client";
import React, { useState, useEffect } from 'react';

export default function WandaVistaDomestic() {
  const [data, setData] = useState({ rates: [], loading: true });

  const nameMap = { "Trip.com": "携程(国际)", "Agoda": "安可达", "Booking.com": "缤客" };

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://air-scraper.p.rapidapi.com/api/v1/hotels/searchHotels?entityId=47031935&checkin=2026-03-12&checkout=2026-03-14`;
      try {
        const res = await fetch(url, {
          method: 'GET',
          headers: { 
            'x-rapidapi-key': '这里替换成你的_RAPIDAPI_KEY', // 👈 别忘了填你的 Key
            'x-rapidapi-host': 'air-scraper.p.rapidapi.com' 
          }
        });
        const json = await res.json();
        if (json.data && json.data.hotels[0]) {
          const apiRates = json.data.hotels[0].otherRates || [];
          const finalRates = [
            { name: "酒店官网", price: "￥1050", isOfficial: true },
            ...apiRates.slice(0, 5).map(r => ({ 
              name: nameMap[r.partnerName] || r.partnerName,
              price: `￥${Math.round(r.price * 7.2)}` 
            }))
          ];
          setData({ rates: finalRates, loading: false });
        } else {
          setData({ rates: [{ name: "官网", price: "￥1050", isOfficial: true }], loading: false });
        }
      } catch (e) { setData({ rates: [], loading: false }); }
    };
    fetchData();
  }, []);

  if (data.loading) return <div style={{textAlign:'center', padding:'100px', color:'#999'}}>正在同步实名比价数据...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Microsoft YaHei, sans-serif', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      
      {/* 标题 */}
      <div style={{ color: '#c00', fontSize: '13px', fontWeight: 'bold', marginBottom: '15px' }}>● 全渠道价格实时指数 (实名制)</div>

      {/* 价格格子：强制 3 列排布 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '30px' }}>
        {data.rates.map((item, index) => (
          <div key={index} style={{ padding: '15px', borderRadius: '12px', backgroundColor: '#fff', border: item.isOfficial ? '2px solid #b8974d' : '1px solid #eee', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '12px', color: '#888' }}>{item.name}</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '5px', color: item.isOfficial ? '#b8974d' : '#333' }}>{item.price}</div>
          </div>
        ))}
      </div>

      {/* 极简评价卡片 */}
      <div style={{ marginBottom: '25px', backgroundColor: '#fff', padding: '20px', borderRadius: '15px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <div style={{ color: '#c00', fontWeight: 'bold', marginBottom: '12px', borderLeft: '4px solid #c00', paddingLeft: '10px' }}>📍 位置 (极简总结)</div>
        <div style={{ fontSize: '14px', color: '#444', lineHeight: '1.6' }}>
          CBD 核心 / 紧邻 SKP / 长安街一线视野 / 轨交直达
        </div>
      </div>

      {/* 叙事评价卡片 */}
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <div style={{ color: '#b8974d', fontWeight: 'bold', marginBottom: '12px', borderLeft: '4px solid #b8974d', paddingLeft: '10px' }}>⌨️ 硬件设施 (深度点评)</div>
        <div style={{ fontSize: '14px', color: '#555', lineHeight: '1.8', fontStyle: 'italic' }}>
          酒店整体呈现经典的老牌奢华质感，建筑结构表现出卓越的稳定性。超高层房型在大风天气下依然静谧，其用料的扎实程度是现代网红酒店难以企及的。
        </div>
      </div>

    </div>
  );
}