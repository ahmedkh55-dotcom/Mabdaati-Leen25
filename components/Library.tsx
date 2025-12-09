import React, { useState } from 'react';
import { 
  Book, FileText, Video, Image as ImageIcon, Printer, Download, 
  Sparkles, Brain, Search, Filter, Calculator, Scroll, Scale, 
  Sigma, Lightbulb, Share2, ClipboardList, AlertCircle 
} from 'lucide-react';
import { UserStats } from '../types';
import { generateStudentReport } from '../services/geminiService';

interface LibraryProps {
  stats?: UserStats;
}

const Library: React.FC<LibraryProps> = ({ stats }) => {
  const [report, setReport] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [showSelfAssessment, setShowSelfAssessment] = useState(false);

  const items = [
    { type: 'lesson', title: 'أساسيات الاستدلال اللغوي', icon: Book, color: 'text-blue-500', bg: 'bg-blue-50', category: 'verbal' },
    { type: 'summary', title: 'قوانين الحركة والسرعة', icon: FileText, color: 'text-green-500', bg: 'bg-green-50', category: 'scientific' },
    { type: 'mindmap', title: 'خريطة ذهنية: العلاقات المكانية', icon: ImageIcon, color: 'text-purple-500', bg: 'bg-purple-50', category: 'spatial' },
    { type: 'video', title: 'شرح المرونة العقلية (فيديو)', icon: Video, color: 'text-red-500', bg: 'bg-red-50', category: 'flexibility' },
    { type: 'lesson', title: 'المتتالية والأنماط', icon: Book, color: 'text-blue-500', bg: 'bg-blue-50', category: 'math' },
    { type: 'summary', title: 'ملخص التناظر اللفظي', icon: FileText, color: 'text-green-500', bg: 'bg-green-50', category: 'verbal' },
  ];

  // Updated concepts with hints and richer data for export
  const concepts = [
    { title: 'قانون السرعة', category: 'فيزياء', content: 'السرعة = المسافة ÷ الزمن', hint: 'تذكري مثلث السرعة!', icon: Calculator, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'التناظر اللفظي', category: 'لغوي', content: 'أ : ب تقابل ج : د (علاقة مماثلة)', hint: 'كوني جملة تربط الكلمتين.', icon: Scroll, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: 'الفرق بين مربعين', category: 'رياضيات', content: 'س² - ص² = (س-ص)(س+ص)', hint: 'تحليل جبري هام.', icon: Sigma, color: 'text-rose-600', bg: 'bg-rose-50' },
    { title: 'استراتيجية الاستبعاد', category: 'عام', content: 'حذف إجابتين خاطئتين لزيادة الفرصة.', hint: 'ابدئي بالخيارات المستحيلة.', icon: Scale, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.includes(searchTerm);
    const matchesFilter = filter === 'all' || item.category === filter;
    return matchesSearch && matchesFilter;
  });

  const handleGenerateReport = async () => {
    if (!stats) return;
    setLoading(true);
    const result = await generateStudentReport(stats);
    setReport(result);
    setLoading(false);
  };

  const handlePrint = () => {
    const printContent = document.getElementById('printable-report');
    if (printContent) {
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContent.innerHTML;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); 
    }
  };

  // Generic Export Function
  const handleExportData = (type: 'concepts' | 'items' | 'report') => {
    let dataStr = "";
    let filename = "";

    if (type === 'concepts') {
      dataStr = "Concept,Category,Formula/Definition,Hint\n" + 
                concepts.map(c => `${c.title},${c.category},"${c.content}","${c.hint}"`).join("\n");
      filename = "concepts_export.csv";
    } else if (type === 'items') {
       dataStr = "Title,Type,Category\n" + 
                items.map(i => `${i.title},${i.type},${i.category}`).join("\n");
       filename = "library_resources.csv";
    } else if (type === 'report' && report) {
       dataStr = report;
       filename = "student_report.txt"; // Markdown text
    }

    if (!dataStr) {
      alert("لا توجد بيانات للتصدير حالياً.");
      return;
    }

    const blob = new Blob([dataStr], { type: 'text/csv;charset=utf-8;' }); // Basic encoding
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 animate-fade-in space-y-8">
      
      {/* Report Generation Section */}
      {stats && (
        <div className="bg-white rounded-3xl p-8 shadow-md border border-secondary-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 relative z-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Sparkles className="text-yellow-500" />
                تقرير المعلم الذكي
              </h2>
              <p className="text-gray-500 mt-1">احصلي على تحليل شامل لأدائك مع خطة دراسية ومراجعات.</p>
            </div>
            <div className="flex gap-2">
                <button 
                onClick={handleGenerateReport}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-secondary-500 to-primary-500 text-white rounded-xl font-bold hover:shadow-lg transform transition hover:-translate-y-1 disabled:opacity-50 flex items-center gap-2"
                >
                {loading ? <span className="animate-spin">⌛</span> : <Brain />}
                {loading ? 'جاري التحليل...' : 'توليد تقرير الإنجاز'}
                </button>
            </div>
          </div>

          {report && (
            <div className="animate-slide-up">
              <div id="printable-report" className="bg-gray-50 p-8 rounded-2xl border border-gray-200 prose max-w-none font-sans mb-4">
                <div className="text-center mb-6 border-b pb-4">
                  <h1 className="text-3xl font-bold text-primary-600 mb-2">تقرير إنجاز الطالبة الموهوبة</h1>
                  <p className="text-gray-500">منصة مبدعتي لين - Mawhiba Prep</p>
                </div>
                <div dangerouslySetInnerHTML={{ __html: report.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\#\# (.*?)/g, '<h3 class="text-xl font-bold mt-4">$1</h3>') }} />
              </div>
              
              <div className="flex flex-wrap gap-4 justify-end">
                <button onClick={() => handleExportData('report')} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                   <Download size={18} /> حفظ نصي
                </button>
                <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900">
                  <Printer size={18} /> طباعة / PDF
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Library Resources Header with Search */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
         <div>
            <h3 className="text-xl font-bold text-gray-700">المصادر التعليمية</h3>
            <p className="text-xs text-gray-400">تصفحي الدروس، الملخصات، والفيديوهات</p>
         </div>
         <div className="flex flex-wrap gap-2">
           <button onClick={() => setShowSelfAssessment(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 text-sm transition-colors">
             <ClipboardList size={16} /> تقييم ذاتي سريع
           </button>
           <button onClick={() => handleExportData('items')} className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 text-sm transition-colors">
             <Download size={16} /> تصدير القائمة
           </button>
         </div>
      </div>

      {/* Self Assessment Modal Mockup */}
      {showSelfAssessment && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full animate-scale-in">
                  <div className="flex items-center gap-2 mb-4 text-indigo-600">
                      <Brain size={24} />
                      <h3 className="text-lg font-bold">تقييم ذاتي للمكتبة</h3>
                  </div>
                  <p className="text-gray-600 mb-6">هل أتممتِ مراجعة "قوانين الحركة" و "الاستدلال اللغوي"؟ سيقوم النظام بتوليد 5 أسئلة مراجعة سريعة.</p>
                  <div className="flex justify-end gap-3">
                      <button onClick={() => setShowSelfAssessment(false)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg">إلغاء</button>
                      <button onClick={() => { setShowSelfAssessment(false); alert("سيتم نقلك لصفحة الاختبار المصغر (محاكاة)"); }} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">ابدأ التقييم</button>
                  </div>
              </div>
          </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="ابحثي عن درس، ملخص، فيديو..." 
            className="w-full pl-4 pr-10 py-2 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary-300 transition-shadow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {['all', 'verbal', 'scientific', 'math', 'spatial'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-colors border ${filter === f ? 'bg-primary-100 text-primary-700 border-primary-200 font-bold' : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'}`}
            >
              {f === 'all' ? 'الكل' : f === 'verbal' ? 'لغوي' : f === 'scientific' ? 'علمي' : f === 'math' ? 'رياضي' : 'مكاني'}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer flex items-center gap-4 group">
            <div className={`p-3 rounded-xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
              <item.icon size={24} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-700 group-hover:text-primary-600 transition-colors">{item.title}</h4>
              <p className="text-xs text-gray-400 mt-1 uppercase flex items-center gap-1">
                  {item.category}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-8"></div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-700 flex items-center gap-2">
            <Lightbulb size={24} className="text-yellow-500" />
            المفاهيم الأساسية (Flash Cards)
        </h3>
        <button onClick={() => handleExportData('concepts')} className="text-sm text-primary-600 hover:underline flex items-center gap-1">
            <Download size={14} /> تصدير المفاهيم
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         {concepts.map((item, idx) => (
           <div key={idx} className="group relative bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-primary-200 transition-all hover:shadow-md">
             {/* Quick Hint Tooltip on Hover */}
             <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="relative group/hint">
                    <AlertCircle size={18} className="text-gray-300 hover:text-yellow-500 cursor-help" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-gray-800 text-white text-xs p-2 rounded-lg hidden group-hover/hint:block z-20">
                        {item.hint}
                    </div>
                 </div>
             </div>

             <div className={`w-12 h-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
               <item.icon size={24} />
             </div>
             <h4 className="font-bold text-gray-800 mb-1">{item.title}</h4>
             <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-500 rounded-md mb-2 inline-block">{item.category}</span>
             <div className="bg-gray-50 p-3 rounded-lg text-center mt-2 group-hover:bg-yellow-50 transition-colors">
                <p className="text-sm text-gray-600 font-mono" dir="ltr">{item.content}</p>
             </div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default Library;