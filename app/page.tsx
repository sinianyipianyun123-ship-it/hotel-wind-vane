"use client";

import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function AdventureTeam() {
  const [hotelName, setHotelName] = useState("");
  const [accent, setAccent] = useState("标准普通话"); // 默认口音
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. 口音选项定义（已添加逻辑）
  const accentOptions = [
    { label: "标准普通话", value: "标准普通话" },
    { label: "京片子", value: "地道北京话，多用‘您呐’、‘合着’，带点儿爷们儿气" },
    { label: "东北话", value: "东北方言，多用‘必须滴’、‘整挺好’，语调高昂犀利" },
    { label: "粤语/港式中文", value: "中英文夹杂的港式腔调，多用‘Literal’、‘系咁先’" },
    { label: "伦敦腔", value: "British London Accent, 带着冷幽默和绅士般的尖酸刻薄" }
  ];

  const generateReport = async () => {
    if (!hotelName) return alert("老板，请输入酒店名称！");
    setLoading(true);
    setResult("");

    try {
      // 从 Vercel 环境变量读取你刚配好的那把钥匙
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

      // 2. 这里的括号和参数已经对齐，彻底解决 404 报错
      const model = genAI.getGenerativeModel(
        { model: "gemini-1.5-flash" },
        { apiVersion: "v1beta" }
      );

      // 3. 注入“口音偏好选择”逻辑的提示词
      const prompt = `你是一个极其毒舌、犀利且真实的酒店调研员，来自 Adventure Team。
      现在的调研目标是：${hotelName}。
      
      ⚠️ 核心任务：
      1. 你必须全程使用“${accent}”的风格撰写。
      2. 评价要真实且刻薄，挖掘不为人知的槽点，别说废话。
      3. 报告必须包含：[Adventure Team Confidential]、初印象、客房细节、槽点曝光、最终避雷建议。`;

      const chat = await model.generateContent(prompt);
      const response = await chat.response;
      setResult(response.text());
    } catch (error: any) {
      console.error(error);
      setResult(`调研失败：${error.message || "可能是钥匙没插好，检查下 Vercel 变量"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto font-sans text-black">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">🕵️ Adventure Team 酒店调研</h1>
      
      <div className="flex flex-col gap-4 mb-8 bg-gray-50 p-6 rounded-2xl shadow-sm">
        <label className="font-semibold text-gray-700">第一步：锁定目标酒店</label>
        <input
          className="border-2 border-gray-300 p-3 rounded-xl focus:border-blue-500 outline-none"
          placeholder="例如：北京万达文华酒店"
          value={hotelName}
          onChange={(e) => setHotelName(e.target.value)}
        />
        
        <label className="font-semibold text-gray-700 mt-2">第二步：选择调研员口音</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {accentOptions.map((opt) => (
            <button
              key={opt.label}
              onClick={() => setAccent(opt.value)}
              className={`p-2 border rounded-lg text-sm transition-all ${
                accent === opt.value 
                ? "bg-blue-600 text-white border-blue-600 shadow-md" 
                : "bg-white text-gray-600 border-gray-200 hover:border-blue-400"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <button
          onClick={generateReport}
          disabled={loading}
          className="mt-4 bg-black text-white p-4 rounded-xl font-bold hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
        >
          {loading ? "调研员正在连夜赶往现场..." : "立即开始调研报告"}
        </button>
      </div>

      {result && (
        <div className="mt-6 p-6 border-l-4 border-blue-600 bg-white shadow-lg rounded-r-xl">
          <div className="whitespace-pre-wrap leading-relaxed text-gray-800">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}