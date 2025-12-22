
import React from 'react';
import { BLOG_POSTS } from '../constants';
import { ArrowRight, Clock, BookOpen, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Blog: React.FC = () => {
  return (
    <section id="blog" className="py-32 px-6 bg-white border-t border-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8 text-center md:text-left">
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold tracking-widest uppercase">
                    <BookOpen className="w-3 h-3" /> Bilgi Paylaşımı
                </div>
                <h2 className="text-5xl font-extrabold text-slate-900 tracking-tight">Technical Notes</h2>
                <p className="text-slate-500 max-w-md font-light">
                  Mühendislik süreçlerimden ve teknoloji dünyasından notlar.
                </p>
            </div>
            <button className="group px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">
                Tüm Yazıları Gör <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post, idx) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-8 rounded-[2.5rem] bg-slate-50/50 border border-blue-50/50 hover:bg-white hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Sparkles className="w-12 h-12 text-blue-600" />
              </div>

              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="px-4 py-1.5 rounded-xl bg-white text-blue-600 text-[10px] font-bold uppercase tracking-wider shadow-sm border border-blue-50">
                    {post.category}
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                    <Clock className="w-3 h-3" /> {post.readTime}
                </div>
              </div>

              <h3 className="text-2xl font-extrabold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors leading-snug">
                {post.title}
              </h3>
              
              <p className="text-slate-500 mb-8 line-clamp-2 font-light leading-relaxed">
                {post.excerpt}
              </p>

              <div className="pt-6 border-t border-blue-50/50 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-tighter">{post.date}</span>
                <span className="text-blue-600 flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                    OKUMAYA BAŞLA <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
