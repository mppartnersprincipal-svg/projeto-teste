import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search, TrendingUp, BarChart2, Globe, Code2, MapPin,
  ChevronDown, CheckCircle, ArrowRight, Star, Users,
  Zap, Target, LineChart, FileSearch, Settings, Link2
} from 'lucide-react'

// ─── Scroll animation hook ────────────────────────────────────────────────────
function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// ─── Counter ──────────────────────────────────────────────────────────────────
function Counter({ end, suffix = '', prefix = '' }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        let start = 0
        const duration = 2000
        const step = Math.ceil(end / (duration / 16))
        const timer = setInterval(() => {
          start += step
          if (start >= end) { setCount(end); clearInterval(timer) }
          else setCount(start)
        }, 16)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end])

  return <span ref={ref}>{prefix}{count.toLocaleString('pt-BR')}{suffix}</span>
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-100 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 pr-4" style={{ fontFamily: 'Syne, sans-serif' }}>{q}</span>
        <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
          {a}
        </div>
      )}
    </div>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-black/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-brand-gradient rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>A</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
            APEX<span className="text-gradient">360</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {['Serviços', 'Cases', 'Sobre', 'Contato'].map((link) => (
            <Link key={link} to={`/#${link.toLowerCase()}`} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              {link}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <a href="#contato" className="bg-brand-gradient text-white text-sm font-semibold px-5 py-2.5 rounded hover:opacity-90 transition-opacity">
            Fale Conosco
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2">
          <div className={`w-5 h-0.5 bg-white mb-1.5 transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-5 h-0.5 bg-white mb-1.5 transition-all ${open ? 'opacity-0' : ''}`} />
          <div className={`w-5 h-0.5 bg-white transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#0A0A0A] border-t border-white/10 px-6 py-6 flex flex-col gap-4">
          {['Serviços', 'Cases', 'Sobre', 'Contato'].map((link) => (
            <Link key={link} to={`/#${link.toLowerCase()}`} onClick={() => setOpen(false)} className="text-base font-medium text-gray-300 hover:text-white">
              {link}
            </Link>
          ))}
          <a href="#contato" onClick={() => setOpen(false)} className="bg-brand-gradient text-white text-sm font-semibold px-5 py-3 rounded text-center mt-2">
            Fale Conosco
          </a>
        </div>
      )}
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #FF4D00 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] opacity-5"
          style={{ background: 'radial-gradient(circle, #E8002D 0%, transparent 70%)' }} />
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded px-3 py-1.5 mb-8">
            <Search className="w-3.5 h-3.5 text-[#FF4D00]" />
            <span className="text-gray-400 text-xs font-medium tracking-wider uppercase">SEO — Search Engine Optimization</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.05] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
            Apareça em{' '}
            <span className="text-gradient">primeiro</span>{' '}
            no Google
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-2xl">
            Estratégias de SEO que colocam sua empresa no topo das buscas orgânicas,
            geram tráfego qualificado e convertem visitantes em clientes. Resultado duradouro,
            sem depender só de anúncios.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#contato" className="bg-brand-gradient text-white font-semibold px-8 py-4 rounded hover:opacity-90 transition-opacity text-base">
              Quero rankear agora
            </a>
            <a href="#servicos" className="border border-white/20 text-white font-semibold px-8 py-4 rounded hover:bg-white/5 transition-colors text-base">
              Ver serviços
            </a>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-8 max-w-md">
            {[
              { label: 'Posições ganhas', value: '+', num: 12000 },
              { label: 'Clientes ativos', value: '', num: 87 },
              { label: 'Tráfego médio gerado', value: 'x', num: 4 },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>
                  {s.value === '+' && <Counter end={s.num} prefix="+" />}
                  {s.value === '' && <Counter end={s.num} />}
                  {s.value === 'x' && <Counter end={s.num} suffix="x" />}
                </div>
                <div className="text-gray-500 text-xs leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── O que é SEO ──────────────────────────────────────────────────────────────
function WhatIsSEO() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-on-scroll">
            <span className="text-[#FF4D00] text-sm font-semibold tracking-widest uppercase mb-4 block">O que é SEO?</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              Visibilidade orgânica que gera crescimento real
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              SEO (Search Engine Optimization) é o conjunto de técnicas que fazem seu site aparecer nas primeiras posições do Google e outros buscadores — sem pagar por cada clique.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Enquanto os anúncios param quando você para de pagar, o SEO constrói uma presença digital sólida e duradoura. Cada conteúdo otimizado, cada link conquistado e cada melhoria técnica acumula autoridade para sua marca ao longo do tempo.
            </p>
            <div className="space-y-3">
              {[
                'Tráfego qualificado 24h por dia, 7 dias por semana',
                'Menor custo por aquisição a longo prazo',
                'Autoridade e credibilidade de marca',
                'Resultados cumulativos e sustentáveis',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FF4D00] flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-on-scroll stagger-2">
            <div className="bg-[#0A0A0A] rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 opacity-10"
                style={{ background: 'radial-gradient(circle, #FF4D00, transparent 70%)' }} />
              <div className="text-gray-400 text-sm mb-6 font-mono">// Resultado orgânico Google</div>
              <div className="space-y-4">
                {[
                  { pos: 1, site: 'seusite.com.br', clicks: '31%', color: '#FF4D00' },
                  { pos: 2, site: 'concorrente1.com', clicks: '24%', color: '#FF4D00' },
                  { pos: 3, site: 'concorrente2.com', clicks: '18%', color: '#ff6b35' },
                  { pos: 4, site: 'concorrente3.com', clicks: '10%', color: '#666' },
                  { pos: 5, site: 'concorrente4.com', clicks: '6%', color: '#444' },
                ].map((r) => (
                  <div key={r.pos} className="flex items-center gap-4">
                    <span className="text-gray-600 text-sm w-4 font-mono">{r.pos}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-sm ${r.pos <= 2 ? 'text-white font-semibold' : 'text-gray-500'}`}>{r.site}</span>
                        <span className="text-xs text-gray-500">{r.clicks} dos cliques</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-1.5">
                        <div className="h-1.5 rounded-full transition-all duration-1000"
                          style={{ width: r.clicks, backgroundColor: r.color }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-white/10 text-center">
                <span className="text-gray-500 text-xs">Os 3 primeiros resultados capturam +73% dos cliques</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Serviços SEO ─────────────────────────────────────────────────────────────
const services = [
  {
    icon: FileSearch,
    title: 'SEO On-Page',
    description: 'Otimização completa de cada página: títulos, meta tags, headings, estrutura de URL, conteúdo, imagens e linkagem interna para máxima relevância.',
    items: ['Pesquisa e estratégia de palavras-chave', 'Otimização de títulos e meta descriptions', 'Estruturação de headings (H1–H6)', 'Otimização de imagens e alt texts', 'Linkagem interna estratégica'],
  },
  {
    icon: Code2,
    title: 'SEO Técnico',
    description: 'Garante que os mecanismos de busca consigam rastrear, indexar e compreender seu site. Base sólida para qualquer estratégia SEO.',
    items: ['Auditoria técnica completa', 'Core Web Vitals e velocidade', 'Sitemap XML e robots.txt', 'Dados estruturados (Schema.org)', 'Mobile-first e HTTPS'],
  },
  {
    icon: Link2,
    title: 'Link Building',
    description: 'Construção de autoridade por meio de backlinks relevantes e de alta qualidade, aumentando a credibilidade do seu domínio perante o Google.',
    items: ['Prospecção de links qualificados', 'Guest posts em portais relevantes', 'Digital PR e assessoria de imprensa', 'Recuperação de links perdidos', 'Análise de perfil de backlinks'],
  },
  {
    icon: FileSearch,
    title: 'SEO de Conteúdo',
    description: 'Criação e otimização de conteúdo estratégico que atrai, engaja e converte o público certo em cada etapa do funil de compra.',
    items: ['Estratégia de conteúdo por funil', 'Produção de artigos otimizados', 'Atualização de conteúdo existente', 'Calendário editorial SEO', 'Cluster de tópicos e pillar pages'],
  },
  {
    icon: MapPin,
    title: 'SEO Local',
    description: 'Apareça nas buscas de quem está perto de você. Ideal para negócios físicos ou que atendem regiões específicas.',
    items: ['Otimização do Google Meu Negócio', 'Citations e diretórios locais', 'Avaliações e reputação online', 'Conteúdo geolocalizado', 'Palavras-chave por cidade/bairro'],
  },
  {
    icon: Globe,
    title: 'SEO Internacional',
    description: 'Expanda para novos mercados globais com estratégias de SEO multiidioma, hreflang e otimização por país e idioma.',
    items: ['Implementação de hreflang', 'Estratégia por país/idioma', 'Análise de concorrência global', 'CDN e performance internacional', 'Conteúdo adaptado por mercado'],
  },
]

function Services() {
  return (
    <section id="servicos" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-on-scroll">
          <span className="text-[#FF4D00] text-sm font-semibold tracking-widest uppercase mb-4 block">Nossos Serviços</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-5" style={{ fontFamily: 'Syne, sans-serif' }}>
            SEO completo, do técnico ao conteúdo
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Atuamos em todas as frentes para garantir que seu site seja encontrado pelas pessoas certas, na hora certa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={s.title}
              className={`animate-on-scroll stagger-${i + 1} bg-white rounded-xl p-8 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}>
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF4D00] to-[#E8002D] rounded-lg flex items-center justify-center mb-6">
                <s.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">{s.description}</p>
              <ul className="space-y-2">
                {s.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Processo ─────────────────────────────────────────────────────────────────
const steps = [
  { num: '01', icon: Search, title: 'Diagnóstico & Auditoria', desc: 'Mapeamos a situação atual do seu site: performance técnica, posicionamento de palavras-chave, perfil de backlinks e análise da concorrência.' },
  { num: '02', icon: Target, title: 'Estratégia Personalizada', desc: 'Com base no diagnóstico, criamos um plano de ação com prioridades claras, metas de crescimento e cronograma de execução.' },
  { num: '03', icon: Settings, title: 'Implementação', desc: 'Executamos as otimizações técnicas e de conteúdo, construímos links e implementamos todas as melhorias mapeadas na estratégia.' },
  { num: '04', icon: LineChart, title: 'Monitoramento & Evolução', desc: 'Acompanhamos os rankings, tráfego e conversões em tempo real, ajustando a estratégia continuamente para maximizar os resultados.' },
]

function Process() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-on-scroll">
          <span className="text-[#FF4D00] text-sm font-semibold tracking-widest uppercase mb-4 block">Nossa Metodologia</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-5" style={{ fontFamily: 'Syne, sans-serif' }}>
            Como trabalhamos
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Um processo estruturado e transparente para levar seu site ao topo das buscas.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-32" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={step.num} className={`animate-on-scroll stagger-${i + 1} relative text-center`}>
                <div className="w-24 h-24 bg-[#0A0A0A] rounded-2xl flex flex-col items-center justify-center mx-auto mb-6 relative z-10">
                  <span className="text-[#FF4D00] text-xs font-mono mb-1">{step.num}</span>
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Resultados ───────────────────────────────────────────────────────────────
function Results() {
  return (
    <section className="py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-on-scroll">
          <span className="text-[#FF4D00] text-sm font-semibold tracking-widest uppercase mb-4 block">Resultados</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5" style={{ fontFamily: 'Syne, sans-serif' }}>
            Números que comprovam
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Dados reais dos nossos clientes. SEO feito com método gera resultados consistentes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            { icon: TrendingUp, value: 340, suffix: '%', label: 'Aumento médio de tráfego orgânico em 12 meses' },
            { icon: BarChart2, value: 1, suffix: 'ª', label: 'Posição no Google para palavras-chave estratégicas' },
            { icon: Users, value: 220, suffix: '+', label: 'Projetos de SEO entregues com sucesso' },
            { icon: Zap, value: 89, suffix: '%', label: 'Dos clientes renovam o contrato anualmente' },
          ].map((stat, i) => (
            <div key={stat.label}
              className={`animate-on-scroll stagger-${i + 1} bg-white/5 border border-white/10 rounded-xl p-8 text-center hover:bg-white/8 transition-colors`}>
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF4D00] to-[#E8002D] rounded-lg flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Case highlight */}
        <div className="grid lg:grid-cols-2 gap-8">
          {[
            {
              tag: 'E-commerce — Moda',
              title: 'De 200 para 18.000 visitas orgânicas/mês',
              desc: 'Em 9 meses de trabalho, combinamos SEO técnico, estratégia de conteúdo e link building para transformar um e-commerce de moda em referência do setor.',
              metrics: ['+8.900%', 'tráfego orgânico', '312', 'palavras no top 3', 'R$ 2,1M', 'receita gerada'],
            },
            {
              tag: 'SaaS — B2B',
              title: 'Primeiro lugar para 47 palavras-chave do setor',
              desc: 'Uma empresa de software B2B que dependia 100% de anúncios passou a gerar 70% dos leads via busca orgânica após 12 meses de SEO estratégico.',
              metrics: ['70%', 'leads via orgânico', '47', 'palavras no top 1', '-65%', 'custo por lead'],
            },
          ].map((c, i) => (
            <div key={c.title}
              className={`animate-on-scroll stagger-${i + 1} bg-white/5 border border-white/10 rounded-xl p-8`}>
              <span className="text-[#FF4D00] text-xs font-semibold tracking-widest uppercase mb-4 block">{c.tag}</span>
              <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>{c.title}</h3>
              <p className="text-gray-400 leading-relaxed mb-6">{c.desc}</p>
              <div className="grid grid-cols-3 gap-4">
                {[0, 2, 4].map((idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-xl font-bold text-gradient mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{c.metrics[idx]}</div>
                    <div className="text-gray-600 text-xs">{c.metrics[idx + 1]}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Por que a APEX360 ────────────────────────────────────────────────────────
function WhyUs() {
  const reasons = [
    { icon: Star, title: 'Google Partner Certificado', desc: 'Equipe com certificações Google, atualizada nas melhores práticas e mudanças de algoritmo.' },
    { icon: BarChart2, title: 'Relatórios Transparentes', desc: 'Dashboards em tempo real com todos os KPIs: rankings, tráfego, conversões e ROI.' },
    { icon: Target, title: 'Foco em Conversão', desc: 'Não buscamos só cliques. Otimizamos para atrair o público que realmente converte.' },
    { icon: Zap, title: 'Integração 360°', desc: 'SEO integrado com Mídia Paga, Conteúdo e CRO para resultados amplificados.' },
    { icon: Users, title: 'Time Dedicado', desc: 'Você tem um time especializado exclusivamente no seu projeto, não um atendimento genérico.' },
    { icon: TrendingUp, title: 'Histórico Comprovado', desc: '+220 projetos de SEO entregues com crescimento documentado e mensurável.' },
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-on-scroll">
          <span className="text-[#FF4D00] text-sm font-semibold tracking-widest uppercase mb-4 block">Por que a APEX360?</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-5" style={{ fontFamily: 'Syne, sans-serif' }}>
            SEO com estratégia, não com achismo
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <div key={r.title}
              className={`animate-on-scroll stagger-${i + 1} bg-white rounded-xl p-8 border border-gray-100 hover:shadow-md transition-shadow`}>
              <div className="w-10 h-10 bg-gradient-to-br from-[#FF4D00] to-[#E8002D] rounded-lg flex items-center justify-center mb-5">
                <r.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>{r.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Depoimentos ──────────────────────────────────────────────────────────────
const testimonials = [
  { name: 'Renata Oliveira', role: 'CEO — Boutique Donna', text: 'Em 8 meses saímos da página 5 para a primeira do Google nas principais palavras do nosso setor. O tráfego orgânico triplicou e as vendas online cresceram 240%.' },
  { name: 'Carlos Mendes', role: 'Diretor de Marketing — SoftFlow', text: 'A APEX360 transformou nossa estratégia digital. Hoje 70% dos nossos leads vêm de SEO. A abordagem deles é muito diferente — analisam dados de verdade.' },
  { name: 'Fernanda Castro', role: 'Fundadora — Clínica Vitallis', text: 'Conseguimos rankear para "clínica estética [cidade]" em menos de 6 meses. A agenda lotou e tivemos que contratar mais profissionais. Resultado incrível.' },
]

function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-on-scroll">
          <span className="text-[#FF4D00] text-sm font-semibold tracking-widest uppercase mb-4 block">Depoimentos</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-5" style={{ fontFamily: 'Syne, sans-serif' }}>
            O que nossos clientes dizem
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={t.name}
              className={`animate-on-scroll stagger-${i + 1} bg-gray-50 rounded-xl p-8 border border-gray-100 hover:shadow-md transition-shadow`}>
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[#FF4D00] text-[#FF4D00]" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-6 italic">"{t.text}"</p>
              <div>
                <div className="font-semibold text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>{t.name}</div>
                <div className="text-gray-500 text-sm">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const faqs = [
  { q: 'Em quanto tempo o SEO começa a dar resultados?', a: 'O SEO é uma estratégia de médio e longo prazo. Os primeiros resultados visíveis (melhora de rankings, aumento de tráfego) geralmente aparecem entre 3 e 6 meses. Resultados mais expressivos costumam se consolidar entre 6 e 12 meses. Domínios mais jovens ou com pouca autoridade podem levar um pouco mais.' },
  { q: 'SEO funciona para qualquer tipo de negócio?', a: 'Sim. SEO funciona para e-commerces, prestadores de serviços, negócios locais, SaaS, clínicas, escritórios de advocacia, indústrias e muito mais. A estratégia é personalizada conforme o mercado, o público e os objetivos de cada empresa.' },
  { q: 'Preciso parar de fazer anúncios para investir em SEO?', a: 'Não. SEO e mídia paga se complementam. O ideal é usar anúncios para resultados imediatos enquanto o SEO constrói uma base orgânica sólida. Com o tempo, o SEO reduz sua dependência e custo com anúncios.' },
  { q: 'Como vocês medem os resultados do SEO?', a: 'Utilizamos ferramentas como Google Search Console, Google Analytics, Semrush e Ahrefs. Você terá acesso a relatórios periódicos com dados de ranking, tráfego orgânico, palavras-chave conquistadas, backlinks e conversões geradas pelo canal orgânico.' },
  { q: 'Qual é o investimento mínimo para SEO?', a: 'O investimento varia conforme a competitividade do mercado, o tamanho do site e os objetivos. Após uma análise inicial gratuita, apresentamos uma proposta personalizada com escopo e valores claros. Entre em contato para uma avaliação sem compromisso.' },
  { q: 'Vocês garantem o primeiro lugar no Google?', a: 'Nenhuma agência séria pode garantir posição específica no Google — isso viola as próprias diretrizes do buscador. O que garantimos é a aplicação das melhores práticas, um processo estruturado e histórico comprovado de crescimento orgânico real para nossos clientes.' },
]

function FAQ() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16 animate-on-scroll">
          <span className="text-[#FF4D00] text-sm font-semibold tracking-widest uppercase mb-4 block">FAQ</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-5" style={{ fontFamily: 'Syne, sans-serif' }}>
            Perguntas frequentes
          </h2>
        </div>

        <div className="space-y-3 animate-on-scroll stagger-2">
          {faqs.map((faq) => <FAQItem key={faq.q} {...faq} />)}
        </div>
      </div>
    </section>
  )
}

// ─── CTA Final ────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section id="contato" className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #FF4D00 0%, transparent 70%)' }} />
      </div>
      <div className="relative max-w-3xl mx-auto px-6 text-center animate-on-scroll">
        <span className="text-[#FF4D00] text-sm font-semibold tracking-widest uppercase mb-6 block">Vamos começar?</span>
        <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
          Seu concorrente já está investindo em SEO
        </h2>
        <p className="text-gray-400 text-lg mb-10">
          Solicite uma análise gratuita do seu site e descubra as oportunidades de crescimento orgânico que você ainda não está aproveitando.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/5500000000000?text=Olá! Gostaria de uma análise gratuita de SEO para meu site."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-gradient text-white font-semibold px-8 py-4 rounded hover:opacity-90 transition-opacity text-base inline-flex items-center justify-center gap-2"
          >
            Quero minha análise gratuita
            <ArrowRight className="w-4 h-4" />
          </a>
          <Link to="/" className="border border-white/20 text-white font-semibold px-8 py-4 rounded hover:bg-white/5 transition-colors text-base">
            Ver todos os serviços
          </Link>
        </div>
        <p className="text-gray-600 text-sm mt-6">Sem compromisso · Resposta em até 24h · 100% gratuito</p>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-brand-gradient rounded flex items-center justify-center">
            <span className="text-white font-bold text-xs" style={{ fontFamily: 'Syne, sans-serif' }}>A</span>
          </div>
          <span className="font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
            APEX<span className="text-gradient">360</span>
          </span>
        </Link>
        <p className="text-gray-600 text-sm">© {new Date().getFullYear()} APEX360. Todos os direitos reservados.</p>
        <div className="flex gap-6">
          {['SEO', 'Mídia Paga', 'Branding', 'Conteúdo'].map((s) => (
            <span key={s} className="text-gray-600 text-sm hover:text-gray-400 cursor-pointer transition-colors">{s}</span>
          ))}
        </div>
      </div>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SEOPage() {
  useScrollAnimation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <WhatIsSEO />
      <Services />
      <Process />
      <Results />
      <WhyUs />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  )
}
