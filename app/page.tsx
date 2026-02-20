"use client";
import React, { useState, useEffect } from 'react';
// 注意：如果运行报错，请确保你在终端执行过: npm install @google/generative-ai
import { GoogleGenerativeAI } from "@google/generative-ai";

// 🔑 已填入你图片中的最新 Key
const KEY_VAL = "AIzaSyBfbvl6kvWWRAvY__2698hbXDaJp1QXq10";

export default function AdventureHotelApp() {
  const [stage, setStage] = useState('search');
  const [inputText, setInputText] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [accent, setAccent] = useState('Expert'); // 默认：专家口音

  // 🎭 Adventure Team 的口音逻辑
  const accentConfigs = {
    Expert: "专业、冷静、干练的行业专家口音",
    Savage: "幽默、毒舌、犀利的吐槽口音",
    Butler: "优雅、礼貌、细致的管家尊享口音"
  };

  const handleSearch = async () => {
    if (!inputText) return;
    setStage('loading');

    try {
      const genAI = new GoogleGenerativeAI(KEY_VAL);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `你现在是 Adventure Team 的首席调研员。
      用户搜索酒店：'${inputText}'。
      请切换到【${accentConfigs[accent as keyof typeof accentConfigs]}】为用户提供120字以内的调研摘要。
      特殊要求：如果涉及北京万达文华酒店，必须提到官网¥998的绝对价格优势。`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setAiAnalysis(response.text());
      setStage('report');
    } catch (err) {
      console.error(err);
      setAiAnalysis("获取报告失败。原因可能是：1. API Key 刚创建需要等1分钟生效；2. 网络不稳定。请稍后重试。");
      setStage('report');
    }
  };

  return (
    <div style={{ backgroundColor: '#0f0f0f', minHeight: '100vh', color: '#fff', fontFamily: 'Arial, sans-serif' }}>
      
      {/* 搜索界面 */}
      {stage === 'search' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', padding: '0 20px' }}>
          <div style={{ color: '#d4af37', fontWeight: 'bold', letterSpacing: '4px', marginBottom: '15px' }}>ADVENTURE TEAM</div>
          <h1 style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '40px' }}>Hotel Intelligence</h1>
          
          {/* 口音偏好选择器 */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
            {Object.keys(accentConfigs).map((a) => (
              <button 
                key={a}
                onClick={() => setAccent(a)}
                style={{
                  padding: '8px 16px', borderRadius: '4px', border: '1px solid #333',
                  backgroundColor: accent === a ? '#d4af37' : 'transparent',
                  color: accent === a ? '#000' : '#888',
                  cursor: 'pointer', transition: '0.3s'
                }}
              >
                {a === 'Expert' ? '专业' : a === 'Savage' ? '毒舌' : '管家'}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', width: '100%', maxWidth: '500px', backgroundColor: '#1e1e1e', borderRadius: '30px', padding: '10px 20px' }}>
            <input 
              style={{ flex: 1, backgroundColor: 'transparent', border: 'none', color: '#fff', outline: 'none', fontSize: '16px' }}
              placeholder="输入酒店名称..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}>🔍</button>
          </div>
        </div>
      )}

      {/* 调研报告界面 */}
      {stage === 'report' && (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '20px', marginBottom: '40px' }}>
            <span style={{ color: '#d4af37', fontWeight: 'bold' }}>INTERNAL DATA / {accent.toUpperCase()}</span>
            <span style={{ cursor: 'pointer', color: '#888' }} onClick={() => setStage('search')}>返回搜索</span>
          </header>

          <h1 style={{ fontSize: '36px', marginBottom: '40px' }}>{inputText}</h1>

          {/* 模拟对比价格 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '50px' }}>
             {[
               {name:'官网', price:'998', best:true},
               {name:'Ctrip', price:'1029', best:false},
               {name:'Agoda', price:'1023', best:false},
               {name:'Booking', price:'1050', best:false}
             ].map((shop, i) => (
               <div key={i} style={{ backgroundColor: shop.best ? '#d4af37' : '#1e1e1e', color: shop.best ? '#000' : '#fff', padding: '20px 10px', textAlign: 'center', borderRadius: '4px' }}>
                 <div style={{ fontSize: '12px', opacity: 0.8 }}>{shop.name}</div>
                 <div style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '5px' }}>¥{shop.price}</div>
               </div>
             ))}
          </div>

          {/* AI 分析内容 */}
          <div style={{ backgroundColor: '#1e1e1e', padding: '30px', borderRadius: '8px', borderLeft: '4px solid #d4af37' }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#d4af37' }}>ADVENTURE AI 分析摘要</h3>
            <p style={{ lineHeight: '1.8', color: '#ccc', fontSize: '16px' }}>{aiAnalysis}</p>
          </div>
        </div>
      )}

      {/* 加载界面 */}
      {stage === 'loading' && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '18px', color: '#d4af37' }}>
          正在调取 Adventure Team 远程情报库...
        </div>
      )}
    </div>
  );
}