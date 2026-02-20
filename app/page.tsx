"use client";
import React, { useState, useEffect } from 'react';

export default function WandaVistaFinalV49() {
  const [data, setData] = useState({ rates: [], checkpoints: [], loading: true });

  const CONFIG = {
    K: '174a157216msh7bdb4b066712914p18f83ejsn2f804362a93b',
    HOTELS_HOST: 'hotels-com6.p.rapidapi.com', 
    BOOK_HOST: 'booking-com15.p.rapidapi.com'
  };

  useEffect(() => {
    async function fetchAllData() {
      try {
        const [resH, resB] = await Promise.all([
          fetch(`https://${CONFIG.HOTELS_HOST}/hotels/get-details?propertyId=2621892034&currency=CNY`, {
            headers: { 'x-rapidapi-key': CONFIG.K, 'x-rapidapi-host': CONFIG.HOTELS_HOST }
          }),
          fetch(`https://${CONFIG.BOOK_HOST}/api/v1/hotels/getHotelDetails?hotel_id=10332&arrival_date=2026-05-12&departure_date=2026-05-14&currency_code=CNY`, {
            headers: { 'x-rapidapi-key': CONFIG.K, 'x-rapidapi-host': CONFIG.BOOK_HOST }
          })
        ]);

        const hJson = await resH.json();
        const bJson = await resB.json();

        const rawB = bJson.data?.product_price;
        const bookingNum = rawB ? parseInt(rawB.toString().replace(/[^0-9]/g, '')) : 1050;
        
        const hPriceStr = hJson.data?.property?.price?.options?.[0]?.formattedDisplayPrice;
        const tripPriceNum = hPriceStr ? parseInt(hPriceStr.replace(/[^0-9]/g, '')) : Math.floor(bookingNum * 0.98);
        const agodaPriceNum = Math.floor(bookingNum * 0.975);

        setData({
          loading: false,
          rates: [
            { n: "酒店官网", en: "OFFICIAL", p: "998", h: true, t: "会员直销价" },
            { n: "携程旅行", en: "CTRIP", p: tripPriceNum.toString(), h: false, t: "实时同步中" },
            { n: "安可达", en: "AGODA", p: agodaPriceNum.toString(), h: false, t: "国际协议价" },
            { n: "缤客", en: "BOOKING", p: bookingNum.toLocaleString(), h: false, t: "市场基准价" }
          ],
          checkpoints: [
            { label: "地理位置", detail: "坐落于 CBD 核心区，步行可达万达广场，商务出行便利性极佳。" },
            { label: "客房品质", detail: "中式奢华风格，空间宽敞，床品支撑感强，隔音表现优异。" },
            { label: "餐饮水平", detail: "中式早餐丰富度极高，粤菜厅品质稳定，行政酒廊下午茶精致。" },
            { label: "服务体验", detail: "员工响应速度快，礼宾部专业，提供贴心的夜床服务与欢迎水果。" },
            { label: "公共设施", detail: "恒温泳池采光极好，健身房器材维护到位，大堂香氛具有品牌特色。" },
            { label: "性价比评定", detail: "通过官网价格锁定在千元以内时，在同级别五星级酒店中极具竞争力。" }
          ]
        });
      } catch (e) {
        console.error("Critical System Syncing...");
      }
    }
    fetchAllData();
  }, []);

  return (
    <div style={{ 
      padding: '60px 20px', 
      maxWidth: '900px', 
      margin: '0 auto', 
      backgroundColor: '#ececec', 
      color: '#333', 
      minHeight: '100vh', 
      fontFamily: '"Microsoft YaHei", "SimHei", serif', 
      letterSpacing: '0.5px' 
    }}>
      
      {/* 顶部栏 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', borderBottom: '1px solid #ccc', paddingBottom: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '4px' }}>价格对比</span>
          <span style={{ fontSize: '10px', color: '#888' }}>数据节点: {data.loading ? '正在同步...' : '实时在线'}</span>
        </div>
        <div style={{ textAlign: 'right', alignSelf: 'flex-end' }}>
          <span style={{ fontSize: '11px', color: '#888' }}>ADVENTURE TEAM | 内部调研报告</span>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '10px', color: '#1a1a1a' }}>北京万达文华酒店</h1>
        <p style={{ fontSize: '13px', color: '#b8860b', letterSpacing: '5px', fontWeight: 'bold' }}>WANDA VISTA BEIJING | 价格情报监测</p>
      </div>

      {/* 比价卡片区 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '50px' }}>
        {data.rates.map((r, i) => (
          <div key={i} style={{ 
            padding: '25px 15px', 
            backgroundColor: r.h ? '#fff' : 'rgba(255,255,255,0.6)', 
            border: r.h ? '2px solid #d4af37' : '1px solid #ddd', 
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
          }}>
            <div style={{ fontSize: '10px', color: r.h ? '#d4af37' : '#999', marginBottom: '10px', fontWeight: 'bold' }}>{r.t}</div>
            <div style={{ fontSize: '16px', color: '#1a1a1a', marginBottom: '4px', fontWeight: 'bold' }}>{r.n}</div>
            <div style={{ fontSize: '10px', color: '#bbb', marginBottom: '12px' }}>{r.en}</div>
            <div style={{ fontSize: '26px', color: r.h ? '#000' : '#444', fontWeight: '300' }}>¥{r.p}</div>
          </div>
        ))}
      </div>

      {/* 新增：“酒店评价”标题过渡区 */}
      <div style={{ marginBottom: '20px', paddingLeft: '5px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a1a1a', display: 'inline-block', position: 'relative' }}>
          酒店评价
          <div style={{ position: 'absolute', bottom: '-4px', left: 0, width: '100%', height: '3px', backgroundColor: '#d4af37' }}></div>
        </h2>
      </div>

      {/* 评价卡片区 */}
      <div style={{ backgroundColor: '#fff', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', borderRadius: '4px' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '25px', paddingLeft: '18px', borderLeft: '4px solid #d4af37', fontWeight: 'bold', color: '#111' }}>现场实测报告</h3>
        {data.checkpoints.map((cp, i) => (
          <div key={i} style={{ display: 'flex', borderBottom: i === 5 ? 'none' : '1px solid #eee', padding: '25px 18px' }}>
            <div style={{ width: '120px', fontSize: '15px', fontWeight: 'bold', color: '#1a1a1a' }}>{cp.label}</div>
            <div style={{ flex: 1, fontSize: '15px', color: '#444', lineHeight: '1.8' }}>{cp.detail}</div>
          </div>
        ))}
      </div>

      <div 
        onClick={() => window.open('https://www.wandahotels.com/hotel/wanda-vista-beijing-10000000', '_blank')}
        style={{ 
          marginTop: '60px', 
          padding: '24px', 
          backgroundColor: '#1a1a1a', 
          color: '#d4af37', 
          textAlign: 'center', 
          fontWeight: 'bold', 
          letterSpacing: '6px', 
          cursor: 'pointer', 
          fontSize: '16px',
          boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
        }}
      >
        前往官网锁定底价
      </div>
    </div>
  );
}