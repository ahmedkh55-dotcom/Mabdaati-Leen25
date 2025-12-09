import React, { useState } from 'react';
import { UploadCloud, File, CheckCircle, AlertCircle } from 'lucide-react';
import { analyzeUploadedFile } from '../services/geminiService';

const UploadSection = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setAnalysis('');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setAnalysis('');
    }
  };

  const processFile = async () => {
    if (!file) return;
    setLoading(true);
    
    // Simulate file reading for the demo (Real implementation needs FileReader for Base64)
    const reader = new FileReader();
    reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];
        const result = await analyzeUploadedFile(base64, file.type);
        setAnalysis(result);
        setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">إضافة مرفقات ومراجع</h2>
      
      <div 
        className={`border-3 border-dashed rounded-3xl p-10 text-center transition-all ${isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-gray-100 rounded-full text-gray-500">
            <UploadCloud size={48} />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-700">اسحب الملفات هنا أو اضغط للاختيار</p>
            <p className="text-sm text-gray-400 mt-1">ندعم PDF, Images, Word</p>
          </div>
          <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" accept=".pdf,image/*" />
          <label htmlFor="fileInput" className="cursor-pointer bg-primary-600 text-white px-6 py-2 rounded-xl hover:bg-primary-700 transition-colors">
            تصفح ملفاتك
          </label>
        </div>
      </div>

      {file && (
        <div className="mt-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <File className="text-secondary-500" />
             <span className="font-medium text-gray-700">{file.name}</span>
             <span className="text-xs text-gray-400">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
          </div>
          <button 
             onClick={processFile} 
             disabled={loading}
             className="px-4 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 disabled:opacity-50"
          >
            {loading ? 'جاري التحليل...' : 'تحليل وتوليد أسئلة'}
          </button>
        </div>
      )}

      {analysis && (
        <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg border-t-4 border-green-500 animate-slide-up">
           <div className="flex items-center gap-2 mb-4 text-green-600 font-bold">
             <CheckCircle />
             <h3>تحليل الذكاء الاصطناعي</h3>
           </div>
           <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
             {analysis}
           </div>
        </div>
      )}
    </div>
  );
};

export default UploadSection;