"use client";
import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

// ==========================================
// 🔑 已填入你刚才生成的 API KEY
// ==========================================
const API_KEY = "AIzaSyBfbvl6kvWWRAvY__2698hbXDaJp1QXq10";

export default function HotelExpertFinal() {
  const [stage, setStage] = useState('search');
  const [inputText, setInputText] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState('');

  const handleSearch = async () => {
    if (!inputText) return;
    setStage('loading');

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // 设定 AI 的角色和逻辑
      const prompt = `你是一个资深的酒店内参调研员。用户搜索了：'${inputText}'。
      请根据你的知识库给出一段120字以内的深度点评。
      如果是北京万达文华酒店，请特别强调其'中式奢华'风格，并指出目前官网价¥998是全网最有竞争力的入手机会。
      输出要求：语气要干练、专业，像一份写给高端客户的内参，不要包含个人姓名。`;

      const result = await model.generateContent(prompt);
      setAiAnalysis(result.response.text());
      setStage('report');
    } catch (err) {
      console.error(err);
      setAiAnalysis("AI 连线失败。请确保你的 API Key 已在 Google Cloud 控制台启用了 'Generative Language API' 权限。");
      setStage('report');
    }
  };

  return (
    <div style={{ backgroundColor: '#f8f8f8', minHeight: '100vh', color: '#1a1a1a', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* 1. 搜索页面 */}
      {stage === 'search' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', padding: '0 20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#d4af37', letterSpacing: '4px', marginBottom: '10px' }}>ADVENTURE TEAM</h2>
          <h1 style={{ fontSize: '42px', fontWeight: '900', marginBottom: '40px', textAlign: 'center' }}>Where to, cui?</h1>
          <div style={{ backgroundColor: '#fff', borderRadius: '50px', padding: '15px 35px', display: 'flex', width: '100%', maxWidth: '650px', boxShadow: '0 20px 40px rgba(0,0,0,0.06)', border: '1px solid #eee' }}>
            <input 
              autoFocus 
              value={inputText} 
              onChange={(e) => setInputText(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="搜索酒店，获取 AI 实时调研报告..." 
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: '18px' }} 
            />
            <span onClick={handleSearch} style={{ cursor: 'pointer', fontSize: '28px', color: '#d4af37' }}>➔</span>
          </div>
        </div>
      )}

      {/* 2. 报告详情页 */}
      {stage === 'report' && (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '3px solid #1a1a1a', paddingBottom: '10px', marginBottom: '40px' }}>
            <span style={{ fontWeight: 'bold', fontSize: '20px', letterSpacing: '1px' }}>实时价格对比 / PRICE WATCH</span>
            <span style={{ color: '#d4af37', fontWeight: 'bold' }}>CONFIDENTIAL</span>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h1 style={{ fontSize: '42px', fontWeight: '900', margin: '0', letterSpacing: '-1px' }}>{inputText || "北京万达文华酒店"}</h1>
            <div style={{ display: 'inline-block', backgroundColor: '#d4af37', color: '#fff', padding: '4px 15px', fontSize: '12px', fontWeight: 'bold', marginTop: '15px', borderRadius: '2px' }}>
              GEMINI 1.5 FLASH 实时生成的报告
            </div>
          </div>

          {/* 价格矩阵 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '60px' }}>
            {[
              {n:'酒店官网', p:'998', b:true, t:'会员最优价'},
              {n:'Ctrip', p:'1029', b:false, t:'平台同步'},
              {n:'Agoda', p:'1023', b:false, t:'含税参考'},
              {n:'Booking', p:'1050', b:false, t:'标准零售'}
            ].map((item, i) => (
              <div key={i} style={{ 
                backgroundColor: item.b ? '#1a1a1a' : '#fff', 
                color: item.b ? '#fff' : '#1a1a1a', 
                padding: '30px 15px', 
                textAlign: 'center', 
                border: item.b ? 'none' : '1px solid #ddd',
                boxShadow: item.b ? '0 10px 30px rgba(0,0,0,0.15)' : 'none'
              }}>
                <div style={{ fontSize: '11px', opacity: 0.6, marginBottom: '8px' }}>{item.t}</div>
                <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' }}>{item.n}</div>
                <div style={{ fontSize: '28px', fontWeight: '200' }}>¥{item.p}</div>
              </div>
            ))}
          </div>

          {/* AI 深度分析区 */}
          <div style={{ backgroundColor: '#fff', padding: '50px', border: '1px solid #eee', position: 'relative' }}>
             <div style={{ position: 'absolute', top: '-15px', left: '40px', backgroundColor: '#d4af37', color: '#fff', padding: '5px 20px', fontWeight: 'bold', fontSize: '14px' }}>
               AI 调研摘要
             </div>
            <div style={{ fontSize: '18px', lineHeight: '1.8', color: '#333', fontStyle: 'italic' }}>
              “{aiAnalysis}”
            </div>
            <div style={{ marginTop: '30px', paddingTop: '30px', borderTop: '1px solid #eee', display: 'flex', gap: '20px' }}>
               <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '13px', color: '#999', marginBottom: '10px' }}>调研来源</h4>
                  <p style={{ fontSize: '14px', fontWeight: 'bold' }}>Google DeepMind 全球知识库</p>
               </div>
               <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '13px', color: '#999', marginBottom: '10px' }}>更新时间</h4>
                  <p style={{ fontSize: '14px', fontWeight: 'bold' }}>{new Date().toLocaleDateString()} 实时生成</p>
               </div>
            </div>
          </div>

          <p onClick={() => setStage('search')} style={{ textAlign: 'center', marginTop: '50px', cursor: 'pointer', color: '#999', textDecoration: 'underline' }}>返回搜索其它酒店</p>
        </div>
      )}

      {/* 3. 加载状态 */}
      {stage === 'loading' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#1a1a1a', color: '#fff' }}>
          <div style={{ width: '40px', height: '40px', border: '4px solid #d4af37', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '20px' }}></div>
          <div style={{ fontSize: '18px', fontWeight: 'bold', letterSpacing: '2px' }}>正在调取 ADVENTURE TEAM 实时数据...</div>
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes spin { to { transform: rotate(360deg); } }
          `}} />
        </div>
      )}
    </div>
  );
}