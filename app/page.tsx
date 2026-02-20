"use client";
import React, { useState } from 'react';
// 确保这一行没有被注释掉
import { GoogleGenerativeAI } from "@google/generative-ai";

const GOOGLE_AI_KEY ="AIzaSyBfbvl6kvWWRAvY__2698hbXDaJp1QXq10";

export default function AdventureHotelApp() {
  const [stage, setStage] = useState('search');
  const [inputText, setInputText] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [accent, setAccent] = useState('Expert');

  // 定义口音
  const accentMap: Record<string, string> = {
    Expert: "专业、高端的行业专家口音",
    Savage: "犀利、爱吐槽的毒舌点评口音",
    Butler: "礼貌、贴心的管家口音"
  };

  const startAnalysis = async () => {
    if (!inputText) return;
    setStage('loading');

    try {
      const genAI = new GoogleGenerativeAI(GOOGLE_AI_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `你是 Adventure Team 调研员。用【${accentMap[accent]}】分析酒店: '${inputText}'。如果是北京万达文华，强调官网998元的优势。120字内。`;

      const result = await model.generateContent(prompt);
      setAiAnalysis(result.response.text());
      setStage('report');
    } catch (err) {
      console.error(err);
      setAiAnalysis("获取调研报告失败，请检查 API Key 权限。");
      setStage('report');
    }
  };

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', color: '#fff', padding: '20px', fontFamily: 'sans-serif' }}>
      {stage === 'search' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
          <div style={{ color: '#d4af37', fontWeight: 'bold', letterSpacing: '4px', marginBottom: '20px' }}>ADVENTURE TEAM</div>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
            {Object.keys(accentMap).map(a => (
              <button key={a} onClick={() => setAccent(a)} style={{
                padding: '8px 15px', borderRadius: '4px', border: '1px solid #333',
                backgroundColor: accent === a ? '#d4af37' : 'transparent',
                color: accent === a ? '#000' : '#888', cursor: 'pointer'
              }}>{a === 'Expert' ? '专业' : a === 'Savage' ? '毒舌' : '管家'}</button>
            ))}
          </div>
          <div style={{ display: 'flex', width: '100%', maxWidth: '500px', backgroundColor: '#1a1a1a', borderRadius: '30px', padding: '10px 20px', border: '1px solid #333' }}>
            <input style={{ flex: 1, backgroundColor: 'transparent', border: 'none', color: '#fff', outline: 'none' }} placeholder="输入酒店名称..." value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && startAnalysis()} />
            <button onClick={startAnalysis} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>🔍</button>
          </div>
        </div>
      )}

      {stage === 'report' && (
        <div style={{ maxWidth: '800px', margin: '40px auto' }}>
          <header style={{ borderBottom: '1px solid #333', paddingBottom: '20px', marginBottom: '40px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#d4af37' }}>{accent} REPORT</span>
            <span style={{ cursor: 'pointer', opacity: 0.5 }} onClick={() => setStage('search')}>← 返回</span>
          </header>
          <h1>{inputText}</h1>
          <div style={{ backgroundColor: '#1a1a1a', padding: '30px', borderRadius: '8px', borderLeft: '4px solid #d4af37', marginTop: '30px' }}>
            <p style={{ lineHeight: '1.8', color: '#ccc' }}>{aiAnalysis}</p>
          </div>
        </div>
      )}

      {stage === 'loading' && <div style={{ textAlign: 'center', marginTop: '100px', color: '#d4af37' }}>正在通过 Adventure Team 卫星调取数据...</div>}
    </div>
  );
}  