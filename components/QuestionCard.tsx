import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { Lightbulb, Trash2, Bot, CheckCircle, XCircle, ArrowLeft, ArrowRight, HelpCircle, Save, Sparkles, Target } from 'lucide-react';
import { getAIExplanation, getAIHint } from '../services/geminiService';

interface QuestionCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
  onPrev?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  isKillMistakesMode?: boolean; // New prop to change UI for this mode
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer, onNext, onPrev, hasPrev, hasNext, isKillMistakesMode = false }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [disabledOptions, setDisabledOptions] = useState<number[]>([]);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [aiLoading, setAiLoading] = useState(false);
  const [hint, setHint] = useState<string>('');
  const [hintLoading, setHintLoading] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
    setDisabledOptions([]);
    setAiResponse('');
    setAiChatOpen(false);
    setHint('');
  }, [question.id]);

  const handleOptionClick = (index: number) => {
    if (isAnswered || disabledOptions.includes(index)) return;
    setSelectedOption(index);
    setIsAnswered(true);
    const isCorrect = index === question.correctAnswerIndex;
    onAnswer(isCorrect);
  };

  const handleDeleteTwo = () => {
    if (isAnswered) return;
    const incorrectIndices = question.options
      .map((_, idx) => idx)
      .filter(idx => idx !== question.correctAnswerIndex);
    
    // Randomly pick 2 incorrect
    const shuffled = incorrectIndices.sort(() => 0.5 - Math.random());
    setDisabledOptions(shuffled.slice(0, 2));
  };

  const handleShowHint = async () => {
    if (hint) return;
    setHintLoading(true);
    const h = await getAIHint(question.text, question.options);
    setHint(h);
    setHintLoading(false);
  };

  const handleAskAI = async () => {
    setAiChatOpen(true);
    if (!aiResponse) {
      setAiLoading(true);
      const resp = await getAIExplanation("اشرح لي هذا السؤال بالتفصيل", question.text + " " + question.options.join(", "));
      setAiResponse(resp);
      setAiLoading(false);
    }
  };

  // Visual Difficulty Badge Color
  const difficultyColor = {
      'easy': 'bg-green-100 text-green-700',
      'medium': 'bg-yellow-100 text-yellow-700',
      'hard': 'bg-red-100 text-red-700'
  }[question.difficulty] || 'bg-gray-100';

  return (
    <div className={`max-w-3xl mx-auto p-4 transition-all duration-500 ${isKillMistakesMode ? 'scale-105' : ''}`}>
      
      {/* Question Card */}
      <div className={`rounded-[2rem] shadow-xl p-8 mb-6 relative overflow-hidden transition-all duration-300 border border-white/50 backdrop-blur-sm ${isKillMistakesMode ? 'bg-red-50 border-2 border-red-200 shadow-red-100' : 'bg-white'}`}>
        
        {/* Decorative background blob */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary-100 to-transparent rounded-full opacity-50 blur-2xl"></div>

        <div className="flex justify-between items-center mb-6 relative z-10">
          <div className="flex gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${isKillMistakesMode ? 'bg-red-200 text-red-800' : 'bg-indigo-100 text-indigo-700'}`}>
                {isKillMistakesMode ? '🎯 Kill Mistakes' : question.category}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${difficultyColor}`}>
                {question.difficulty === 'easy' ? 'سهل' : question.difficulty === 'medium' ? 'متوسط' : 'صعب'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
             <button title="حفظ السؤال" className="p-2 hover:bg-gray-100 rounded-full hover:text-primary-600 transition-colors">
               <Save size={18} />
             </button>
          </div>
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed mb-8 relative z-10">
          {question.text}
        </h3>

        {/* Tools Bar */}
        <div className="flex flex-wrap gap-3 mb-8 relative z-10">
          <button 
            onClick={handleDeleteTwo}
            disabled={isAnswered || disabledOptions.length > 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${isAnswered ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'bg-white border border-red-100 text-red-600 hover:bg-red-50 shadow-sm hover:shadow-md'}`}
          >
            <Trash2 size={16} />
            حذف إجابتين
          </button>
          
          <button 
             onClick={handleShowHint}
             disabled={isAnswered}
             className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-white border border-yellow-100 text-yellow-600 hover:bg-yellow-50 transition-all shadow-sm hover:shadow-md"
          >
            <HelpCircle size={16} />
            {hintLoading ? '...' : 'تلميح'}
          </button>

          <button 
             onClick={handleAskAI}
             className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-secondary-50 to-white border border-secondary-100 text-secondary-600 hover:to-secondary-50 transition-all mr-auto shadow-sm hover:shadow-md"
          >
            <Bot size={16} />
            اسألي المعلم الذكي
          </button>
        </div>

        {/* Hint Display */}
        {hint && (
            <div className="mb-6 p-4 bg-yellow-50/80 border border-yellow-200 rounded-2xl text-yellow-800 text-sm flex gap-3 animate-fade-in relative overflow-hidden">
                <div className="absolute left-0 top-0 w-1 h-full bg-yellow-400"></div>
                <Lightbulb size={18} className="mt-0.5 flex-shrink-0 text-yellow-500" />
                <p className="font-medium">{hint}</p>
            </div>
        )}

        {/* Options */}
        <div className="space-y-3 relative z-10">
          {question.options.map((option, index) => {
            let stateClass = "border-2 border-gray-100 hover:border-primary-300 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5";
            
            if (disabledOptions.includes(index)) {
              stateClass = "opacity-40 grayscale cursor-not-allowed bg-gray-50 border-transparent shadow-none";
            } else if (isAnswered) {
               if (index === question.correctAnswerIndex) {
                 stateClass = "bg-green-50 border-green-500 text-green-800 shadow-md ring-1 ring-green-200";
               } else if (index === selectedOption) {
                 stateClass = "bg-red-50 border-red-500 text-red-800 shadow-md";
               } else {
                 stateClass = "bg-gray-50 border-gray-100 text-gray-400 opacity-70";
               }
            } else if (selectedOption === index) {
                stateClass = "border-primary-500 bg-primary-50";
            }

            return (
              <button
                key={index}
                onClick={() => handleOptionClick(index)}
                disabled={isAnswered || disabledOptions.includes(index)}
                className={`w-full p-4 rounded-2xl text-right transition-all duration-300 flex justify-between items-center group ${stateClass}`}
              >
                <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 flex items-center justify-center rounded-xl text-sm font-bold transition-colors ${
                        isAnswered && index === question.correctAnswerIndex ? 'bg-green-500 text-white shadow-green-200 shadow-lg' : 
                        isAnswered && index === selectedOption ? 'bg-red-500 text-white shadow-red-200 shadow-lg' : 'bg-gray-100 text-gray-500 group-hover:bg-primary-100 group-hover:text-primary-700'
                    }`}>
                        {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-lg font-medium">{option}</span>
                </div>
                {isAnswered && index === question.correctAnswerIndex && <CheckCircle className="text-green-500 animate-bounce" size={24} />}
                {isAnswered && index === selectedOption && index !== question.correctAnswerIndex && <XCircle className="text-red-500 animate-pulse" size={24} />}
              </button>
            );
          })}
        </div>

        {/* Teacher Feedback (Immediate) */}
        {isAnswered && (
            <div className={`mt-6 p-5 rounded-2xl flex items-start gap-4 animate-fade-in border-2 ${selectedOption === question.correctAnswerIndex ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                <div className={`p-2 rounded-full ${selectedOption === question.correctAnswerIndex ? 'bg-green-200' : 'bg-red-200'}`}>
                    {selectedOption === question.correctAnswerIndex ? <Sparkles size={20} className="text-green-700" /> : <Target size={20} className="text-red-700" />}
                </div>
                <div>
                   <p className={`font-bold text-lg mb-1 ${selectedOption === question.correctAnswerIndex ? 'text-green-800' : 'text-red-800'}`}>{selectedOption === question.correctAnswerIndex ? 'إجابة مذهلة! 🌟' : 'اقتربتِ من الحل...'}</p>
                   <p className="text-sm text-gray-600 leading-relaxed">{selectedOption === question.correctAnswerIndex ? 'تحليلك للموقف كان دقيقاً جداً. استمري!' : 'لا بأس، كل خطأ هو فرصة للتعلم. انظري للشرح بالأسفل لفهم المنطق.'}</p>
                </div>
            </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
           {onPrev && (
               <button 
                onClick={onPrev} disabled={!hasPrev}
                className="flex items-center gap-2 text-gray-500 disabled:opacity-30 hover:text-primary-600 font-medium px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors"
               >
                <ArrowRight size={20} /> السابق
               </button>
           )}
           
           {!isKillMistakesMode && (
             <button 
               onClick={onNext} disabled={!hasNext}
               className="flex items-center gap-2 text-white disabled:bg-gray-300 bg-gray-900 hover:bg-black font-medium px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 active:translate-y-0"
             >
               التالي <ArrowLeft size={20} />
             </button>
           )}
        </div>
      </div>

      {/* Explanation Section (Shown after answer) */}
      {isAnswered && (
        <div className="animate-slide-up">
          <div className="bg-gradient-to-br from-white to-purple-50 rounded-[2rem] p-8 border border-purple-100 shadow-lg relative overflow-hidden">
             
             <div className="flex items-center gap-3 mb-6 relative z-10">
               <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600 shadow-sm">
                 <Lightbulb size={24} />
               </div>
               <h4 className="text-xl font-bold text-gray-800">كيف نفكر في هذا السؤال؟</h4>
             </div>
             
             <div className="space-y-4 relative z-10">
               <div className="bg-white p-5 rounded-2xl shadow-sm border-r-4 border-green-500">
                 <strong className="block text-green-600 text-sm font-bold mb-2 uppercase tracking-wider">الإجابة الدقيقة</strong>
                 <p className="text-gray-700 leading-relaxed">{question.explanation.whyCorrect}</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 hover:border-blue-200 transition-colors shadow-sm">
                     <p className="text-xs font-bold text-blue-500 mb-2 uppercase">💡 الطريقة السريعة</p>
                     <p className="text-sm text-gray-600">{question.explanation.method1}</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 hover:border-purple-200 transition-colors shadow-sm">
                     <p className="text-xs font-bold text-purple-500 mb-2 uppercase">🧮 الطريقة العلمية</p>
                     <p className="text-sm text-gray-600">{question.explanation.method2}</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 hover:border-pink-200 transition-colors shadow-sm">
                     <p className="text-xs font-bold text-pink-500 mb-2 uppercase">🚫 طريقة الحذف</p>
                     <p className="text-sm text-gray-600">{question.explanation.method3}</p>
                  </div>
               </div>
             </div>
          </div>
        </div>
      )}

      {/* AI Chat Modal Overlay */}
      {aiChatOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
            <div className="bg-secondary-600 p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <Bot />
                <span className="font-bold">المعلم الذكي</span>
              </div>
              <button onClick={() => setAiChatOpen(false)}><XCircle /></button>
            </div>
            <div className="p-6 min-h-[200px] max-h-[60vh] overflow-y-auto bg-gray-50">
              {aiLoading ? (
                <div className="flex flex-col items-center justify-center h-40 gap-4">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-secondary-600"></div>
                  <p className="text-gray-500 animate-pulse">جاري تحليل السؤال والتفكير...</p>
                </div>
              ) : (
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <div className="prose prose-sm prose-p:text-gray-700 max-w-none">
                      <p className="whitespace-pre-wrap leading-relaxed">{aiResponse}</p>
                    </div>
                </div>
              )}
            </div>
            <div className="p-4 bg-white border-t flex justify-end">
              <button onClick={() => setAiChatOpen(false)} className="px-6 py-2 bg-secondary-600 text-white rounded-xl hover:bg-secondary-700 shadow-lg">شكراً</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default QuestionCard;