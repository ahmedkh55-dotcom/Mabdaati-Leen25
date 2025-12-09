import { GoogleGenAI } from "@google/genai";
import { UserStats, ChatMessage } from "../types";

// NOTE: In a real production app, ensure this key is secure.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const MODEL_NAME = 'gemini-2.5-flash';

export const getAIExplanation = async (question: string, context: string): Promise<string> => {
  try {
    const prompt = `
      أنت معلم ذكي ومرح للطالبة الموهوبة "لين" (عمرها 13-15 سنة).
      السياق: ${context}
      السؤال من الطالبة: ${question}
      
      التعليمات:
      1. اشرح بأسلوب مبسط ومشجع.
      2. استخدم أمثلة واقعية.
      3. لا تعطِ الإجابة النهائية فوراً، بل قدّم تلميحات ذكية.
      4. اختم بجملة تحفيزية لطيفة مثل "أنتِ رائعة يا مبدعتي!".
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });
    
    return response.text || "عذراً، لم أستطع الاتصال بالمعلم الذكي حالياً.";
  } catch (error) {
    console.error("AI Error:", error);
    return "حدث خطأ في الاتصال بالمعلم الذكي. يرجى المحاولة لاحقاً.";
  }
};

export const getAIHint = async (questionText: string, options: string[]): Promise<string> => {
  try {
    const prompt = `
      أعط تلميحاً ذكياً وصغيراً جداً (جملة واحدة) يساعد الطالبة على حل هذا السؤال دون كشف الإجابة:
      السؤال: ${questionText}
      الخيارات: ${options.join(', ')}
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });
    
    return response.text || "فكري في العلاقة بين الكلمات...";
  } catch (error) {
    return "حاولي استبعاد الإجابات غير المنطقية.";
  }
};

export const chatWithTutor = async (history: ChatMessage[], newMessage: string): Promise<string> => {
  try {
    // Construct chat history for context
    const chatHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }],
    }));

    // Add system instruction equivalent via initial prompt context or system instruction if supported
    // For simplicity in this prompt structure:
    const systemPrompt = `
      أنت "المعلم الذكي" في منصة "مبدعتي لين".
      دورك: مساعدة الطالبة لين في الاستعداد لاختبار موهبة.
      صفاتك: مرح، ذكي، مشجع، وتستخدم الرموز التعبيرية.
      مهمتك: الإجابة على الأسئلة العلمية، اللغوية، والرياضية، وتقديم نصائح دراسية.
    `;
    
    const chat = ai.chats.create({
      model: MODEL_NAME,
      config: {
        systemInstruction: systemPrompt,
      },
      history: chatHistory
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text;

  } catch (error) {
    console.error("Chat Error:", error);
    return "أواجه مشكلة بسيطة في الاتصال، هل يمكننا المحاولة مرة أخرى؟ 🤖";
  }
};

export const generateStudentReport = async (stats: UserStats): Promise<string> => {
  try {
    const prompt = `
      بصفتك المعلم الذكي للموهبة "لين"، قم بإعداد تقرير إنجاز شامل وجذاب بناءً على البيانات التالية:
      - الأسئلة المنجزة: ${stats.totalAnswered}
      - الإجابات الصحيحة: ${stats.correctAnswers}
      - سلسلة الحماس (Streak): ${stats.streak}
      - الأداء حسب الأقسام: ${JSON.stringify(stats.categoryPerformance)}

      المطلوب في التقرير (استخدم تنسيق Markdown):
      1. **ملخص الأداء**: كلمة تشجيعية قوية.
      2. **نقاط القوة**: تحليل المجالات التي أبدعت فيها.
      3. **نقاط التحسين**: المجالات التي تحتاج تركيز (حيث نسبة الخطأ عالية).
      4. **خريطة ذهنية مقترحة**: قائمة بالمفاهيم الرئيسية التي يجب مراجعتها (مثل قوانين الحركة، التناظر اللفظي..).
      5. **خطة العمل**: 3 خطوات عملية للأسبوع القادم.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    return response.text || "لم يتمكن النظام من توليد التقرير.";
  } catch (error) {
    console.error(error);
    return "حدث خطأ أثناء توليد التقرير.";
  }
}

export const analyzeUploadedFile = async (fileBase64: string, mimeType: string): Promise<string> => {
    try {
        const prompt = "حلل هذا الملف واستخرج منه 3 أسئلة تدريبية لاختبار موهبة (استدلال لغوي أو رياضي) مع الإجابات والشرح.";
        
        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: {
                parts: [
                    {
                        inlineData: {
                            mimeType: mimeType,
                            data: fileBase64
                        }
                    },
                    { text: prompt }
                ]
            }
        });

        return response.text || "لم يتمكن المعلم من قراءة الملف.";
    } catch (e) {
        console.error(e);
        return "حدث خطأ أثناء تحليل الملف.";
    }
}