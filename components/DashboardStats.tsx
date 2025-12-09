import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { UserStats, QuestionCategory } from '../types';
import { Trophy, Star, Zap } from 'lucide-react';

interface DashboardStatsProps {
  stats: UserStats;
}

const COLORS = ['#ec4899', '#8b5cf6', '#14b8a6', '#f59e0b'];

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  const pieData = [
    { name: 'إجابات صحيحة', value: stats.correctAnswers },
    { name: 'إجابات خاطئة', value: stats.wrongAnswers },
  ];

  const barData = Object.entries(stats.categoryPerformance).map(([key, val]) => {
    // Explicitly cast val to match UserStats structure to avoid 'unknown' type error
    const data = val as { correct: number; total: number };
    return {
      name: key.split(' ')[1] || key, // Shorten name
      correct: data.correct,
      total: data.total
    };
  });

  // Safe percentage calculation
  const completionRate = stats.totalAnswered > 0 
    ? Math.round((stats.correctAnswers / stats.totalAnswered) * 100) 
    : 0;

  // Level Calculations
  const currentLevel = stats.level || 1;
  const currentXP = stats.xp || 0;
  const nextLevelXP = currentLevel * 100; // Simplified logic: every 100 xp is a level for display context (actual logic is floor/100)
  const progressToNextLevel = (currentXP % 100);

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        لوحة الإنجاز - يا مبدعة! <Star className="text-yellow-400 fill-yellow-400" />
      </h2>

      {/* Level Banner */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
        <div className="flex justify-between items-center relative z-10">
            <div>
                <p className="text-indigo-100 font-medium mb-1">المستوى الحالي</p>
                <h3 className="text-4xl font-bold">المستوى {currentLevel}</h3>
                <p className="text-sm mt-2 opacity-90">{currentXP} نقطة خبرة (XP)</p>
            </div>
            <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                <Trophy size={48} className="text-yellow-300" />
            </div>
        </div>
        <div className="mt-6">
            <div className="flex justify-between text-xs mb-1 opacity-80">
                <span>التقدم للمستوى {currentLevel + 1}</span>
                <span>{progressToNextLevel}/100</span>
            </div>
            <div className="w-full bg-black/20 rounded-full h-3 overflow-hidden">
                <div 
                    className="bg-yellow-400 h-full rounded-full transition-all duration-1000" 
                    style={{ width: `${progressToNextLevel}%` }}
                ></div>
            </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary-100 flex items-center justify-between">
          <div>
             <p className="text-gray-500 mb-2">إجمالي الأسئلة</p>
             <p className="text-4xl font-bold text-primary-600">{stats.totalAnswered}</p>
          </div>
          <div className="p-3 bg-primary-50 rounded-xl text-primary-500">
             <PieChart width={24} height={24} /> {/* Placeholder icon */}
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-secondary-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 mb-2">دقة الإجابات</p>
            <p className="text-4xl font-bold text-secondary-600">{completionRate}%</p>
          </div>
          <div className="p-3 bg-secondary-50 rounded-xl text-secondary-500">
             <Zap />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-yellow-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 mb-2">حماس الاستمرارية</p>
            <p className="text-4xl font-bold text-yellow-500">{stats.streak} 🔥</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Pie */}
        <div className="bg-white p-6 rounded-2xl shadow-sm h-80 border border-gray-100">
          <h3 className="font-bold text-gray-700 mb-4 border-b pb-2">توزيع الإجابات</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : '#ef4444'} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Categories Bar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm h-80 border border-gray-100">
          <h3 className="font-bold text-gray-700 mb-4 border-b pb-2">الأداء حسب المحور</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
              <Bar dataKey="correct" stackId="a" fill="#8b5cf6" radius={[0, 4, 4, 0]} name="صحيح" />
              <Bar dataKey="total" stackId="a" fill="#f3f4f6" radius={[0, 4, 4, 0]} name="إجمالي" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;