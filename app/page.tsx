"use client";

import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// 确认这里的 Key 绝对没有空格
const GOOGLE_AI_KEY = "AIzaSyDZVTSIMqb7yone-DSGbWqXkUJrMXIQ9aQ";

export default function HotelSearch() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setResult("");

    try {
      // 1. 初始化，确保 Key 干净
      const genAI = new GoogleGenerativeAI(GOOGLE_AI_KEY.trim());

      // 2. 尝试使用更显式的模型定义方式
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash", // 如果依然404，下次尝试换成 "gemini-1.5-pro"
      });

      const prompt = `你是一个名为 'Adventure Team' 的毒舌高端酒店调研员。请调研酒店: ${query}。
      要求：
      1. 评价要犀利、真实，带点幽默感。
      2. 包含：优缺点分析、值不值得住、避雷点。
      3. 风格要像资深旅行者的私密分享。`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setResult(response.text());
    } catch (error: any) {
      console.error("Gemini 详细错误信息:", error);
      setResult(`获取失败: ${error.message || "请检查控制台错误日志"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">🏨 Adventure Team 酒店调研</h1>
      
      <div className="flex gap-2 mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="输入酒店名称，例如：北京万达文华酒店"
          className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-black"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {loading ? "调研中..." : "🔍 搜索"}
        </button>
      </div>

      {result && (
        <div className="bg-white p-6 border-2 border-gray-200 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-blue-600 border-b-2 border-blue-100 pb-2">调研报告</h2>
          <div className="whitespace-pre-wrap leading-relaxed text-gray-700">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}