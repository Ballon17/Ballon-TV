import React from 'react';
import { Tv, Radio, HelpCircle, AlertCircle, Zap, ShieldCheck } from 'lucide-react';

export const BroadcastGuide: React.FC = () => {
  return (
    <div className="mt-12 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <Zap className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-extrabold text-lg text-white">دليل البث المباشر والقنوات الناقلة يومياً</h3>
          <p className="text-xs text-slate-400">نصائح للحصول على أفضل تجربة مشاهدة بدون تقطيع على كافة الأجهزة</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2 font-bold text-emerald-400 mb-2">
            <Tv className="w-4 h-4" />
            <span>سيرفرات متعددة الجودات</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            نوفر لكل مباراة 4 إلى 5 سيرفرات بث مباشر، تتراوح من جودة FHD 1080p لأصحاب الشاشات الكبيرة والسرعات العالية، إلى سيرفرات SD خفيفة مخصصة للهواتف وباقات الإنترنت المحدودة.
          </p>
        </div>

        <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2 font-bold text-amber-400 mb-2">
            <Radio className="w-4 h-4" />
            <span>تحديث البث التلقائي</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            في حال حدوث أي تقطيع مفاجئ أثناء ذروة المشاهدة، قم بالضغط على زر "تحديث البث" في زاوية المشغل، أو اختر السيرفر البديل مباشرة دون الحاجة لتحديث الصفحة.
          </p>
        </div>

        <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2 font-bold text-blue-400 mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>تغطية شاملة لكافة البطولات</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            تغطية حية ومباشرة يومياً لدوري أبطال أوروبا، دوري روشن السعودي، الدوري الإنجليزي الممتاز، الدوري الإسباني، دوري أبطال أفريقيا، وكأس العالم مع المعلقين الرسميين.
          </p>
        </div>
      </div>
    </div>
  );
};
