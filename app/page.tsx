"use client";

import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * ADVENTURE TEAM - 酒店调研员系统
 * * 兼容性说明：
 * 1. 已针对记事本(Notepad)粘贴进行优化，移除了可能导致乱码的特殊 Unicode。
 * 2. 强制锁定 Gemini API v1 版本，解决 404 模型未找到的问题。
 * 3. 包含完整的 Accent Preference Selection (口音偏好选择) 逻辑。
 */

// 你的海外版 Free Key
const GOOGLE_AI_KEY = "AIzaSyDZVTSIMqb7yone-DSGbWqXkUJrMXIQ9aQ";

export default function HotelSearchApp() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [accent, setAccent] = useState("北京话"); // 初始口音偏好

  // 口音选项定义
  const accentOptions = [
    { label: "京片子", value: "地道北京话，带点儿爷们儿气" },
    { label: "东北话", value: "东北方言，嘎嘎犀利" },
    { label: "港式中文", value: "中英文夹杂，带点 TVB 腔调" },
    { label: "台湾腔", value: "语气软但话很损的台湾腔" },
    { label: "上海腔", value: "带点上海弄堂味儿，讲究精明" },
    { label: "伦敦腔", value: "London Accent English (British humor)" },
  ];

  const handleInvestigation = async () => {
    if (!query) return;
    setLoading(true);
    setResult("");

    try {
      // 1. 初始化，通过 trim() 过滤掉任何可能来自记事本的不可见空格
      const genAI = new GoogleGenerativeAI(GOOGLE_AI_KEY.trim());
      
      // 2. 锁定 v1 版本，这是解决之前 404 报错的关键
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash-latest", 
      }, { apiVersion: 'v1' });

      // 3. 构造提示词，注入口音偏好逻辑
      const prompt = `你是一个名为 'Adventure Team' 的顶级高端酒店调研员。
      请调研酒店: ${query}。
      
      你的设定：
      - 风格：非常毒舌、挑剔、犀利，拒绝公关辞令。
      - 内容：评价优缺点、避雷建议、值不值得住。
      - 核心要求：请全程使用 [${accent}] 的语气和用词风格。`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setResult(response.text());
    } catch (error: any) {
      console.error("Gemini Error:", error);
      setResult(`调研中断: ${error.message || "请检查 API Key 或网络"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6 font-sans">
      <div className="max-w-xl mx-auto">
        {/* Header 部分 */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-black tracking-tighter mb-2">ADVENTURE TEAM</h1>
          <p className="text-gray-500 italic text-sm">高端酒店毒舌调研系统 v2.0</p>
        </header>

        {/* 输入与选择区域 */}
        <div className="bg-white shadow-xl rounded-3xl p-6 mb-8 border border-gray-100">
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">目标酒店名称</label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="例如：北京王府半岛酒店"
                className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black outline-none text-black font-bold"
              />
            </div>

            {/* Accent Preference Selection 逻辑 */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-3">口音偏好选择</label>
              <div className="grid grid-cols-3 gap-2">
                {accentOptions.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => setAccent(opt.value)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      accent === opt.value
                        ? "bg-black border-black text-white"
                        : "bg-white border-gray-200 text-gray-400 hover:border-gray-400"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleInvestigation}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 transition-all shadow-lg shadow-blue-100"
            >
              {loading ? "正在调遣调研员..." : "立即开始调研"}
            </button>
          </div>
        </div>

        {/* 调研结果展现 */}
        {result && (
          <div className="bg-white border-2 border-black rounded-3xl p-6 shadow-2xl animate-in fade-in slide-in-from-bottom-2">
            <h2 className="text-sm font-black text-blue-600 uppercase mb-4 pb-2 border-b border-gray-100">
              Intelligence Report / 调研密报
            </h2>
            <div className="whitespace-pre-wrap leading-relaxed text-gray-800 font-medium">
              {result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}