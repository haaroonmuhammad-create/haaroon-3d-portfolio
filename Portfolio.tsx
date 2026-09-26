'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight, Award, BookOpen, Boxes, ChevronRight, Cpu, Download,
  ExternalLink, FlaskConical, GraduationCap, Layers3, Linkedin, Mail,
  Menu, MessageCircle, Phone, Sparkles, X
} from 'lucide-react';
import ProjectModal from './ProjectModal';
import { achievements, credentials, engineeringProjects, projects, skills, type Project } from '@/lib/data';

const nav = [
  ['Work', '#work'], ['Experience', '#experience'], ['Research', '#research'],
  ['Achievements', '#achievements'], ['Skills', '#skills'], ['About', '#about'], ['Contact', '#contact']
];

function SectionTitle({ kicker, title, copy }: { kicker: string; title: string; copy?: string }) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[.24em] text-[#7f9dff]">{kicker}</p>
      <h2 className="text-3xl font-semibold tracking-[-.035em] md:text-5xl">{title}</h2>
      {copy && <p className="mt-4 max-w-2xl text-base leading-7 text-[#A9B4C8]">{copy}</p>}
    </div>
  );
}

function ProjectCard({ project, onOpen, featured = false }: { project: Project; onOpen: () => void; featured?: boolean }) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileHover={{ y: -6 }}
      transition={{ duration: .24 }}
      className={`group overflow-hidden rounded-[30px] border border-white/[.09] bg-[#08152b] text-left shadow-[0_22px_60px_rgba(0,0,0,.22)] ${featured ? 'md:col-span-1' : ''}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0b1830]">
        <Image src={project.image} alt={`${project.title} 3D render`} fill className="project-image object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071225]/88 via-transparent to-transparent" />
        <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-[#061124]/70 px-3 py-2 text-[10px] font-semibold uppercase tracking-[.18em] text-white/70 backdrop-blur-md">{project.category}</div>
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[.18em] text-[#9fb5ff]">{project.eyebrow}</p>
            <h3 className="mt-1 text-2xl font-semibold tracking-tight text-white">{project.title}</h3>
          </div>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 bg-white/10 backdrop-blur transition group-hover:bg-[#295BFF]"><ArrowRight size={18}/></span>
        </div>
      </div>
      <div className="p-5 md:p-6">
        <p className="line-clamp-2 text-sm leading-6 text-[#A9B4C8]">{project.short}</p>
        <div className="mt-5 flex flex-wrap gap-2">{project.tags.slice(0,3).map(tag => <span key={tag} className="rounded-full border border-white/[.08] bg-white/[.03] px-3 py-1.5 text-[11px] text-white/55">{tag}</span>)}</div>
      </div>
    </motion.button>
  );
}

export default function Portfolio() {
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<Project | null>(null);
  const [credential, setCredential] = useState<(typeof credentials)[number] | null>(null);

  const featured = projects.filter(p => p.featured);
  const filters = ['All', 'Functional Products', 'Electronics', 'Everyday Products', 'Prototypes'];
  const filtered = useMemo(() => filter === 'All' ? projects : projects.filter(p => p.category === filter), [filter]);

  return (
    <main className="overflow-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10 tech-grid opacity-60" />

      <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 md:px-8">
        <div className="glass mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-3 md:px-6">
          <a href="#top" className="flex items-center gap-3 font-semibold tracking-tight">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#295BFF] text-xs shadow-[0_0_28px_rgba(41,91,255,.42)]">H3D</span>
            <span className="hidden sm:inline">HAAROON<span className="text-[#7899ff]">.3D</span></span>
          </a>
          <nav className="hidden items-center gap-6 lg:flex">{nav.map(([label, href]) => <a key={href} href={href} className="text-sm text-white/60 transition hover:text-white">{label}</a>)}</nav>
          <div className="flex items-center gap-2">
            <a href="/files/Haaroon_Muhammad_Resume.docx" download className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#071225] sm:inline-flex"><Download size={15}/> Resume</a>
            <button className="rounded-full border border-white/10 p-2.5 lg:hidden" aria-label="Toggle navigation" onClick={() => setMenu(v => !v)}>{menu ? <X size={18}/> : <Menu size={18}/>}</button>
          </div>
        </div>
        <AnimatePresence>{menu && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="glass mx-auto mt-2 max-w-7xl rounded-[26px] p-4 lg:hidden">{nav.map(([label, href]) => <a key={href} href={href} onClick={() => setMenu(false)} className="block rounded-xl px-4 py-3 text-sm text-white/80 hover:bg-white/5">{label}</a>)}</motion.div>}</AnimatePresence>
      </header>

      <section id="top" className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-14 px-5 pb-20 pt-32 md:px-8 lg:grid-cols-[1.05fr_.95fr]">
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#295BFF]/25 bg-[#295BFF]/10 px-4 py-2 text-xs font-medium text-[#9bb3ff]"><span className="h-2 w-2 rounded-full bg-[#6f92ff] shadow-[0_0_18px_#6f92ff]"/> Open to 3D Design & Product Development Internships</div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[.28em] text-white/45">3D Product Design · CAD · Additive Manufacturing</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-.055em] md:text-7xl xl:text-[82px]">I turn ideas into <span className="text-[#7595ff]">things you can hold.</span></h1>
          <p className="mt-6 text-xl font-medium text-white/90 md:text-2xl">3D Product & Prototype Designer</p>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[#A9B4C8] md:text-lg">I create functional products, prototypes and print-ready 3D models with a focus on form, function and manufacturability—while building a strong engineering foundation through academics, research and real internship work.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#work" className="inline-flex items-center gap-2 rounded-full bg-[#295BFF] px-6 py-3.5 text-sm font-semibold shadow-[0_16px_40px_rgba(41,91,255,.25)] transition hover:-translate-y-0.5 hover:bg-[#3b69ff]">Explore My Work <ArrowRight size={17}/></a>
            <a href="/files/Haaroon_Muhammad_Resume.docx" download className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-6 py-3.5 text-sm font-semibold transition hover:bg-white/[.08]"><Download size={16}/> Download Resume</a>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-white/50"><span>Chennai, Tamil Nadu</span><span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block"/><span>B.E. ECE · 2024–2028</span><span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block"/><span>8.98 / 10 CGPA</span></div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .12, duration: .7 }} className="relative mx-auto w-full max-w-[610px]">
          <div className="absolute inset-10 rounded-full bg-[#295BFF]/18 blur-[90px]" />
          <button onClick={() => setSelected(projects[0])} className="group relative z-10 block w-[84%] overflow-hidden rounded-[34px] border border-white/10 bg-[#0A1730] shadow-[0_35px_90px_rgba(0,0,0,.35)]">
            <div className="relative aspect-[4/3]"><Image src="/images/projects/pocket-organizer.png" alt="Pocket Organizer 3D render" fill priority className="object-cover transition duration-700 group-hover:scale-[1.035]"/></div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#061125] via-[#061125]/75 to-transparent p-6 pt-24 text-left"><p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#9bb3ff]">Featured Internship Project</p><div className="mt-1 flex items-center justify-between"><h2 className="text-2xl font-semibold">Pocket Organizer</h2><ArrowRight size={18}/></div></div>
          </button>
          <button onClick={() => setSelected(projects[2])} className="absolute -right-1 top-[9%] z-20 hidden w-[42%] overflow-hidden rounded-[26px] border border-white/10 bg-[#0A1730] shadow-2xl md:block"><div className="relative aspect-[4/3]"><Image src="/images/projects/mounting-bracket.png" alt="Mounting Bracket 3D render" fill className="object-cover"/></div><div className="p-4 text-left"><p className="text-[10px] uppercase tracking-[.18em] text-white/40">Functional</p><p className="mt-1 text-sm font-semibold">Mounting Bracket</p></div></button>
          <button onClick={() => setSelected(projects[1])} className="absolute -bottom-7 right-[5%] z-20 hidden w-[48%] overflow-hidden rounded-[26px] border border-white/10 bg-[#0A1730] shadow-2xl md:block"><div className="relative aspect-[4/3]"><Image src="/images/projects/esp32-enclosure.png" alt="ESP32 Enclosure 3D render" fill className="object-cover"/></div><div className="p-4 text-left"><p className="text-[10px] uppercase tracking-[.18em] text-white/40">ECE × Product Design</p><p className="mt-1 text-sm font-semibold">ESP32 Enclosure</p></div></button>
        </motion.div>
      </section>

      <section className="border-y border-white/[.07] bg-[#071225]/60">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 md:grid-cols-4 md:px-8">
          {[['2','Internships'],['8.98','CGPA / 10'],['2','Paper Presentations'],['11','Current 3D Designs']].map(([n,l],i) => <div key={l} className={`py-7 md:py-8 ${i%2===0?'border-r border-white/[.07]':''} md:border-r md:last:border-r-0`}><div className="text-center text-3xl font-semibold tracking-tight md:text-4xl">{n}</div><div className="mt-1 text-center text-xs uppercase tracking-[.13em] text-white/35">{l}</div></div>)}
        </div>
      </section>

      <section id="work" className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <SectionTitle kicker="Selected Work" title="Functional products with a clear purpose." copy="My strongest current projects—presented as products rather than engineering drawings. No measurement overlays, just the idea, the design story and the model itself." />
        <div className="grid gap-6 md:grid-cols-2">{featured.map(p => <ProjectCard key={p.slug} project={p} featured onOpen={() => setSelected(p)} />)}</div>
      </section>

      <section id="experience" className="border-y border-white/[.07] bg-[#071225]/48">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <SectionTitle kicker="Experience" title="Where 3D design became real work." copy="My most substantial practical 3D-design experience came from Union Software, where I worked across modelling, STL preparation and the CAD-to-print workflow." />
          <div className="grid gap-6 lg:grid-cols-[1.4fr_.6fr]">
            <div className="relative overflow-hidden rounded-[34px] border border-[#295BFF]/20 bg-[#0A1730] p-7 md:p-10">
              <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#295BFF]/14 blur-3xl" />
              <div className="relative">
                <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs uppercase tracking-[.22em] text-[#8ca7ff]">Primary Internship</p><h3 className="mt-3 text-3xl font-semibold">Union Software Educational Institute & Training Center</h3><p className="mt-2 text-white/45">3D Design Intern · July–August 2026 · Chennai</p></div><button onClick={() => setCredential(credentials[0])} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70 transition hover:bg-white/10">View Certificate</button></div>
                <p className="mt-7 max-w-3xl leading-8 text-[#B5C0D4]">Worked on functional 3D models, STL preparation and additive-manufacturing workflows. I used Blender and FreeCAD for modelling and Bambu Studio for slicing, support preparation and print workflow understanding. The Pocket Organizer was developed from a real company requirement during this internship.</p>
                <blockquote className="mt-9 max-w-3xl border-l-2 border-[#557dff] pl-6 text-2xl font-medium leading-10 tracking-tight text-white md:text-3xl">“I learned that a model can be functional and aesthetic at the same time.”</blockquote>
                <div className="mt-9 grid gap-3 sm:grid-cols-4">{['3D modelling','STL preparation','Bambu Studio','FDM workflow'].map(t => <div key={t} className="rounded-2xl border border-white/[.08] bg-white/[.035] px-4 py-4 text-sm text-white/70">{t}</div>)}</div>
              </div>
            </div>
            <div className="rounded-[34px] border border-white/[.08] bg-white/[.025] p-7 md:p-8">
              <p className="text-xs uppercase tracking-[.22em] text-white/35">Foundational Exposure</p>
              <h3 className="mt-4 text-2xl font-semibold">ShivPrema Industries</h3><p className="mt-2 text-sm text-white/40">June 2026 · Chennai</p>
              <p className="mt-6 text-sm leading-7 text-[#A9B4C8]">An earlier internship that gave me basic exposure to 3D printing technology, including SLA and FDM concepts. I keep this experience concise because my deeper design experience developed later at Union Software.</p>
              <button onClick={() => setCredential(credentials[1])} className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-[#91aaff]">View Internship Certificate <ChevronRight size={16}/></button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle kicker="Design Archive" title="Every current design, in one place." copy="Browse all 11 STL models. Recruiters and clients can open each project in an interactive viewer and download the STL." />
          <div className="flex max-w-full gap-2 overflow-x-auto pb-2 no-scrollbar">{filters.map(f => <button key={f} onClick={() => setFilter(f)} className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs transition ${filter===f?'border-[#295BFF] bg-[#295BFF] text-white':'border-white/10 bg-white/[.025] text-white/50 hover:text-white'}`}>{f}</button>)}</div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filtered.map(p => <ProjectCard key={p.slug} project={p} onOpen={() => setSelected(p)} />)}</div>
      </section>

      <section id="research" className="border-y border-white/[.07] bg-[#071225]/48">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="relative overflow-hidden rounded-[38px] border border-[#295BFF]/20 bg-[#091832] p-8 md:p-12">
            <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full bg-[#295BFF]/18 blur-[80px]" />
            <div className="relative grid gap-10 lg:grid-cols-[1.35fr_.65fr]">
              <div><div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#295BFF]/25 bg-[#295BFF]/10 px-4 py-2 text-xs text-[#9fb5ff]"><FlaskConical size={14}/> Ongoing Research</div><h2 className="max-w-4xl text-3xl font-semibold leading-tight tracking-[-.035em] md:text-5xl">Sustainable Design Guideline Framework for Support-Free Geometry Redesign in Material Extrusion Additive Manufacturing</h2><p className="mt-6 max-w-3xl leading-8 text-[#B5C0D4]">My research explores rule-based design guidance for rethinking support-intensive FDM geometry as more self-supporting forms, with an emphasis on reducing unnecessary support material while preserving functional intent and manufacturability.</p></div>
              <div className="grid grid-cols-2 gap-3 self-end">{[['Rule-Based','DfAM'],['Support','Reduction'],['Sustainable','Design'],['Material','Extrusion']].map(([a,b]) => <div key={a} className="rounded-[22px] border border-white/[.08] bg-white/[.035] p-5"><div className="text-lg font-semibold">{a}</div><div className="mt-1 text-sm text-white/40">{b}</div></div>)}</div>
            </div>
          </div>
        </div>
      </section>

      <section id="achievements" className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <SectionTitle kicker="Academics & Recognition" title="Strong academics. Active technical participation." copy="I want my portfolio to show that I’m developing practical design skills while continuing to perform strongly in academics, research and technical events." />
        <div className="grid gap-6 lg:grid-cols-[.72fr_1.28fr]">
          <div className="rounded-[34px] border border-white/[.08] bg-[#08152b] p-8"><GraduationCap className="text-[#7899ff]" size={28}/><div className="mt-8 text-[88px] font-semibold leading-none tracking-[-.065em]">8.98</div><p className="mt-2 text-lg text-white/40">CGPA / 10</p><div className="my-7 h-px bg-white/[.08]"/><p className="text-lg font-medium">B.E. Electronics & Communication Engineering</p><p className="mt-2 text-sm leading-6 text-[#A9B4C8]">SRM Easwari Engineering College · Chennai<br/>2024–2028</p></div>
          <div className="grid gap-4 md:grid-cols-2">{achievements.map(item => <div key={item.title} className="rounded-[28px] border border-white/[.08] bg-white/[.025] p-6"><div className="flex items-center justify-between"><span className="text-xs font-semibold text-[#7899ff]">{item.year}</span><Award size={18} className="text-white/20"/></div><h3 className="mt-5 text-lg font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-6 text-[#A9B4C8]">{item.description}</p></div>)}</div>
        </div>
        <div className="mt-12"><h3 className="text-2xl font-semibold">Engineering exploration beyond 3D design</h3><p className="mt-3 max-w-2xl text-sm leading-7 text-[#A9B4C8]">Academic projects that keep my product-design work grounded in my ECE background.</p><div className="mt-6 grid gap-4 md:grid-cols-3">{engineeringProjects.map(p => <div key={p.title} className="rounded-[26px] border border-white/[.08] bg-white/[.02] p-6"><Cpu className="text-[#7899ff]" size={22}/><h4 className="mt-6 font-semibold">{p.title}</h4><p className="mt-2 text-sm text-white/40">{p.meta}</p></div>)}</div></div>
      </section>

      <section id="skills" className="border-y border-white/[.07] bg-[#071225]/48">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <SectionTitle kicker="Technical Arsenal" title="Tools I use—and tools I’m actively developing." copy="Skill levels are shown honestly rather than using arbitrary percentage bars." />
          <div className="grid gap-5 lg:grid-cols-4">
            <div className="rounded-[28px] border border-white/[.08] bg-[#08152b] p-7 lg:col-span-2"><Boxes className="text-[#7899ff]"/><h3 className="mt-6 text-xl font-semibold">Core Design Tools</h3><div className="mt-6 grid gap-3 sm:grid-cols-2">{skills.core.map(([name,level]) => <div key={name} className="rounded-2xl border border-white/[.07] bg-white/[.025] p-4"><div className="font-medium">{name}</div><div className="mt-1 text-xs text-white/35">{level}</div></div>)}</div></div>
            <div className="rounded-[28px] border border-white/[.08] bg-[#08152b] p-7"><Sparkles className="text-[#7899ff]"/><h3 className="mt-6 text-xl font-semibold">Currently Developing</h3><div className="mt-6 space-y-4">{skills.learning.map(([name,level]) => <div key={name} className="border-b border-white/[.07] pb-4"><div>{name}</div><div className="mt-1 text-xs text-white/35">{level}</div></div>)}<div className="pt-1"><div className="text-xs uppercase tracking-[.18em] text-white/30">Also familiar with</div><div className="mt-3 flex flex-wrap gap-2">{skills.familiar.map(s => <span key={s} className="rounded-full bg-white/[.04] px-3 py-2 text-xs text-white/55">{s}</span>)}</div></div></div></div>
            <div className="rounded-[28px] border border-white/[.08] bg-[#08152b] p-7"><Layers3 className="text-[#7899ff]"/><h3 className="mt-6 text-xl font-semibold">Additive Workflow</h3><div className="mt-6 flex flex-wrap gap-2">{skills.workflow.map(s => <span key={s} className="rounded-full border border-white/[.08] bg-white/[.03] px-3 py-2 text-xs text-white/60">{s}</span>)}</div><p className="mt-6 text-xs leading-6 text-white/35">Experience is strongest in Bambu Studio, STL preparation and print workflow preparation; I do not present myself as an experienced printer operator.</p></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <SectionTitle kicker="Credentials" title="Certificates, papers & proof of experience." copy="Each card opens the original certificate you shared, so recruiters can verify the work without cluttering the main page." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{credentials.map(c => <button key={c.title} onClick={() => setCredential(c)} className="group overflow-hidden rounded-[26px] border border-white/[.08] bg-[#08152b] text-left transition hover:-translate-y-1 hover:border-[#295BFF]/35"><div className="relative aspect-[4/3] bg-white"><Image src={c.image} alt={c.title} fill className="object-contain p-2" sizes="(max-width: 768px) 100vw, 25vw"/></div><div className="p-5"><BookOpen size={18} className="text-[#7899ff]"/><h3 className="mt-5 font-medium leading-6">{c.title}</h3><p className="mt-2 text-xs leading-5 text-white/40">{c.meta}</p><div className="mt-5 flex items-center gap-2 text-xs text-white/55">View original <ExternalLink size={13}/></div></div></button>)}</div>
      </section>

      <section id="about" className="border-y border-white/[.07] bg-[#071225]/55">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div className="relative mx-auto w-full max-w-md"><div className="absolute -inset-6 rounded-[40px] bg-[#295BFF]/12 blur-3xl"/><div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[#0A1730]"><Image src="/images/profile.jpg" alt="Haaroon Muhammad" width={900} height={1100} className="h-auto w-full object-cover"/></div></div>
          <div><p className="text-xs font-semibold uppercase tracking-[.24em] text-[#7899ff]">About</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.035em] md:text-5xl">Designing, learning and building.</h2><p className="mt-6 max-w-2xl leading-8 text-[#A9B4C8]">I’m Haaroon Muhammad, an Electronics and Communication Engineering student developing my career around 3D product design, prototyping and additive manufacturing.</p><p className="mt-4 max-w-2xl leading-8 text-[#A9B4C8]">My current focus is on creating functional models that look considered, preparing designs for additive-manufacturing workflows, and building deeper knowledge of DfAM and sustainable 3D printing. I’m looking for industry environments where I can contribute, learn from experienced designers and grow through real product-development work.</p><div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 md:grid-cols-4">{[['Product Design','Focus'],['DfAM','Research'],['ECE','Foundation'],['Industry','Next Step']].map(([a,b]) => <div key={a} className="rounded-2xl border border-white/[.08] bg-white/[.025] p-4"><div className="font-medium">{a}</div><div className="mt-1 text-xs text-white/35">{b}</div></div>)}</div></div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <div className="relative overflow-hidden rounded-[40px] border border-[#295BFF]/20 bg-[#0A1730] px-7 py-14 md:px-14 md:py-20">
          <div className="absolute left-1/2 top-0 h-72 w-[520px] -translate-x-1/2 rounded-full bg-[#295BFF]/18 blur-[90px]"/>
          <div className="relative grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end"><div><p className="text-xs font-semibold uppercase tracking-[.24em] text-[#8aa5ff]">Next Opportunity</p><h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-.04em] md:text-6xl">I’m looking for my next opportunity to design, prototype and learn.</h2><p className="mt-6 max-w-2xl leading-8 text-[#A9B4C8]">Open to internship opportunities in 3D design, product development and additive manufacturing—and to relevant client enquiries for functional 3D models and prototype concepts.</p></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1"><a href="mailto:haaroonmuhammad@gmail.com" className="inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/[.04] px-5 py-4 text-sm font-medium transition hover:bg-white/[.08]"><span className="inline-flex items-center gap-3"><Mail size={17}/> Email</span><ArrowRight size={15}/></a><a href="https://www.linkedin.com/in/haaroon-muhammad-409319328" target="_blank" className="inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/[.04] px-5 py-4 text-sm font-medium transition hover:bg-white/[.08]"><span className="inline-flex items-center gap-3"><Linkedin size={17}/> LinkedIn</span><ArrowRight size={15}/></a><a href="tel:+919042553046" className="inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/[.04] px-5 py-4 text-sm font-medium transition hover:bg-white/[.08]"><span className="inline-flex items-center gap-3"><Phone size={17}/> +91 90425 53046</span><ArrowRight size={15}/></a><a href="https://wa.me/919042553046" target="_blank" className="inline-flex items-center justify-between rounded-2xl bg-[#295BFF] px-5 py-4 text-sm font-semibold transition hover:bg-[#3b69ff]"><span className="inline-flex items-center gap-3"><MessageCircle size={17}/> WhatsApp</span><ArrowRight size={15}/></a></div></div>
        </div>
      </section>

      <footer className="border-t border-white/[.07] px-5 py-8 text-center text-xs text-white/30">© 2026 Haaroon Muhammad · 3D Product & Prototype Designer · Chennai, India</footer>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
      <AnimatePresence>{credential && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[110] flex items-center justify-center bg-[#030712]/92 p-4 md:p-8" onClick={() => setCredential(null)}><motion.div initial={{scale:.98,y:12}} animate={{scale:1,y:0}} exit={{scale:.98,y:12}} className="relative max-h-[92vh] w-full max-w-5xl overflow-auto rounded-[28px] border border-white/10 bg-[#071225] p-3" onClick={e => e.stopPropagation()}><button onClick={() => setCredential(null)} className="absolute right-5 top-5 z-10 rounded-full bg-[#071225]/85 p-3 backdrop-blur" aria-label="Close credential"><X size={18}/></button><Image src={credential.image} alt={credential.title} width={1600} height={1200} className="h-auto w-full rounded-[20px] object-contain"/><div className="p-5"><h3 className="text-lg font-semibold">{credential.title}</h3><p className="mt-1 text-sm text-white/45">{credential.meta}</p></div></motion.div></motion.div>}</AnimatePresence>
    </main>
  );
}
