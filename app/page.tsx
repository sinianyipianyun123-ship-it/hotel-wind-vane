"use client";
import React, { useState, useEffect } from 'react';

export default function WandaVistaDomestic() {
  const [data, setData] = useState({ rates: [], loading: true });

  // 1. 实名翻译映射
  const nameMap = {
    "Trip.com": "携程(国际)",
    "Agoda": "安可达",
    "Expedia": "Expedia",
    "Booking.com": "缤客"
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://air-scraper.p.rapidapi.com/api/v1/hotels/searchHotels?entityId=47031935&checkin=2026-03-12&checkout=2026-03-14`;
      try {
        const res = await fetch(url, {
          method: 'GET',
          headers: { 
            'x-rapidapi-key': '这里填入你的_RAPIDAPI_KEY', // 请填入你自己的 Key
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
              price: `￥${Math.round(r.price * 7.2)}` // 汇率换算
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

  if (data.loading) return <div style={{textAlign:'center', padding:'100px', color:'#999'}}>数据同步中...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Microsoft YaHei, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      
      {/* 头部标题 */}
      <div style={{ color: '#c00', fontSize: '14px', fontWeight: 'bold', marginBottom: '20px' }}>● 全渠道价格实时指数 (实名制)</div>

      {/* 2. 价格格子区 (解决格子不显示问题) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '30px' }}>
        {data.rates.map((item, index) => (
          <div key={index} style={{ padding: '15px', borderRadius: '12px', backgroundColor: '#fff', border: item.isOfficial ? '2px solid #b8974d' : '1px solid #eee', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '12px', color: '#888' }}>{item.name}</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '5px', color: item.isOfficial ? '#b8974d' : '#333' }}>{item.price}</div>
          </div>
        ))}
      </div>

      {/* 3. 位置评价 - 极简版 (解决文字光秃秃问题) */}
      <div style={{ marginBottom: '25px' }}>
        <div style={{ color: '#c00', fontWeight: 'bold', marginBottom: '10px', fontSize: '15px' }}>📍 位置 (极简总结)</div>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #eee', fontSize: '14px', lineHeight: '1.6', color: '#444' }}>
          CBD 核心 / 紧邻 SKP / 长安街一线视野 / 轨交直达
        </div>
      </div>

      {/* 4. 硬件评价 - 深度点评 (解决文字光秃秃问题) */}
      <div>
        <div style={{ color: '#b8974d', fontWeight: 'bold', marginBottom: '10px', fontSize: '15px' }}>⌨️ 硬件设施 (深度点评)</div>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #eee', fontSize: '14px', lineHeight: '1.8', color: '#555' }}>
          酒店整体呈现经典的老牌奢华质感，建筑结构极稳。超高层客房在大风天气下依然静谧，其石材与木质细节的质感远超现代网红酒店。
        </div>
      </div>

    </div>
  );
}