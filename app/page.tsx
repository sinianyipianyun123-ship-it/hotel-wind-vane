"use client";

import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function AdventureTeam() {
  const [hotelName, setHotelName] = useState("");
  const [accent, setAccent] = useState("Standard Chinese"); // 默认标准普通话
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // 口音选项定义
  const accentOptions = [
    { label: "标准普通话", value: "Standard Chinese" },
    { label: "京片子", value: "Beijing Accent" },
    { label: "东北话", value: "Northeast Chinese Dialect" },
    { label: "粤语/港式中文", value: "Cantonese/Hong Kong Style" },
    { label: "伦敦腔", value: "British London Accent" }
  ];

  const generateReport = async () => {
    if (!hotelName) return alert("请输入酒店名称！");
    setLoading(true);
    try {
      // 1. 初始化（使用你刚才拿到的海外 Free Tier Key）
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

      // 2. 这里的版本和模型组合是 2026 年最稳的，解决 404 报错
      const model = genAI.getGenerativeModel(
        { model: "gemini-1.5-flash" },
        { apiVersion: "v1beta" }
      );

      // 3. 缝合口音逻辑的 Prompt
      const prompt = `你是一个极其毒舌、犀利且真实的酒店调研员，来自 Adventure Team。
      现在的调研目标是：${hotelName}。
      
      ⚠️ 核心要求：
      1. 你必须全程使用“${accent}”（口音/方言）来撰写这份报告。
      2. 评价要辛辣、幽默，多吐槽酒店的槽点。
      3. 报告必须包含：整体初印象、客房细节、槽点曝光、最终建议。
      4. 报告开头请加上 [Adventure Team Confidential] 字样。`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setResult(response.text());
    } catch (error) {
      console.error(error);
      setResult("报告生成失败，请检查 API Key 或稍后再试。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🏨 Adventure Team 酒店调研员</h1>
      
      <div className="flex flex-col gap-4 mb-6">
        <input
          className="border p-2 rounded text-black"
          placeholder="输入想要吐槽的酒店名称..."
          value={hotelName}
          onChange={(e) => setHotelName(e.target.value)}
        />
        
        <div className="flex flex-wrap gap-2">
          <span className="w-full text-sm text-gray-500">选择调研员口音：</span>
          {accentOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setAccent(opt.value)}
              className={`px-3 py-1 rounded-full border text-sm ${
                accent === opt.value ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <button
          onClick={generateReport}
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded disabled:bg-gray-400"
        >
          {loading ? "正在毒舌分析中..." : "开始调研"}
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded whitespace-pre-wrap text-black">
          {result}
        </div>
      )}
    </div>
  );
}