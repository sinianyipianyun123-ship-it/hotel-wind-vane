"use client";

import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// 你的海外版 Key
const RAW_KEY = "AIzaSyDZVTSIMqb7yone-DSGbWqXkUJrMXIQ9aQ";

export default function AdventureTeamApp() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [accent, setAccent] = useState("北京话");

  const accentOptions = [
    { label: "京片子", value: "地道北京话" },
    { label: "东北话", value: "东北方言" },
    { label: "港式中文", value: "港式中文夹杂英文" },
    { label: "台湾腔", value: "软糯但损的台湾腔" },
    { label: "上海话", value: "精明考究的上海味" },
    { label: "伦敦腔", value: "London Accent English" }
  ];

  const startInvestigation = async () => {
    if (!query) return;
    setLoading(true);
    setResult("");

    try {
      // 自动清理可能来自记事本的空格或换行
      const cleanKey = RAW_KEY.replace(/\s/g, "");
      const genAI = new GoogleGenerativeAI(cleanKey);
      
      // 强制锁定 v1 版本和 flash 模型名
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
      }, { apiVersion: 'v1' });

      const prompt = `你是一个名为 'Adventure Team' 的毒舌酒店调研员。请调研: ${query}。
      要求：评价要犀利、真实，带点幽默感。
      口音偏好：请全程使用 [${accent}] 的语气和遣词造句。`;

      const res = await model.generateContent(prompt);
      const response = await res.response;
      setResult(response.text());
    } catch (error: any) {
      console.error("Error:", error);
      setResult("调研失败，请检查网络或Key: " + (error.message || "未知错误"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>ADVENTURE TEAM</h1>
        <p style={{ color: '#666' }}>高端酒店毒舌调研系统</p>
      </div>

      <div style={{ background: '#f4f4f4', padding: '20px', borderRadius: '15px', marginBottom: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>目标酒店</label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="输入酒店名"
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', color: '#000' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>口音偏好 Selection</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '5px' }}>
            {accentOptions.map((opt) => (
              <button
                key={opt.label}
                onClick={() => setAccent(opt.value)}
                style={{
                  padding: '8px 2px',
                  fontSize: '12px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  border: '1px solid #000',
                  backgroundColor: accent === opt.value ? '#000' : '#fff',
                  color: accent === opt.value ? '#fff' : '#000'
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={startInvestigation}
          disabled={loading}
          style={{
            width: '100%',
            padding: '15px',
            borderRadius: '10px',
            backgroundColor: '#000',
            color: '#fff',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.5 : 1
          }}
        >
          {loading ? "正在调研..." : "立即开始"}
        </button>
      </div>

      {result && (
        <div style={{ padding: '20px', border: '2px solid #000', borderRadius: '15px', background: '#fff' }}>
          <h2 style={{ marginTop: 0, fontSize: '16px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>调研报告 ({accent})</h2>
          <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', color: '#333' }}>{result}</div>
        </div>
      )}
    </div>
  );
}