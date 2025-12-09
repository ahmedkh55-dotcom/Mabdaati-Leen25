import React from 'react';
import { ArrowRight, Sparkles, Brain, Zap, Target } from 'lucide-react';

interface HeroSectionProps {
  onStart: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStart }) => {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-50 to-transparent -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-50 rounded-full blur-3xl opacity-50 -z-10"></div>
      
      <div className="container mx-auto px-6 text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-8 animate-fade-in-down border border-primary-100">
          <Sparkles className="text-yellow-500" size={18} />
          <span className="text-sm font-medium text-gray-600">مرحباً بك في عالمك الإبداعي</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight animate-fade-in-up">
          أطلقي العنان <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
            لموهبتكِ
          </span>
        </h1>

        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-100">
          هنا تبدأ رحلتك نحو التميز. استكشفي، تعلمي، وتحدي نفسك لتصبحي النسخة الأفضل من ذاتك في رحلة الاستعداد لاختبار موهبة.
        </p>

        <button 
          onClick={onStart}
          className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white transition-all duration-200 bg-primary-600 font-pj rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 hover:bg-primary-700 shadow-xl hover:shadow-2xl hover:-translate-y-1 animate-bounce-slight"
        >
          ابدئي التحدي
          <ArrowRight className="mr-3 group-hover:translate-x-[-4px] transition-transform" />
          <div className="absolute -top-3 -right-3 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
        </button>

        {/* Feature Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
           {[
             { icon: Brain, label: "ذكاء اصطناعي", color: "text-purple-500" },
             { icon: Target, label: "600+ سؤال", color: "text-red-500" },
             { icon: Zap, label: "تحليل فوري", color: "text-yellow-500" },
             { icon: Sparkles, label: "خطط مخصصة", color: "text-blue-500" }
           ].map((item, i) => (
             <div key={i} className="flex flex-col items-center gap-2 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white shadow-sm hover:shadow-md transition-all">
                <item.icon className={item.color} size={28} />
                <span className="font-bold text-gray-700">{item.label}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;