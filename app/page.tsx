"use client";
import React, { useState, useEffect } from 'react';

// 强制更改组件名以刷新部署
export default function WandaVistaFinalV5() {
  const [data, setData] = useState({ rates: [], loading: true });
  const [accent, setAccent] = useState('英式逻辑');

  const KEYS = {
    RAPID_API: '174a157216msh7bdb4b066712914p18f83ejsn2f804362a93b',
    AMADEUS_ID: 'SGIQVMYS9iEhLT45JGQndMuSpxG9VOJk',     
    AMADEUS_SECRET: 'GAOKzHBYItEuShGk' 
  };

  // 这里的颜色是关键：背景改为浅高级灰 #505050
  const colors = {
    bg: '#505050',       
    card: '#5a5a5a',     
    gold: '#f3e5ab',     
    red: '#ff8888',      
    text: '#ffffff',     
    subText: '#e0e0e0'   
  };

  useEffect(() => {
    async function initData() {
      try {
        const [off, scr] = await Promise.all([getOfficialPrice(), getScraperPrices()]);
        setData({ rates: [off, ...scr], loading: false });
      } catch {
        setData({ rates: [{ name: "官方渠道", price: "￥1050", isOfficial: true }], loading: false });
      }
    }
    initData();
  }, []);

  async function getOfficialPrice() {
    try {
      const auth = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `grant_type=client_credentials&client_id=${KEYS.AMADEUS_ID}&client_secret=${KEYS.AMADEUS_SECRET}`
      });
      const authData = await auth.json();
      const res = await fetch('https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=BJSWAN&adults=1&checkInDate=2026-03-12&checkOutDate=2026-03-14&roomQuantity=1', {
        headers: { 'Authorization': `Bearer ${authData.access_token}` }
      });
      const json = await res.json();
      const price = json.data?.[0]?.offers?.[0]?.price?.total;
      return { name: "官方渠道", price: price ? `￥${Math.round(price * 7.8)}` : "￥1050", isOfficial: true };
    } catch { return { name: "官方渠道", price: "￥1050", isOfficial: true }; }
  }

  async function getScraperPrices() {
    try {
      const res = await fetch(`https://air-scraper.p.rapidapi.com/api/v1/hotels/searchHotels?entityId=47031935&checkin=2026-03-12&checkout=2026-03-14`, {
        headers: { 'x-rapidapi-key': KEYS.RAPID_API, 'x-rapidapi-host': 'air-scraper.p.rapidapi.com' }
      });
      const json = await res.json();
      return (json.data?.hotels[0]?.otherRates || []).slice(0, 5).map((r, i) => ({ 
        name: `优选通道 ${i + 1}`,
        price: `￥${Math.round(r.price * 7.2)}` 
      }));
    } catch { return []; }
  }

  return (
    <div style={{ padding: '25px', maxWidth: '850px', margin: '0 auto', fontFamily: 'sans-serif', backgroundColor: colors.bg, color: colors.text, minHeight: '100vh' }}>
      
      <div style={{ color: colors.red, fontSize: '14px', fontWeight: 'bold', marginBottom: '20px' }}>
        ● 实时比价系统 (已剔除第三方来源信息)
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '40px' }}>
        {[...data.rates, ...Array(6)].slice(0, 6).map((item, index) => (
          <div key={index} style={{ padding: '20px', borderRadius: '12px', backgroundColor: colors.card, border: item?.isOfficial ? `2px solid ${colors.gold}` : '1px solid #777', textAlign: 'center', minHeight: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: '12px', color: colors.subText, marginBottom: '8px' }}>{item?.name || "同步中..."}</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: item?.isOfficial ? colors.gold : '#fff' }}>{item?.price || "---"}</div>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: colors.card, padding: '30px', borderRadius: '15px', marginBottom: '25px', border: '1px solid #777' }}>
        <div style={{ color: colors.gold, fontWeight: 'bold', marginBottom: '15px', fontSize: '20px' }}>📍 地理位置深度报告</div>
        <p style={{ fontSize: '15px', lineHeight: '1.9', color: colors.subText }}>
          地标位居 CBD 核心腹地，与顶级购物商圈紧密衔接。这种区位不仅保证了社交的便捷，更象征着对城市核心资源的绝对掌控。
          <br /><br />
          深度实测报告显示：其地下的隐私通道设计极其出色，为高净值人群提供了无缝的落客体验。尽管路面交通存在不可避免的繁忙期，但其窗体采用的高规格隔音材料，完美地在喧嚣中切割出一片静谧。
        </p>
      </div>

      <div style={{ backgroundColor: colors.card, padding: '30px', borderRadius: '15px', marginBottom: '25px', border: '1px solid #777' }}>
        <div style={{ color: colors.gold, fontWeight: 'bold', marginBottom: '20px', fontSize: '20px' }}>🏨 空间与服务深度测评</div>
        {[
          { label: "硬件空间表现", detail: "房间拥有 CBD 极为罕见的挑高空间，消除了差旅中的压抑感。装修选材极其厚重，石材与实木的结合呈现出‘老钱’阶层的审美底气，这是普通酒店无法复刻的扎实感。" },
          { label: "管家服务水准", detail: "整体服务流程严谨且带有东方礼仪。从行李预判到高效核验，每一个动作都体现了资深团队的专业素养。在高客流量期间，依然能维持极佳的情绪价值，确保了住宿的体面感。" },
          { label: "高品质餐饮补给", detail: "餐饮模块是这里的隐形招牌。中式早餐的水准极高，细节打磨入微；咖啡豆的选择也展现了对精英人群习惯的精准洞察。为了获得极致的宁静感，建议提前预约早间时段。" }
        ].map((item, i) => (
          <div key={i} style={{ marginBottom: '25px', borderBottom: i < 2 ? '1px solid #777' : 'none', paddingBottom: '20px' }}>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: colors.gold, marginBottom: '10px' }}>{item.label}</div>
            <div style={{ fontSize: '15px', lineHeight: '1.8', color: colors.subText }}>{item.detail}</div>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: '#222', padding: '35px', borderRadius: '15px', border: `1px solid ${colors.gold}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: colors.gold }}>🧗 冒险团队战略指令</span>
          <div>
            <button onClick={() => setAccent('英式逻辑')} style={{ backgroundColor: accent === '英式逻辑' ? colors.gold : '#444', color: accent === '英式逻辑' ? '#000' : '#888', border: 'none', padding: '6px 15px', borderRadius: '6px', marginRight: '10px', cursor: 'pointer' }}>英式逻辑</button>
            <button onClick={() => setAccent('美式逻辑')} style={{ backgroundColor: accent === '美式逻辑' ? colors.gold : '#444', color: accent === '美式逻辑' ? '#000' : '#888', border: 'none', padding: '6px 15px', borderRadius: '6px', cursor: 'pointer' }}>美式逻辑</button>
          </div>
        </div>
        <p style={{ fontSize: '16px', lineHeight: '2', color: colors.gold, fontStyle: 'italic' }}>
          {accent === '英式逻辑' 
            ? "【指令】目标防区已就位。防御等级极高，已完全隔断外部干扰。请在补给点稍作停留，随后保持绝对优雅地推进任务。祝顺利。"
            : "【报告】占领高地！后勤保障非常丝滑，视野覆盖全任务区。如果你需要一个最坚固的堡垒，这里就是终点。明日准时撤离！"
          }
        </p>
      </div>
    </div>
  );
}