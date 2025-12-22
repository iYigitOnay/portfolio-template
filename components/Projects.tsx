
import React from 'react';
import { PROJECTS } from '../constants';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, Layers } from 'lucide-react';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold tracking-widest uppercase border border-blue-100">
                    <Layers className="w-3 h-3" /> Portfolyo
                </div>
                <h2 className="text-6xl font-extrabold text-slate-900 tracking-tight">Seçilmiş Çalışmalar</h2>
            </div>
            <p className="text-slate-500 max-w-sm font-light text-lg">Akademik başarılar ve ölçeklenebilir mimari çözümler.</p>
        </div>

        <div className="grid grid-cols-1 gap-16">
          {PROJECTS.map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col lg:flex-row gap-16 bg-white rounded-[3.5rem] p-10 md:p-16 border border-blue-50 shadow-sm hover:shadow-2xl hover:border-blue-100 transition-all duration-700 ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="flex-1 space-y-10">
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-1.5 rounded-xl bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest border border-blue-100">{project.backend[0]}</span>
                    <span className="px-4 py-1.5 rounded-xl bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest border border-emerald-100">Ar-Ge Süreci</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">{project.title}</h3>
                </div>
                
                <p className="text-slate-500 text-xl leading-relaxed font-light italic border-l-4 border-blue-100 pl-6">
                  "{project.summary}"
                </p>

                <div className="space-y-4">
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em]">Mühendislik Çözümü</h4>
                    <p className="text-slate-600 leading-relaxed font-medium text-lg">{project.solution}</p>
                </div>

                <div className="flex items-center gap-6 pt-6">
                  <button className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-extrabold flex items-center gap-3 hover:bg-slate-900 transition-all shadow-xl shadow-blue-100">
                    Detayları Görüntüle <ArrowRight className="w-5 h-5" />
                  </button>
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-sm transition-colors group">
                      <Github className="w-6 h-6" />
                      <span className="border-b border-transparent group-hover:border-blue-600">Kaynak Kodu</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="flex-1 relative group">
                <div className="aspect-[16/10] lg:aspect-square rounded-[2.5rem] overflow-hidden border border-blue-50 bg-slate-50 relative">
                    <img 
                        src={project.architectureImageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-110 group-hover:scale-100" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
