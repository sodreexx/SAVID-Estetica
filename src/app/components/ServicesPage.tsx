import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';

const categories = [
  {
    id: 'beleza',
    label: 'Beleza Express',
    subtitle: 'Sobrancelhas, lábios e estética rápida',
    image: 'https://images.unsplash.com/photo-1656786979264-c01fbe9e8b2e?w=1200&h=600&fit=crop',
    accentColor: '#D4AF37',
    icon: '✦',
    services: [
      { name: 'Brow Lamination', description: 'Técnica que alinha e fixa os fios da sobrancelha para cima, criando um efeito de maior volume e espessura.' },
      { name: 'Design de Sobrancelha', description: 'Mapeamento do rosto e remoção estratégica de fios para criar um formato que harmonize com as expressões faciais.' },
      { name: 'Henna', description: 'Aplicação de tintura natural na pele e nos fios para preencher falhas temporariamente e dar volume às sobrancelhas.' },
      { name: 'Micro nos Olhos', description: 'Micropigmentação aplicada na linha dos cílios (delineado superior ou inferior) para realçar e definir o olhar.' },
      { name: 'Micropigmentação', description: 'Implantação de pigmento nas camadas superficiais da pele para desenhar, preencher ou corrigir assimetrias nas sobrancelhas.' },
      { name: 'Micropigmentação Labial', description: 'Inserção de pigmento nos lábios para revitalizar a cor, definir o contorno ou neutralizar tons escurecidos.' },
      { name: 'Micropigmentação Paramédica', description: 'Uso do pigmento para camuflar cicatrizes, estrias, manchas vitiligo ou para a reconstrução visual de aréolas mamárias.' },
      { name: 'Reconstrução / Micropigmentação', description: 'Combinação de cuidados e técnicas de pigmentação focada em recuperar o formato de sobrancelhas danificadas.' },
      { name: 'Sobrancelha Extra', description: 'Serviço complementar ou de manutenção rápida para remoção do excesso de fios fora do design principal.' },
    ]
  },
  {
    id: 'avancada',
    label: 'Estética Avançada',
    subtitle: 'Harmonização e procedimentos de alto valor',
    image: 'https://images.unsplash.com/photo-1733685373260-bcd3f81f57c8?w=1200&h=600&fit=crop',
    accentColor: '#8DAA91',
    icon: '◈',
    services: [
      { name: 'Bigode Chinês', description: 'Preenchimento do sulco nasogeniano para suavizar a expressão de cansaço e rejuvenescer o contorno facial.' },
      { name: 'Bioestimulador de Colágeno', description: 'Injeção de substâncias que obrigam o corpo a produzir colágeno novo, melhorando a firmeza e qualidade da pele.' },
      { name: 'Blefaroplastia Não Cirúrgica', description: 'Tratamento com jato de plasma que retrai o excesso de pele e combate a flacidez das pálpebras sem cortes.' },
      { name: 'Botox', description: 'Aplicação de toxina botulínica para relaxar a musculatura facial, prevenindo e suavizando rugas de expressão dinâmicas.' },
      { name: 'Fio Feller (PDO)', description: 'Inserção de fios absorvíveis sob a pele para promover efeito de lifting e estimular a produção de colágeno local.' },
      { name: 'Lobuloplastia', description: 'Correção estética do lóbulo da orelha rasgado ou excessivamente alargado por uso de brincos pesados.' },
      { name: 'Otomodelação', description: 'Técnica minimamente invasiva para corrigir orelhas proeminentes sem necessidade de cirurgia tradicional.' },
      { name: 'PDRN', description: 'Tratamento regenerativo injetável à base de polinucleotídeos que acelera a cicatrização e rejuvenesce as células da pele.' },
      { name: 'Preenchimento Labial', description: 'Uso de ácido hialurônico para dar volume, melhorar o contorno, corrigir assimetrias e hidratar os lábios.' },
      { name: 'Skinbooster', description: 'Injeção de ácido hialurônico de baixa densidade para promover hidratação profunda, melhorando o viço e linhas finas.' },
      { name: 'Sorriso Gengival', description: 'Aplicação estratégica de Botox para impedir que o lábio superior suba excessivamente durante o sorriso.' },
      { name: 'Ultrassom Microfocado', description: 'Tecnologia que atinge as camadas musculares do rosto, promovendo lifting duradouro e melhora do contorno facial.' },
      { name: 'Microagulhamento Robótico', description: 'Microagulhamento automatizado de alta precisão para estimular colágeno e melhorar a textura da pele com resultados superiores.' },
      { name: 'Radiofrequência', description: 'Emissão de calor nas camadas mais fundas da pele, estimulando colágeno e elastina para combater a flacidez.' },
      { name: 'Microvasos (PEIM)', description: 'Procedimento estético para eliminar os pequenos vasinhos sanguíneos rompidos (telangiectasias) na pele.' },
    ]
  },
  {
    id: 'pele',
    label: 'Tratamentos de Pele',
    subtitle: 'Rejuvenescimento, acne e qualidade da pele',
    image: 'https://images.unsplash.com/photo-1761718209835-c8586b7dcac0?w=1200&h=600&fit=crop',
    accentColor: '#D4AF37',
    icon: '◇',
    services: [
      { name: 'Black Peel', description: 'Peeling a laser associado a máscara de carvão ativado, ideal para fechar poros, clarear a pele e controlar oleosidade.' },
      { name: 'Clareamento de Acne', description: 'Protocolos focados em atenuar a hiperpigmentação pós-inflamatória (manchas) deixadas pelas espinhas.' },
      { name: 'Despigmentação', description: 'Processo de remoção de pigmentos artificiais indesejados da pele, como micropigmentações antigas ou tatuagens.' },
      { name: 'Despigmentação Elétrica', description: 'Remoção de pigmentos superficiais ou pequenas lesões utilizando correntes elétricas através de um eletrocautério.' },
      { name: 'Glass Skin', description: 'Tratamentos intensivos focados em deixar a pele ultra-luminosa, lisa e com poros invisíveis, como vidro.' },
      { name: 'Hidratação Facial', description: 'Aplicação de cosméticos e máscaras nutritivas para repor a água e a barreira lipídica da pele.' },
      { name: 'Jato de Plasma', description: 'Equipamento que gera arco elétrico para promover retração (lifting), remoção de manchas e verrugas com precisão.' },
      { name: 'Limpeza de Pele', description: 'Procedimento para extração de cravos, miliuns, impurezas e células mortas, desobstruindo os poros profundamente.' },
      { name: 'Microagulhamento', description: 'Microlesões na pele que estimulam a produção de colágeno e facilitam a entrada de ativos terapêuticos.' },
      { name: 'Microdermoabrasão', description: 'Esfoliação mecânica profunda para remover a camada superficial da pele e promover renovação celular.' },
      { name: 'Peeling Químico', description: 'Aplicação de ácidos sobre a pele para promover descamação controlada, clareando manchas e suavizando texturas.' },
      { name: 'Remoção de Dermatose', description: 'Retirada de pequenas lesões benignas da pele, como acrocórdons e verrugas com segurança e precisão.' },
      { name: 'Tratamento de Acne', description: 'Conjunto de técnicas focadas no controle do sebo, inflamação e eliminação da bactéria causadora da acne ativa.' },
      { name: 'Tratamento para Manchas', description: 'Protocolos personalizados para atenuar melasma, manchas solares e hiperpigmentação, devolvendo uniformidade à pele.' },
    ]
  },
  {
    id: 'corporal',
    label: 'Estética Corporal',
    subtitle: 'Corpo, capilar e bem-estar',
    image: 'https://images.unsplash.com/photo-1712638932314-e2b185ca0930?w=1200&h=600&fit=crop',
    accentColor: '#8DAA91',
    icon: '○',
    services: [
      { name: 'Carboxiterapia', description: 'Injeção de gás carbônico para melhorar a oxigenação e circulação, reduzindo estrias, celulite e gordura localizada.' },
      { name: 'Celulite', description: 'Protocolos direcionados a melhorar o aspecto irregular da pele, com massagens modeladoras, aparelhos ou injetáveis.' },
      { name: 'Corrente Russa', description: 'Uso de eletrodos para causar contrações musculares involuntárias, tonificando os músculos e combatendo a flacidez.' },
      { name: 'Enzimas', description: 'Aplicação de mesclas injetáveis de ativos para queimar gordura localizada, reduzir celulite ou tratar flacidez.' },
      { name: 'Lips Hidrat', description: 'Protocolo de hidratação e esfoliação intensa para recuperar lábios ressecados ou rachados, devolvendo maciez e viço.' },
      { name: 'Massagem Relaxante', description: 'Movimentos manuais suaves e firmes para desfazer tensões musculares, melhorar a circulação e aliviar o estresse.' },
      { name: 'Micropigmentação Capilar', description: 'Implantação de pigmentos no couro cabeludo para criar a ilusão de folículos pilosos, disfarçando áreas de calvície.' },
      { name: 'Papada', description: 'Tratamentos específicos para reduzir a gordura e a flacidez abaixo do queixo com enzimas, fios ou aparelhos.' },
      { name: 'Projeto RENOV', description: 'Combo de correção: despigmentação de trabalho antigo seguida da reconstrução do formato das sobrancelhas.' },
      { name: 'Drenagem Linfática', description: 'Massagem terapêutica que estimula o sistema linfático, reduzindo retenção de líquidos, inchaço e promovendo desintoxicação.' },
      { name: 'Aplicação de Tapping', description: 'Técnica de percussão suave que ativa a circulação, melhora a absorção de ativos e promove firmeza da pele.' },
      { name: 'Terapia Corporal', description: 'Conjunto de tratamentos holísticos focados em equilíbrio físico e emocional, aliviando tensões e promovendo bem-estar.' },
    ]
  }
];

export function ServicesPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('beleza');
  const [scrolled, setScrolled] = useState(false);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If a hash is present in the URL, scroll to that section; otherwise go to top
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      // Wait for refs to be populated
      const tryScroll = (attempts = 0) => {
        const el = categoryRefs.current[hash];
        if (el) {
          const offset = 140;
          const top = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
          setActiveCategory(hash);
        } else if (attempts < 10) {
          setTimeout(() => tryScroll(attempts + 1), 80);
        }
      };
      tryScroll();
    } else {
      window.scrollTo({ top: 0 });
    }

    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setScrolled(scrollPos > 50);

      // Encontrar a categoria que está mais próxima do topo (considerando o header fixo)
      const offsetMargin = 160; 
      let current = categories[0].id;

      for (const cat of categories) {
        const el = categoryRefs.current[cat.id];
        if (el) {
          const rect = el.getBoundingClientRect();
          // Se o topo da seção passou da nossa margem de segurança, ela é a ativa
          if (rect.top <= offsetMargin) {
            current = cat.id;
          }
        }
      }
      
      setActiveCategory(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efeito para rolar a aba ativa para o centro do menu horizontal
  useEffect(() => {
    if (activeCategory && tabsRef.current) {
      const activeTabEl = tabsRef.current.querySelector(`[data-id="${activeCategory}"]`);
      if (activeTabEl) {
        activeTabEl.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [activeCategory]);

  const scrollToCategory = (id: string) => {
    const el = categoryRefs.current[id];
    if (el) {
      const offset = 140;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setActiveCategory(id);
  };

  return (
    <div style={{ background: '#FAFAF8', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>
      <Helmet>
        <title>Nossos Serviços — Savid Maricá | Estética e Harmonização Facial</title>
        <meta
          name="description"
          content="Conheça todos os 50 procedimentos estéticos da Savid Maricá: harmonização facial, botox, micropigmentação, tratamentos de pele, estética corporal e muito mais em Maricá, RJ."
        />
        <meta property="og:title" content="Nossos Serviços — Savid Maricá" />
        <meta property="og:description" content="50 procedimentos estéticos disponíveis: harmonização facial, micropigmentação, tratamentos de pele e estética corporal em Maricá, RJ." />
        <meta property="og:url" content="https://savid.com.br/servicos" />
      </Helmet>

      {/* ── Navbar ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(255,255,255,0.92)'
            : 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: scrolled ? '0 2px 30px rgba(0,0,0,0.08)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(212,175,55,0.15)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-6 h-14 md:h-16 flex items-center justify-between">
          {/* Back button */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 transition-all duration-300 hover:gap-3"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 400,
              fontSize: '0.875rem',
              color: 'var(--color-sage-dark)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Voltar
          </button>

          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img
              src="/images/logo-savid.png"
              alt="Savid Logo"
              className="h-9 md:h-14 w-auto object-contain"
            />
          </div>

          {/* CTA */}
          <button
            onClick={() => window.open('https://wa.me/5521972668520', '_blank')}
            className="px-5 py-2 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
            style={{
              background: 'var(--color-sage)',
              color: 'white',
              fontFamily: 'var(--font-sans)',
              fontWeight: 500,
              fontSize: '0.875rem',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Agendar
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-16 overflow-hidden" style={{ height: 'clamp(300px, 50vw, 480px)' }}>
        <div className="absolute inset-0">
          <ImageWithFallback
            src="/images/hero-servicos.jpg"
            alt="Serviços Savid Maricá"
            className="w-full h-full object-cover object-top"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(90deg, #7a807a 0%, #adb5aa 45%, #ece8d6 100%)' }}
          />
        </div>

        {/* Decorative particle dots */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: i % 2 === 0 ? '6px' : '4px',
              height: i % 2 === 0 ? '6px' : '4px',
              background: 'rgba(212,175,55,0.6)',
              top: `${20 + (i * 11) % 60}%`,
              left: `${5 + (i * 13) % 90}%`,
              animation: `floatSlow ${3 + i * 0.5}s ease-in-out infinite`,
            }}
          />
        ))}

        <div className="relative z-10 h-full flex flex-col justify-end pb-16 px-6">
          <div className="max-w-7xl mx-auto w-full">
            <p
              className="tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '0.75rem', color: 'rgba(141,170,145,0.9)' }}
            >
              Savid
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 300,
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                color: 'white',
                lineHeight: '1.1',
                letterSpacing: '-0.02em',
              }}
            >Nossos<br /><span>Serviços</span></h1>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-12 h-px" style={{ background: 'var(--color-sage)' }} />
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.9375rem', color: 'rgba(255,255,255,0.75)' }}>
                {categories.reduce((acc, c) => acc + c.services.length, 0)} procedimentos disponíveis
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky Category Tabs ── */}
      <div
        className="sticky z-40 transition-all duration-300"
        style={{
          top: '64px',
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(212,175,55,0.2)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        }}
      >
        <div className="max-w-7xl mx-auto px-3 lg:px-6">
          <div 
            ref={tabsRef}
            className="flex items-stretch overflow-x-auto scrollbar-hide"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                data-id={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                className="relative flex-shrink-0 px-6 py-4 transition-all duration-300"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: activeCategory === cat.id ? 500 : 400,
                  fontSize: '0.875rem',
                  color: activeCategory === cat.id ? 'var(--color-black)' : '#888',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  borderBottom: `2px solid ${activeCategory === cat.id ? 'var(--color-gold)' : 'transparent'}`,
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{ color: cat.accentColor, marginRight: '0.4rem', fontSize: '0.7rem' }}>
                  {cat.icon}
                </span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Categories ── */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 lg:py-16 space-y-14 lg:space-y-24">
        {categories.map((cat, catIndex) => (
          <div
            key={cat.id}
            id={cat.id}
            ref={el => { categoryRefs.current[cat.id] = el; }}
          >
            {/* Category Header */}
            <div className="flex flex-col lg:flex-row lg:items-end gap-6 mb-12">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 300,
                      fontSize: '4rem',
                      color: `${cat.accentColor}18`,
                      lineHeight: 1,
                      userSelect: 'none',
                    }}
                  >
                    {String(catIndex + 1).padStart(2, '0')}
                  </span>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: `${cat.accentColor}20`, border: `1px solid ${cat.accentColor}40` }}
                  >
                    <span style={{ color: cat.accentColor, fontSize: '0.9rem' }}>{cat.icon}</span>
                  </div>
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 400,
                    fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                    color: 'var(--color-black)',
                    lineHeight: '1.2',
                  }}
                >
                  {cat.label}
                </h2>
                <p
                  className="mt-2"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 300,
                    fontSize: '0.9375rem',
                    color: '#888',
                    letterSpacing: '0.02em',
                  }}
                >
                  {cat.subtitle}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 lg:w-24" style={{ background: `${cat.accentColor}30`, minWidth: '60px' }} />
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 400,
                    fontSize: '0.8125rem',
                    color: cat.accentColor,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {cat.services.length} procedimentos
                </span>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#ebebeb', border: '1px solid #ebebeb', borderRadius: '16px', overflow: 'hidden' }}>
              {cat.services.map((service, svcIndex) => (
                <ServiceCard
                  key={service.name}
                  service={service}
                  index={svcIndex}
                  accentColor={cat.accentColor}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Footer CTA ── */}
      <section
        className="py-12 lg:py-20 px-4 lg:px-6 text-center"
        style={{ background: 'var(--color-black)' }}
      >
        <div className="max-w-2xl mx-auto">
          <p
            className="tracking-[0.25em] uppercase mb-6"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '0.75rem', color: 'var(--color-gold)' }}
          >
            Pronta para transformar?
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 300,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'white',
              lineHeight: '1.2',
            }}
          >
            Agende sua consulta
            <br />
            <span style={{ color: 'var(--color-sage)' }}>de avaliação gratuita</span>
          </h2>
          <p
            className="mt-6 mb-10"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1rem', color: '#999', lineHeight: '1.7' }}
          >
            Nossa equipe especializada irá indicar os melhores tratamentos para o seu perfil.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.open('https://wa.me/5521972668520?text=Olá! Gostaria de agendar uma consulta de avaliação.', '_blank')}
              className="px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ background: 'var(--color-sage)', color: 'white', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.9375rem', border: 'none', cursor: 'pointer' }}
            >
              Falar no WhatsApp
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-105"
              style={{ background: 'transparent', color: 'white', fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '0.9375rem', border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer' }}
            >
              Voltar ao início
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0) translateX(0); }
          33% { transform: translateY(-12px) translateX(8px); }
          66% { transform: translateY(6px) translateX(-6px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

// ── Service Card sub-component ──
function ServiceCard({
  service,
  index,
  accentColor,
}: {
  service: { name: string; description: string };
  index: number;
  accentColor: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="p-6 transition-all duration-300"
      style={{
        background: hovered ? `${accentColor}08` : '#ffffff',
        cursor: 'default',
        animation: `fadeInUp 0.5s ease-out ${index * 0.04}s both`,
      }}
    >
      <div className="flex items-start gap-4">
        {/* Number badge */}
        <div
          className="flex-shrink-0 mt-0.5 transition-all duration-300"
          style={{
            width: '1.75rem',
            height: '1.75rem',
            borderRadius: '50%',
            background: hovered ? accentColor : `${accentColor}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 400,
              fontSize: '0.7rem',
              color: hovered ? 'white' : accentColor,
              transition: 'color 0.3s',
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Text */}
        <div>
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 400,
              fontSize: '1rem',
              color: 'var(--color-black)',
              lineHeight: '1.4',
              marginBottom: '0.4rem',
            }}
          >
            {service.name}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 300,
              fontSize: '0.8125rem',
              color: '#777',
              lineHeight: '1.6',
            }}
          >
            {service.description}
          </p>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="mt-5 h-px transition-all duration-500"
        style={{
          background: `linear-gradient(to right, ${accentColor}${hovered ? '60' : '20'}, transparent)`,
        }}
      />
    </div>
  );
}