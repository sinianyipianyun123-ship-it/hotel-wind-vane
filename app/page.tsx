"use client";

import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// 你的海外版 Free Key
const GOOGLE_AI_KEY = "AIzaSyDZVTSIMqb7yone-DSGbWqXkUJrMXIQ9aQ";

export default function HotelSearch() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [accent, setAccent] = useState("Standard Chinese"); // 默认口音

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setResult("");

    try {
      // 1. 初始化，指定 API 版本为 v1 以修复 404 错误
      const genAI = new GoogleGenerativeAI(GOOGLE_AI_KEY.trim());
      
      // 2. 获取模型，使用更稳健的配置
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
      }, { apiVersion: 'v1' });

      // 3. 构建包含口音逻辑的 Prompt
      const prompt = `你是一个名为 'Adventure Team' 的毒舌高端酒店调研员。
      请调研酒店: ${query}。
      
      要求：
      1. 评价要犀利、真实，带点幽默感，不要官方废话。
      2. 包含：优缺点分析、值不值得住、避雷点。
      3. 风格：像资深旅行者的私密分享。
      4. **核心要求**：请使用 [${accent}] 的口音和用词风格来撰写这份报告（包括特定的方言词汇或语气助词）。`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setResult(response.text());
    } catch (error: any) {
      console.error("Gemini 详细错误信息:", error);
      setResult(`获取失败: ${error.message || "请检查网络或API Key状态"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto font-sans bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">🏨 Adventure Team</h1>
      <p className="text-center text-gray-500 mb-8">高端酒店毒舌调研 · 口音定制版</p>
      
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <div className="flex flex-col gap-4">
          {/* 酒店输入框 */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="输入酒店名称，例如：北京万达文华酒店"
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-black"
          />

          {/* 口音选择逻辑 */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-bold text-gray-600">口音偏好:</label>
            <select 
              value={accent}
              onChange={(e) => setAccent(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none"
            >
              <option value="标准普通话">标准普通话 (Standard)</option>
              <option value="地道京片子">地道京片子 (Beijing Accent)</option>
              <option value="港式中文 (带英文夹杂)">港式中文 (Hong Kong Style)</option>
              <option value="东北话">东北话 (Dongbei Accent)</option>
              <option value="台湾腔">台湾腔 (Taiwanese Style)</option>
              <option value="伦敦腔 (London Accent English)">伦敦腔 (London Accent English)</option>
            </select>
          </div>

          <button
            onClick={handleSearch}
            disabled={loading}
            className="w-full bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 disabled:bg-gray-400 transition-all font-bold"
          >
            {loading ? "正在调遣调研员..." : "🔍 开始毒舌调研"}
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-white p-6 border-l-4 border-blue-600 rounded-r-xl shadow-lg animate-fade-in">
          <h2 className="text-xl font-bold mb-4 text-blue-600 flex items-center gap-2 border-b pb-2">
            <span>📋</span> 调研报告 ({accent})
          </h2>
          <div className="whitespace-pre-wrap leading-relaxed text-gray-700">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}