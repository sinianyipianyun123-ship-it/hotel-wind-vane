"use client";

import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// 这是你那把珍贵的海外版 Free Key
const GOOGLE_AI_KEY = "AIzaSyDZVTSIMqb7yone-DSGbWqXkUJrMXIQ9aQ";

export default function HotelSearch() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [accent, setAccent] = useState("北京话"); // 默认口音

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setResult("");

    try {
      // 1. 初始化并强制指定 v1 版本，彻底解决 404 模型找不到的问题
      const genAI = new GoogleGenerativeAI(GOOGLE_AI_KEY.trim());
      
      // 2. 获取模型（使用 Flash 模型以获得最快生成速度）
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
      }, { apiVersion: 'v1' });

      // 3. 增强版毒舌提示词 + 口音逻辑
      const prompt = `你是一个名为 'Adventure Team' 的顶级毒舌酒店评论员。
      你现在的任务是调研酒店: ${query}。
      
      你的设定：
      - 风格：尖酸刻薄但极其专业，能一眼看穿酒店的廉价装修或傲慢服务。
      - 要求：分析优缺点、给出避雷点，最后说出到底值不值得住。
      - 核心语言规则：请全程使用地道的 [${accent}] 撰写。如果是方言，请加入典型的语气词和特定说法。
      - 语气：像是在和圈内好友私密吐槽。`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setResult(response.text());
    } catch (error: any) {
      console.error("Gemini Error:", error);
      setResult(`调研员被拦住了: ${error.message || "未知错误，请检查API状态"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto font-sans bg-white min-h-screen text-gray-900">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold mb-2 tracking-tight">🏨 Adventure Team</h1>
        <p className="text-gray-500 font-medium italic">"真实的评价总是带点毒性。"</p>
      </header>
      
      <div className="space-y-6 bg-gray-50 p-6 rounded-2xl shadow-inner">
        {/* 酒店输入 */}
        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700">想拆哪家酒店的台？</label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="输入酒店名，例如：北京王府半岛酒店"
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-black"
          />
        </div>

        {/* 口音选择：满足 accent preference selection 需求 */}
        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700">口音偏好设置:</label>
          <div className="grid grid-cols-2 gap-2">
            {["北京话", "东北话", "港式中文", "台湾腔", "上海话", "四川话"].map((a) => (
              <button
                key={a}
                onClick={() => setAccent(a)}
                className={`p-2 text-sm rounded-lg border transition-all ${
                  accent === a 
                  ? "bg-black text-white border-black" 
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSearch}
          disabled={loading}
          className="w-full bg-blue-600 text-white px-6 py-4 rounded-xl hover:bg-blue-700 disabled:bg-gray-400 transition-all font-bold text-lg shadow-lg shadow-blue-200"
        >
          {loading ? "调研员正在赶往现场..." : "🔍 立即开始调研"}
        </button>
      </div>

      {result && (
        <div className="mt-10 p-8 bg-white border-2 border-gray-100 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-6 border-b pb-4">
            <h2 className="text-xl font-bold text-blue-600 italic">来自 Adventure Team 的密报 ({accent})</h2>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-400 font-mono">CONFIDENTIAL</span>
          </div>
          <div className="whitespace-pre-wrap leading-relaxed text-gray-800 text-lg">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}