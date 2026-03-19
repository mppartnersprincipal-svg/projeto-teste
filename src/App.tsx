import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './index.css'

// ─── Scroll animation hook ───────────────────────────────────────────────────
function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// ─── Counter component ────────────────────────────────────────────────────────
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
          if (start >= end) {
            setCount(end)
            clearInterval(timer)
          } else {
            setCount(start)
          }
        }, 16)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end])

  return <span ref={ref}>{prefix}{count.toLocaleString('pt-BR')}{suffix}</span>
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = ['Serviços', 'Cases', 'Sobre', 'Contato']

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-black/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-brand-gradient rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>A</span>
          </div>
          <span className="font-bold text-xl tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
            APEX<span className="text-gradient">360</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <a
            href="#contato"
            className="bg-brand-gradient text-white text-sm font-semibold px-5 py-2.5 rounded hover:opacity-90 transition-opacity"
          >
            Fale Conosco
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2">
          <div className={`w-5 h-0.5 bg-black mb-1.5 transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-5 h-0.5 bg-black mb-1.5 transition-all ${open ? 'opacity-0' : ''}`} />
          <div className={`w-5 h-0.5 bg-black transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-6 flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-gray-700 hover:text-black"
            >
              {link}
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setOpen(false)}
            className="bg-brand-gradient text-white text-sm font-semibold px-5 py-3 rounded text-center mt-2"
          >
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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0A0A0A]">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #FF4D00 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] opacity-5"
          style={{ background: 'radial-gradient(circle, #E8002D 0%, transparent 70%)' }} />
        {/* Grid lines */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded px-3 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-pulse" />
              <span className="text-gray-400 text-xs font-medium tracking-wider uppercase">Marketing 360° Full Service</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.05] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              Transformamos{' '}
              <span className="text-gradient">marcas</span>{' '}
              em resultados reais
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
              Estratégia, criatividade e tecnologia integradas para acelerar o crescimento do seu negócio. Do branding ao performance, fazemos tudo.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contato"
                className="bg-brand-gradient text-white font-semibold px-8 py-4 rounded hover:opacity-90 transition-opacity text-base"
              >
                Quero crescer agora
              </a>
              <a
                href="#cases"
                className="border border-white/20 text-white font-semibold px-8 py-4 rounded hover:bg-white/5 transition-colors text-base"
              >
                Ver cases
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex items-center gap-6 flex-wrap">
              {['Google Partner', 'Meta Business', 'RD Station'].map((badge) => (
                <div key={badge} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#FF4D00]" />
                  <span className="text-gray-500 text-sm">{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — decorative dashboard mockup */}
          <div className="hidden lg:block relative">
            <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 ml-8">
              {/* Mockup header */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-gray-500 text-xs">analytics.apex360.com.br</span>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                {[
                  { label: 'ROI Médio', value: '347%', color: '#FF4D00' },
                  { label: 'Leads gerados', value: '12.4K', color: '#E8002D' },
                  { label: 'Taxa de Conv.', value: '8.2%', color: '#FF6B35' },
                  { label: 'Clientes ativos', value: '180+', color: '#FF4D00' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/5 rounded-lg p-4 border border-white/5">
                    <p className="text-gray-500 text-xs mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif', color: stat.color }}>{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Chart bars */}
              <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                <p className="text-gray-500 text-xs mb-3">Performance mensal</p>
                <div className="flex items-end gap-2 h-16">
                  {[40, 65, 45, 80, 60, 90, 75, 95, 70, 88, 82, 100].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm"
                      style={{
                        height: `${h}%`,
                        background: i === 11 ? 'linear-gradient(135deg, #FF4D00, #E8002D)' : 'rgba(255,77,0,0.3)'
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-600 text-xs">Jan</span>
                  <span className="text-gray-600 text-xs">Dez</span>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-brand-gradient text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                +347% ROI
              </div>
            </div>
          </div>
        </div>

        {/* Ticker */}
        <div className="mt-20 border-t border-white/5 pt-8 overflow-hidden">
          <div className="flex gap-16 animate-[marquee_20s_linear_infinite] whitespace-nowrap">
            {['SEO', 'Tráfego Pago', 'Social Media', 'Branding', 'Email Marketing', 'Analytics', 'Desenvolvimento Web', 'Criação de Conteúdo', 'SEO', 'Tráfego Pago', 'Social Media', 'Branding', 'Email Marketing', 'Analytics', 'Desenvolvimento Web', 'Criação de Conteúdo'].map((item, i) => (
              <span key={i} className="text-gray-600 text-sm font-medium flex items-center gap-16">
                {item} <span className="text-[#FF4D00]">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Services ─────────────────────────────────────────────────────────────────
const services = [
  {
    icon: '🔍',
    title: 'SEO',
    desc: 'Domine os resultados orgânicos. Estratégia técnica, de conteúdo e de autoridade para crescimento sustentável.',
    tags: ['On-page', 'Link Building', 'Técnico'],
    href: '/servicos/seo',
  },
  {
    icon: '📊',
    title: 'Tráfego Pago',
    desc: 'Google Ads, Meta Ads e muito mais. Campanhas de alta performance que maximizam cada centavo investido.',
    tags: ['Google Ads', 'Meta Ads', 'LinkedIn'],
  },
  {
    icon: '📱',
    title: 'Social Media',
    desc: 'Gestão completa das suas redes sociais. Estratégia, criação, publicação e análise de resultados.',
    tags: ['Instagram', 'TikTok', 'LinkedIn'],
  },
  {
    icon: '🎨',
    title: 'Branding',
    desc: 'Identidade visual que comunica valor. Da estratégia de marca ao design system completo.',
    tags: ['Identidade Visual', 'Brandbook', 'UI/UX'],
  },
  {
    icon: '✍️',
    title: 'Criação de Conteúdo',
    desc: 'Conteúdo que converte. Artigos, vídeos, infográficos e materiais ricos com foco em resultados.',
    tags: ['Blog', 'Vídeo', 'E-books'],
  },
  {
    icon: '📧',
    title: 'Email Marketing',
    desc: 'Automações inteligentes e campanhas segmentadas para nutrir leads e fidelizar clientes.',
    tags: ['Automação', 'CRM', 'RD Station'],
  },
  {
    icon: '💻',
    title: 'Desenvolvimento Web',
    desc: 'Sites e landing pages de alta conversão. Performance, design e UX trabalhados em conjunto.',
    tags: ['Landing Pages', 'WordPress', 'React'],
  },
  {
    icon: '📈',
    title: 'Analytics & BI',
    desc: 'Dados que geram decisões. Dashboards customizados, tracking avançado e relatórios claros.',
    tags: ['GA4', 'Looker Studio', 'Power BI'],
  },
]

function Services() {
  return (
    <section id="serviços" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="animate-on-scroll">
          <span className="text-[#FF4D00] text-sm font-semibold tracking-widest uppercase">O que fazemos</span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-2 mb-4 text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>
            Soluções completas para<br />cada etapa do funil
          </h2>
          <p className="text-gray-500 text-lg max-w-xl">
            Do awareness à conversão, cobrimos toda a jornada do seu cliente com estratégias integradas.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {services.map((service, i) => {
            const inner = (
              <>
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-[#FF4D00] transition-colors" style={{ fontFamily: 'Syne, sans-serif' }}>
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                {service.href && (
                  <div className="mt-4 text-[#FF4D00] text-xs font-semibold tracking-wide flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Ver serviço →
                  </div>
                )}
              </>
            )
            const cls = `animate-on-scroll stagger-${Math.min(i + 1, 8)} group border border-gray-100 rounded-xl p-6 hover:border-[#FF4D00]/30 hover:shadow-lg transition-all duration-300`
            return service.href ? (
              <Link key={service.title} to={service.href} className={cls} style={{ textDecoration: 'none' }}>
                {inner}
              </Link>
            ) : (
              <div key={service.title} className={`${cls} cursor-default`}>
                {inner}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Numbers ──────────────────────────────────────────────────────────────────
function Numbers() {
  const stats = [
    { end: 180, suffix: '+', label: 'Clientes atendidos', desc: 'de startups a grandes empresas' },
    { end: 420, suffix: '+', label: 'Projetos entregues', desc: 'em múltiplos segmentos' },
    { end: 347, suffix: '%', label: 'ROI médio', desc: 'retorno sobre investimento' },
    { end: 8, suffix: ' anos', label: 'No mercado', desc: 'de experiência comprovada' },
  ]

  return (
    <section className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(255,77,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,77,0,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat, i) => (
            <div key={stat.label} className={`animate-on-scroll stagger-${i + 1} text-center lg:text-left`}>
              <div className="text-5xl lg:text-6xl font-bold text-gradient mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                <Counter end={stat.end} suffix={stat.suffix} />
              </div>
              <div className="text-white font-semibold text-lg mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{stat.label}</div>
              <div className="text-gray-500 text-sm">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Cases ────────────────────────────────────────────────────────────────────
const cases = [
  {
    category: 'E-commerce',
    company: 'ModaFit',
    result: '+280% em vendas',
    metric1: '280%', label1: 'Aumento em vendas',
    metric2: '4.2x', label2: 'ROAS no Meta Ads',
    desc: 'Reestruturação completa do funil de vendas com foco em tráfego pago e SEO. Em 6 meses, a ModaFit triplicou seu faturamento digital.',
    color: '#FF4D00',
    services: ['Tráfego Pago', 'SEO', 'Email Marketing'],
  },
  {
    category: 'SaaS',
    company: 'DataFlow Pro',
    result: '+560% em leads',
    metric1: '560%', label1: 'Crescimento em leads',
    metric2: '38%', label2: 'Redução no CAC',
    desc: 'Estratégia de inbound marketing e ABM para geração de leads qualificados. O CAC caiu 38% enquanto a geração de MQLs explodiu.',
    color: '#E8002D',
    services: ['Content Marketing', 'LinkedIn Ads', 'Automação'],
  },
  {
    category: 'Educação',
    company: 'EduPrime',
    result: '12K matrículas',
    metric1: '12K', label1: 'Novas matrículas',
    metric2: '8.1%', label2: 'Taxa de conversão',
    desc: 'Campanha de lançamento para nova plataforma EAD. Combinamos Meta Ads, Google e Social Media para um resultado histórico.',
    color: '#FF6B35',
    services: ['Social Media', 'Google Ads', 'Landing Pages'],
  },
]

function Cases() {
  return (
    <section id="cases" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="animate-on-scroll">
          <span className="text-[#FF4D00] text-sm font-semibold tracking-widest uppercase">Cases de sucesso</span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-2 mb-4 text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>
            Resultados que falam<br />por si mesmos
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-14">
          {cases.map((c, i) => (
            <div
              key={c.company}
              className={`animate-on-scroll stagger-${i + 1} bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300`}
            >
              <div className="h-2" style={{ background: `linear-gradient(90deg, ${c.color}, ${c.color}88)` }} />
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-xs font-semibold tracking-wider uppercase text-gray-400">{c.category}</span>
                    <h3 className="text-xl font-bold text-gray-900 mt-0.5" style={{ fontFamily: 'Syne, sans-serif' }}>{c.company}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-white px-3 py-1.5 rounded" style={{ background: c.color }}>{c.result}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-2xl font-bold" style={{ fontFamily: 'Syne, sans-serif', color: c.color }}>{c.metric1}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{c.label1}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-2xl font-bold" style={{ fontFamily: 'Syne, sans-serif', color: c.color }}>{c.metric2}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{c.label2}</div>
                  </div>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-5">{c.desc}</p>

                <div className="flex flex-wrap gap-2">
                  {c.services.map((s) => (
                    <span key={s} className="text-xs border rounded-full px-3 py-1 font-medium" style={{ color: c.color, borderColor: `${c.color}40` }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  {
    name: 'Ana Rodrigues',
    role: 'CEO, ModaFit',
    text: 'A APEX360 transformou completamente nossa presença digital. Em menos de 6 meses, triplicamos nossas vendas online. Equipe extremamente competente e comprometida com resultados.',
    avatar: 'AR',
  },
  {
    name: 'Marcos Oliveira',
    role: 'Head de Marketing, DataFlow Pro',
    text: 'O que mais me impressiona é a visão estratégica da equipe. Eles não apenas executam, mas pensam junto conosco sobre o negócio. Os resultados falam por si mesmos.',
    avatar: 'MO',
  },
  {
    name: 'Fernanda Costa',
    role: 'Diretora Comercial, EduPrime',
    text: 'Contratamos para um lançamento e ficamos impressionados. 12 mil matrículas em 90 dias superou qualquer expectativa. Renovamos contrato imediatamente.',
    avatar: 'FC',
  },
  {
    name: 'Rafael Mendes',
    role: 'Fundador, TechStart',
    text: 'Profissionalismo acima de tudo. Relatórios claros, metas atingidas e equipe sempre disponível. Nossa melhor decisão de marketing nos últimos anos.',
    avatar: 'RM',
  },
]

function Testimonials() {
  const [active, setActive] = useState(0)

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="animate-on-scroll text-center mb-14">
          <span className="text-[#FF4D00] text-sm font-semibold tracking-widest uppercase">Depoimentos</span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-2 text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>
            O que nossos clientes dizem
          </h2>
        </div>

        <div className="animate-on-scroll max-w-3xl mx-auto">
          {/* Main testimonial */}
          <div className="bg-gray-50 rounded-2xl p-8 lg:p-12 mb-8 relative">
            <div className="text-6xl text-[#FF4D00]/20 font-serif leading-none mb-4">"</div>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              {testimonials[active].text}
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-gradient flex items-center justify-center text-white font-bold text-sm">
                {testimonials[active].avatar}
              </div>
              <div>
                <div className="font-semibold text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>{testimonials[active].name}</div>
                <div className="text-gray-500 text-sm">{testimonials[active].role}</div>
              </div>
              <div className="ml-auto flex gap-1">
                {[1,2,3,4,5].map(s => (
                  <span key={s} className="text-[#FF4D00]">★</span>
                ))}
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === active ? 'w-8 bg-[#FF4D00]' : 'w-2 bg-gray-200'}`}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => setActive((active - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#FF4D00] hover:text-[#FF4D00] transition-colors"
            >
              ←
            </button>
            <button
              onClick={() => setActive((active + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#FF4D00] hover:text-[#FF4D00] transition-colors"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  const values = [
    { icon: '🎯', title: 'Orientado a dados', desc: 'Cada decisão é fundamentada em análises e métricas reais.' },
    { icon: '🚀', title: 'Foco em crescimento', desc: 'Estratégias escaláveis que crescem junto com seu negócio.' },
    { icon: '🤝', title: 'Parceria genuína', desc: 'Somos uma extensão da sua equipe, não apenas um fornecedor.' },
    { icon: '⚡', title: 'Agilidade', desc: 'Processos ágeis para responder rápido às oportunidades.' },
  ]

  const team = [
    { name: 'Lucas Ferreira', role: 'CEO & Estratégia', initials: 'LF' },
    { name: 'Camila Torres', role: 'Head de Performance', initials: 'CT' },
    { name: 'Pedro Alves', role: 'Head Criativo', initials: 'PA' },
    { name: 'Julia Lima', role: 'Head de Conteúdo', initials: 'JL' },
  ]

  return (
    <section id="sobre" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div className="animate-on-scroll">
            <span className="text-[#FF4D00] text-sm font-semibold tracking-widest uppercase">Sobre nós</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-2 mb-6 text-gray-900 leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
              8 anos acelerando negócios no digital
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              A APEX360 nasceu da frustração com agências que entregam relatórios bonitos mas resultados medíocres. Criamos uma metodologia própria que une criatividade e dados para gerar crescimento real.
            </p>
            <p className="text-gray-500 leading-relaxed mb-10">
              Nosso time multidisciplinar atende clientes de todos os portes, de startups em fase inicial a empresas com faturamento de 9 dígitos. O denominador comum? Crescimento consistente e parceria de longo prazo.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {values.map((v) => (
                <div key={v.title} className="bg-white rounded-xl p-5 border border-gray-100">
                  <div className="text-2xl mb-2">{v.icon}</div>
                  <div className="font-semibold text-gray-900 mb-1 text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>{v.title}</div>
                  <div className="text-gray-500 text-xs leading-relaxed">{v.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — team */}
          <div className="animate-on-scroll stagger-2">
            <div className="grid grid-cols-2 gap-4">
              {team.map((member) => (
                <div key={member.name} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#FF4D00]/30 hover:shadow-md transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-xl bg-brand-gradient flex items-center justify-center text-white font-bold text-lg mb-4">
                    {member.initials}
                  </div>
                  <div className="font-bold text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>{member.name}</div>
                  <div className="text-gray-500 text-sm mt-0.5">{member.role}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-[#0A0A0A] rounded-2xl p-6 text-white">
              <div className="flex items-start gap-4">
                <div className="text-3xl">💡</div>
                <div>
                  <div className="font-bold mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>Nossa missão</div>
                  <div className="text-gray-400 text-sm leading-relaxed">
                    Ser o parceiro estratégico que transforma o potencial digital de cada empresa em crescimento sustentável e mensurável.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Contact / CTA ────────────────────────────────────────────────────────────
function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '', service: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contato" className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-5"
          style={{ background: 'radial-gradient(circle, #FF4D00 0%, transparent 70%)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div className="animate-on-scroll">
            <span className="text-[#FF4D00] text-sm font-semibold tracking-widest uppercase">Vamos conversar</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-2 mb-6 text-white leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
              Pronto para acelerar seu crescimento?
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-10">
              Agende uma conversa sem compromisso. Vamos analisar seu negócio e apresentar uma estratégia personalizada.
            </p>

            <div className="space-y-5">
              {[
                { icon: '📍', label: 'Endereço', value: 'São Paulo, SP — Brasil' },
                { icon: '📞', label: 'Telefone', value: '+55 (11) 99999-0000' },
                { icon: '✉️', label: 'Email', value: 'contato@apex360.com.br' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-lg">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs">{item.label}</div>
                    <div className="text-white text-sm font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="animate-on-scroll stagger-2">
            {sent ? (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-white text-2xl font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>Mensagem enviada!</h3>
                <p className="text-gray-400">Entraremos em contato em até 24 horas.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-xs mb-1.5 block">Nome completo *</label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#FF4D00] transition-colors"
                      placeholder="João Silva"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1.5 block">Email *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#FF4D00] transition-colors"
                      placeholder="joao@empresa.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-xs mb-1.5 block">Empresa</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#FF4D00] transition-colors"
                    placeholder="Nome da sua empresa"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-xs mb-1.5 block">Serviço de interesse</label>
                  <select
                    value={form.service}
                    onChange={e => setForm({ ...form, service: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF4D00] transition-colors"
                    style={{ background: 'rgba(255,255,255,0.05)' }}
                  >
                    <option value="" className="bg-gray-900">Selecione um serviço</option>
                    {['SEO', 'Tráfego Pago', 'Social Media', 'Branding', 'Conteúdo', 'Email Marketing', 'Desenvolvimento Web', 'Analytics', 'Pacote Completo'].map(s => (
                      <option key={s} value={s} className="bg-gray-900">{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 text-xs mb-1.5 block">Mensagem</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#FF4D00] transition-colors resize-none"
                    placeholder="Fale sobre seu negócio e objetivos..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand-gradient text-white font-semibold py-4 rounded-lg hover:opacity-90 transition-opacity text-base"
                >
                  Enviar mensagem →
                </button>
                <p className="text-gray-600 text-xs text-center">Resposta em até 24h • Sem compromisso</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const cols = [
    {
      title: 'Serviços',
      links: ['SEO', 'Tráfego Pago', 'Social Media', 'Branding', 'Email Marketing', 'Analytics'],
    },
    {
      title: 'Empresa',
      links: ['Sobre nós', 'Cases', 'Blog', 'Carreiras', 'Parceiros'],
    },
    {
      title: 'Suporte',
      links: ['Contato', 'FAQ', 'Política de Privacidade', 'Termos de Uso'],
    },
  ]

  return (
    <footer className="bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-gradient rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-bold text-xl text-white tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
                APEX<span className="text-gradient">360</span>
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Agência de marketing digital full service. Transformamos marcas em resultados mensuráveis.
            </p>
            <div className="flex gap-3">
              {['in', 'ig', 'fb', 'tt'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 transition-colors text-xs font-bold uppercase"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {cols.map((col) => (
            <div key={col.title}>
              <div className="text-white font-semibold text-sm mb-5" style={{ fontFamily: 'Syne, sans-serif' }}>{col.title}</div>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-600 text-sm hover:text-gray-300 transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-700 text-xs">© 2024 APEX360. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <span className="text-gray-700 text-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Google Partner
            </span>
            <span className="text-gray-700 text-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Meta Business
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  useScrollAnimation()

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Numbers />
      <Cases />
      <Testimonials />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}
