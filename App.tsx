import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DashboardStats from './components/DashboardStats';
import QuestionCard from './components/QuestionCard';
import Library from './components/Library';
import UploadSection from './components/UploadSection';
import HeroSection from './components/HeroSection';
import SmartTutor from './components/SmartTutor';
import { sampleQuestions } from './data';
import { QuestionCategory, UserStats } from './types';
import { Bell, Bot, X, Trophy, Star } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [tutorOpen, setTutorOpen] = useState(false);
  
  // App State with Persistence
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const saved = localStorage.getItem('leen_current_q');
    return saved ? parseInt(saved) : 0;
  });

  const [stats, setStats] = useState<UserStats>(() => {
    const savedStats = localStorage.getItem('leen_stats');
    if (savedStats) {
        return JSON.parse(savedStats);
    }
    return {
        totalAnswered: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        categoryPerformance: {
        [QuestionCategory.Scientific]: { correct: 0, total: 0 },
        [QuestionCategory.Mathematical]: { correct: 0, total: 0 },
        [QuestionCategory.Verbal]: { correct: 0, total: 0 },
        [QuestionCategory.Flexibility]: { correct: 0, total: 0 },
        },
        streak: 0,
        xp: 0,
        level: 1
    };
  });

  const [wrongQuestionsIds, setWrongQuestionsIds] = useState<number[]>(() => {
      const saved = localStorage.getItem('leen_wrong_ids');
      return saved ? JSON.parse(saved) : [];
  });
  const [currentWrongIndex, setCurrentWrongIndex] = useState(0);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('leen_current_q', currentQuestionIndex.toString());
  }, [currentQuestionIndex]);

  useEffect(() => {
    localStorage.setItem('leen_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('leen_wrong_ids', JSON.stringify(wrongQuestionsIds));
  }, [wrongQuestionsIds]);


  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const calculateLevel = (xp: number) => Math.floor(xp / 100) + 1;

  const handleAnswer = (isCorrect: boolean) => {
    const currentQ = sampleQuestions[currentQuestionIndex];
    
    setStats(prev => {
      const newStats = { ...prev };
      // Ensure xp/level exist for old users
      newStats.xp = newStats.xp || 0;
      newStats.level = newStats.level || 1;

      newStats.totalAnswered += 1;
      const cat = currentQ.category;
      newStats.categoryPerformance[cat].total += 1;

      if (isCorrect) {
        newStats.correctAnswers += 1;
        newStats.categoryPerformance[cat].correct += 1;
        newStats.streak += 1;
        newStats.xp += 10 + (newStats.streak > 5 ? 5 : 0); // Bonus XP for streaks
        
        if(newStats.streak % 5 === 0) showNotification(`رائع! ${newStats.streak} إجابات صحيحة متتالية! 🔥`);
      } else {
        newStats.wrongAnswers += 1;
        newStats.streak = 0;
        newStats.xp += 2; // Participation points
        
        if (!wrongQuestionsIds.includes(currentQ.id)) {
            setWrongQuestionsIds(prev => [...prev, currentQ.id]);
            showNotification("تمت إضافة السؤال لقائمة المراجعة (Kill Mistakes) 🎯");
        }
      }

      // Check Level Up
      const newLevel = calculateLevel(newStats.xp);
      if (newLevel > newStats.level) {
        newStats.level = newLevel;
        showNotification(`🎉 مبروك! انتقلتِ للمستوى ${newLevel}!`);
      }

      return newStats;
    });
  };

  const handleKillMistakeAnswer = (isCorrect: boolean) => {
      if (isCorrect) {
          const solvedId = wrongQuestionsIds[currentWrongIndex];
          setTimeout(() => {
            setWrongQuestionsIds(prev => prev.filter(id => id !== solvedId));
            setCurrentWrongIndex(0); 
            showNotification("أحسنت! تم القضاء على الخطأ وحذفه من القائمة! 🎉");
          }, 1500); 
      } else {
          showNotification("حاولي مرة أخرى، لا تستسلمي! 💪");
      }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HeroSection onStart={() => setActiveTab('questions')} />;

      case 'dashboard':
        return <DashboardStats stats={stats} />;
      
      case 'questions':
      case 'focus': // Use same view for Focus Tests for now
      case 'similarities': // Use same view for now
        return (
          <div className="pb-20 animate-fade-in">
             {/* Enhanced Progress & Level Header */}
             <div className="p-4 max-w-3xl mx-auto">
               <div className="flex justify-between items-center mb-2">
                 <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-700 text-lg">{activeTab === 'focus' ? 'اختبارات التركيز' : activeTab === 'similarities' ? 'المتشابهات' : 'بنك الأسئلة الشامل'}</span>
                    <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full font-bold">مستوى {stats.level || 1}</span>
                 </div>
                 <span className="text-xs text-gray-400 font-medium">
                    السؤال {currentQuestionIndex + 1} من {sampleQuestions.length}
                 </span>
               </div>
               
               {/* Custom Styled Progress Bar */}
               <div className="relative w-full h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner border border-gray-200">
                  <div 
                    className="absolute top-0 right-0 h-full bg-gradient-to-l from-primary-400 via-primary-500 to-secondary-500 transition-all duration-700 ease-out flex items-center justify-end pr-1"
                    style={{ width: `${((currentQuestionIndex + 1) / sampleQuestions.length) * 100}%` }}
                  >
                    <div className="w-full h-full opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9InN0cmlwZXMiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBMODAgME0wIDQwTDQwIDQwTTAgMEw0MCAwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjc3RyaXBlcykiLz48L3N2Zz4=')]"></div>
                  </div>
               </div>
               <div className="flex justify-end mt-1">
                 <div className="text-[10px] text-gray-400 flex items-center gap-1">
                    <Trophy size={10} className="text-yellow-500"/>
                    استمري، أنتِ قريبة من المستوى التالي!
                 </div>
               </div>
             </div>

             <QuestionCard 
               question={sampleQuestions[currentQuestionIndex]}
               onAnswer={handleAnswer}
               onNext={() => setCurrentQuestionIndex(prev => Math.min(prev + 1, sampleQuestions.length - 1))}
               onPrev={() => setCurrentQuestionIndex(prev => Math.max(prev - 1, 0))}
               hasNext={currentQuestionIndex < sampleQuestions.length - 1}
               hasPrev={currentQuestionIndex > 0}
             />
          </div>
        );
      
      case 'killmistakes':
        const currentWrongId = wrongQuestionsIds[currentWrongIndex];
        const currentWrongQ = sampleQuestions.find(q => q.id === currentWrongId);

        return (
          <div className="p-6 max-w-4xl mx-auto animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
                <h2 className="text-3xl font-bold text-red-600">Kill Mistakes Mode 🎯</h2>
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">{wrongQuestionsIds.length} أخطاء متبقية</span>
            </div>
            
            {wrongQuestionsIds.length === 0 ? (
               <div className="bg-white p-12 rounded-[2rem] text-center shadow-lg border border-green-100 flex flex-col items-center animate-scale-in">
                 <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-5xl mb-6">🏆</div>
                 <h3 className="text-2xl font-bold text-gray-800 mb-2">سجل خالٍ من الأخطاء!</h3>
                 <p className="text-gray-500 mb-8 max-w-md">أنتِ مذهلة يا لين! لقد قمتِ بتصحيح جميع أخطائك.</p>
                 <button onClick={() => setActiveTab('questions')} className="px-8 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 shadow-lg transition-all">العودة للتحدي</button>
               </div>
            ) : (
               <div>
                  {currentWrongQ && (
                      <div key={currentWrongQ.id} className="animate-slide-up">
                        <QuestionCard 
                            question={currentWrongQ}
                            onAnswer={handleKillMistakeAnswer}
                            onNext={() => setCurrentWrongIndex(prev => (prev + 1) % wrongQuestionsIds.length)}
                            hasNext={wrongQuestionsIds.length > 1}
                            hasPrev={false}
                            isKillMistakesMode={true}
                        />
                      </div>
                  )}
               </div>
            )}
          </div>
        );

      case 'library':
      case 'lessons': // Shared
        return <Library stats={stats} />;
      
      case 'tutor':
        return <SmartTutor />;

      case 'upload':
      case 'lab':
        return <UploadSection />;

      default:
        return (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>سيتم تفعيل هذا القسم قريباً...</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#fdf4ff] text-right font-sans" dir="rtl">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      {notification && (
          <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-bounce border border-gray-700">
              {notification.includes('مستوى') ? <Star size={18} className="text-yellow-400 animate-spin-slow" /> : <Bell size={18} className="text-yellow-400" />}
              <span className="font-medium">{notification}</span>
          </div>
      )}
      
      <main className="flex-1 overflow-x-hidden relative flex flex-col">
        {/* Header Mobile */}
        <header className="lg:hidden bg-white/80 backdrop-blur-md p-4 shadow-sm flex items-center justify-between sticky top-0 z-30 border-b border-gray-100">
          <span className="font-bold text-primary-600 text-lg">Mabdaati Leen</span>
        </header>

        <div className="flex-1 container mx-auto py-2 md:py-6 px-2 md:px-6 overflow-y-auto custom-scrollbar">
           {renderContent()}
        </div>

        {/* Floating Smart Tutor Button (visible unless on tutor page) */}
        {activeTab !== 'tutor' && (
          <div className="fixed bottom-6 left-6 z-50">
             <button 
               onClick={() => setTutorOpen(!tutorOpen)}
               className="bg-secondary-600 hover:bg-secondary-700 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center relative group"
             >
               {tutorOpen ? <X size={28} /> : <Bot size={28} />}
               {!tutorOpen && (
                 <span className="absolute left-full ml-4 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity w-48 shadow-md">
                   لا تترددي في طرح أي سؤال. أنا هنا لمساعدتكِ في أي وقت!
                 </span>
               )}
             </button>
             
             {/* Modal Popup for Tutor */}
             {tutorOpen && (
               <div className="absolute bottom-16 left-0 w-[350px] md:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden animate-scale-in origin-bottom-left">
                  <div className="h-full">
                     <SmartTutor isFloating={true} />
                  </div>
               </div>
             )}
          </div>
        )}

      </main>
    </div>
  );
}

export default App;