"use client";
import React, { useState, useEffect } from 'react';

export default function AdventureTeamFullAI_V54() {
  const [stage, setStage] = useState('search'); 
  const [inputText, setInputText] = useState('');
  const [data, setData] = useState({ rates: [], checkpoints: [] });

  useEffect(() => {
    setData({
      rates: [
        { n: "酒店官网", en: "OFFICIAL", p: "998", h: true, t: "会员直销价" },
        { n: "携程旅行", en: "CTRIP", p: "1029", h: false, t: "实时同步中" },
        { n: "安可达", en: "AGODA", p: "1023", h: false, t: "国际协议价" },
        { n: "缤客", en: "BOOKING", p: "1,050", h: false, t: "市场基准价" }
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
  }, []);

  const handleSearch = () => {
    if (inputText.includes("万达") || inputText.includes("北京")) {
      setStage('loading');
      setTimeout(() => setStage('report'), 1200);
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', fontFamily: '"Microsoft YaHei", sans-serif', color: '#333' }}>
      
      {/* 搜索入口 */}
      {stage === 'search' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', padding: '0 20px' }}>
          <div style={{ width: '100%', maxWidth: '700px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>✨ Hi cui</h2>
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '40px' }}>Where should we start?</h1>
            <div style={{ backgroundColor: '#fff', borderRadius: '32px', padding: '12px 24px', display: 'flex', alignItems: 'center', boxShadow: '0 8px 30px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
              <input autoFocus value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} placeholder="Ask Adventure Team 3..." style={{ flex: 1, border: 'none', outline: 'none', fontSize: '18px', padding: '10px' }} />
              <div style={{ display: 'flex', gap: '20px', color: '#888', fontSize: '20px' }}>
                <span style={{ cursor: 'pointer' }}>🎙️</span>
                <span style={{ cursor: 'pointer', color: '#d4af37', fontWeight: 'bold' }} onClick={handleSearch}>➔</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 报告页面 */}
      {stage === 'report' && (
        <div style={{ padding: '60px 20px', maxWidth: '900px', margin: '0 auto', animation: 'fadeIn 0.8s ease' }}>
          
          <button onClick={() => setStage('search')} style={{ marginBottom: '30px', padding: '8px 20px', borderRadius: '20px', border: '1px solid #ddd', backgroundColor: '#fff', cursor: 'pointer', fontSize: '13px' }}>← 返回搜索</button>

          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h1 style={{ fontSize: '38px', fontWeight: 'bold', marginBottom: '8px' }}>北京万达文华酒店</h1>
            <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>价格对比</div>
            <p style={{ fontSize: '13px', color: '#b8860b', letterSpacing: '5px', fontWeight: 'bold' }}>WANDA VISTA BEIJING | 每晚实时房价</p>
          </div>

          {/* 价格对比矩阵 - 加入每晚标注 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '50px' }}>
            {data.rates.map((r, i) => (
              <div key={i} style={{ padding: '25px 15px', backgroundColor: r.h ? '#fff' : 'rgba(255,255,255,0.6)', border: r.h ? '2px solid #d4af37' : '1px solid #ddd', textAlign: 'center' }}>
                <div style={{ fontSize: '10px', color: r.h ? '#d4af37' : '#999', marginBottom: '10px', fontWeight: 'bold' }}>{r.t}</div>
                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{r.n}</div>
                <div style={{ fontSize: '10px', color: '#bbb', marginBottom: '12px' }}>{r.en}</div>
                <div style={{ fontSize: '26px', fontWeight: '300', display: 'flex', justifyContent: 'center', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '16px', marginRight: '2px' }}>¥</span>
                  {r.p}
                  <span style={{ fontSize: '11px', color: '#888', marginLeft: '4px', fontWeight: 'normal' }}>/晚</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: '#fff', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', borderRadius: '4px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '25px', paddingLeft: '18px', borderLeft: '4px solid #d4af37', fontWeight: 'bold' }}>现场实测报告</h3>
            
            {/* AI 总结 - 强化价格单位 */}
            <div style={{ padding: '20px', backgroundColor: '#fdfaf2', marginBottom: '30px', borderRadius: '4px', border: '1px dashed #d4af37' }}>
               <span style={{ fontWeight: 'bold', color: '#b8860b' }}>AI 总结：</span>
               <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#111' }}> 酒店目前官网起售价 ¥998/晚，相较于第三方平台具有约 3% - 5% 的直销优势。建议通过官网锁定底价。</span>
            </div>

            {data.checkpoints.map((cp, i) => (
              <div key={i} style={{ display: 'flex', borderBottom: '1px solid #eee', padding: '25px 18px' }}>
                <div style={{ width: '120px', fontSize: '15px', fontWeight: 'bold' }}>{cp.label}</div>
                <div style={{ flex: 1, fontSize: '15px', color: '#444', lineHeight: '1.8' }}>{cp.detail}</div>
              </div>
            ))}
          </div>

          <div onClick={() => window.open('https://www.wandahotels.com/hotel/wanda-vista-beijing-10000000', '_blank')}
            style={{ marginTop: '60px', padding: '24px', backgroundColor: '#1a1a1a', color: '#d4af37', textAlign: 'center', fontWeight: 'bold', letterSpacing: '6px', cursor: 'pointer', fontSize: '16px' }}>
            前往官网锁定底价
          </div>
        </div>
      )}

      {stage === 'loading' && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#d4af37', fontSize: '18px', fontWeight: 'bold' }}>正在分析实时房态与每晚报价...</div>}

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}