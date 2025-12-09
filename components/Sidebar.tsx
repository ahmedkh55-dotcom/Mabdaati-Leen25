import React from 'react';
import { 
  Home, 
  LayoutDashboard, 
  BookOpen, 
  Target, 
  BrainCircuit, 
  Upload, 
  Menu, 
  X, 
  Calendar, 
  ListChecks, 
  Lightbulb, 
  Bot, 
  StickyNote, 
  FlaskConical 
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'home', label: 'الرئيسية', icon: Home },
    { id: 'dashboard', label: 'لوحة التحليل', icon: LayoutDashboard },
    { id: 'library', label: 'المكتبة المرجعية', icon: BookOpen },
    { id: 'questions', label: 'بنك الأسئلة', icon: ListChecks },
    { id: 'lessons', label: 'مكتبة الدروس', icon: BookOpen }, // Shared component logic with Library
    { id: 'plans', label: 'الخطط الدراسية', icon: Calendar },
    { id: 'focus', label: 'اختبارات التركيز', icon: Target },
    { id: 'similarities', label: 'المتشابهات', icon: BrainCircuit },
    { id: 'tutor', label: 'المعلم الذكي', icon: Bot },
    { id: 'notes', label: 'مفكرة الأفكار', icon: StickyNote },
    { id: 'lab', label: 'مختبر المحتوى', icon: FlaskConical },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 bg-white rounded-full shadow-lg text-primary-600">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Container */}
      <div className={`
        fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        lg:relative lg:block
        border-l border-gray-100
      `}>
        <div className="flex flex-col h-full bg-white">
          <div className="p-6 text-center border-b border-gray-50">
             <div className="w-12 h-12 bg-primary-600 rounded-xl mx-auto mb-3 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-primary-200">
               L
             </div>
            <h1 className="text-xl font-bold text-gray-800">عالم لين المبدعة</h1>
            <p className="text-xs text-gray-400 mt-1">Mawhiba Mind</p>
          </div>

          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (window.innerWidth < 1024) setIsOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm
                  ${activeTab === item.id 
                    ? 'bg-primary-50 text-primary-700 border-r-4 border-primary-600' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}
                `}
              >
                <item.icon size={18} className={activeTab === item.id ? 'text-primary-600' : 'text-gray-400'} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-50 bg-gray-50/50">
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-400 to-secondary-400"></div>
               <div className="text-right">
                 <p className="text-sm font-bold text-gray-700">لين</p>
                 <p className="text-xs text-gray-400">الطالبة الموهوبة</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;