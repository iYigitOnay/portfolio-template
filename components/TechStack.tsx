import React from 'react';
import { SKILL_CATEGORIES } from '../constants';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';

const TechStack: React.FC = () => {
  return (
    <section id="stack" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24 space-y-6">
          <div className="inline-block px-4 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold tracking-[0.3em] uppercase border border-blue-100">
            Yetenekler & Araçlar
          </div>
          <h2 className="text-5xl font-extrabold text-slate-900 tracking-tight">Teknoloji Mimarisı</h2>
          <p className="text-slate-500 max-w-xl mx-auto font-light text-lg">
            Sistemleri kurgularken kullandığım modern mühendislik araçları.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((category, idx) => {
            const IconComponent = (Icons as any)[category.icon];
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="clean-card p-10 rounded-[2.5rem] group"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight">{category.title}</h3>
                
                <div className="space-y-4">
                  {category.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-3 text-slate-500 font-medium group/item">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-200 group-hover/item:bg-blue-600 transition-colors" />
                      {skill}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechStack;