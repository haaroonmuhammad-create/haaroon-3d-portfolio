'use client';

import Image from 'next/image';
import { X, Download, Rotate3D } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ModelViewer from './ModelViewer';
import type { Project } from '@/lib/data';

export default function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030712]/92 p-3 md:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div className="glass max-h-[94vh] w-full max-w-6xl overflow-y-auto rounded-[32px] p-3 md:p-5 no-scrollbar" initial={{ y: 24, opacity: 0, scale: .985 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 20, opacity: 0, scale: .985 }} transition={{ duration: .25 }} onClick={(e) => e.stopPropagation()}>
            <div className="relative overflow-hidden rounded-[26px] border border-white/10">
              <div className="relative aspect-[16/7] min-h-[250px]"><Image src={project.image} alt={`${project.title} cover render`} fill className="object-cover" priority/></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#061125] via-[#061125]/15 to-transparent"/>
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 md:p-7"><div><p className="text-[11px] uppercase tracking-[.2em] text-[#9fb5ff]">{project.eyebrow}</p><h2 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">{project.title}</h2></div><button onClick={onClose} aria-label="Close project" className="rounded-full border border-white/15 bg-[#071225]/75 p-3 backdrop-blur hover:bg-[#071225]"><X size={20}/></button></div>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-[1.05fr_.95fr]">
              <div className="relative min-h-[430px] overflow-hidden rounded-[28px] border border-white/10"><ModelViewer url={project.model} autoRotate /><div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/10 bg-[#071225]/75 px-3 py-2 text-xs text-white/65 backdrop-blur"><Rotate3D size={14}/> Drag to rotate · Scroll to zoom</div></div>
              <div className="rounded-[28px] border border-white/10 bg-white/[.025] p-6 md:p-8">
                <div className="grid gap-5 sm:grid-cols-2"><div><p className="text-[10px] uppercase tracking-[.2em] text-white/30">Context</p><p className="mt-2 text-sm leading-6 text-[#B5C0D4]">{project.context}</p></div><div><p className="text-[10px] uppercase tracking-[.2em] text-white/30">My Role</p><p className="mt-2 text-sm leading-6 text-[#B5C0D4]">{project.role}</p></div></div>
                <div className="my-6 h-px bg-white/[.08]"/>
                <p className="text-sm leading-7 text-[#A9B4C8]">{project.story}</p>
                <p className="mb-3 mt-7 text-[10px] uppercase tracking-[.2em] text-white/30">Workflow</p>
                <div className="flex flex-wrap gap-2">{project.process.map((step, i) => <span key={step} className="rounded-full border border-white/10 bg-white/[.035] px-3 py-2 text-xs text-white/70">{String(i+1).padStart(2,'0')} · {step}</span>)}</div>
                <p className="mb-3 mt-7 text-[10px] uppercase tracking-[.2em] text-white/30">Focus</p>
                <div className="flex flex-wrap gap-2">{project.tags.map(tag => <span key={tag} className="rounded-full bg-[#295BFF]/10 px-3 py-2 text-xs text-[#9fb5ff]">{tag}</span>)}</div>
                {project.learning && <div className="mt-7 rounded-[20px] border border-[#295BFF]/20 bg-[#295BFF]/[.07] p-5"><p className="text-[10px] uppercase tracking-[.2em] text-[#8ca7ff]">What I learned</p><p className="mt-2 text-sm leading-6 text-[#C2CAE0]">{project.learning}</p></div>}
                <a href={project.model} download className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#295BFF] px-5 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#3b69ff]"><Download size={16}/> Download STL</a>
                {project.slug === 'pocket-organizer' && <p className="mt-3 text-center text-[11px] leading-5 text-white/30">Company-order design: keep public download enabled only if sharing permission is confirmed.</p>}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
