import { ImageWithFallback } from './figma/ImageWithFallback';

const professionals = [
  {
    id: 1,
    name: 'Dr.ª Giselle Lourenço',
    title: 'Enfermeira Dermatológica · Estética Avançada',
    specialty: 'Harmonização Facial · Corporal · 18 anos de experiência',
    photo: '/images/team-giselle.webp',
    bio: 'Com 18 anos de trajetória na área da saúde e pós-graduada em Estética Avançada e Enfermagem Dermatológica, ofereço um olhar clínico refinado e técnico para o setor da beleza. Especialista em harmonização facial e corporal, atuo há 6 anos transformando a vida de meus pacientes através de tratamentos personalizados.\n\nAcredito que a estética de excelência é aquela que respeita a identidade de cada indivíduo. Por isso, minha prática é pautada na atualização constante e na dedicação integral em cuidar de vidas, entregando resultados que elevam a autoconfiança com segurança e ética profissional.',
    whatsapp: 'https://wa.me/5521972668520?text=Olá! Gostaria de agendar uma consulta com a Dr.ª Giselle.',
    accentColor: '#D4AF37',
    ctaLabel: 'Agendar com Giselle',
  },
  {
    id: 2,
    name: 'Thyago Lima',
    title: 'Especialista em Micropigmentação & Camuflagem',
    specialty: 'Micropigmentação · Camuflagem · 16 anos de experiência',
    photo: '/images/team-thyago.webp',
    bio: 'Minha trajetória na estética começou há mais de 12 anos, de forma simples, com o design em henna. No entanto, minha inquietude e o desejo de entregar resultados mais profundos me guiaram para as novas tecnologias do setor. Hoje, sou especialista em Micropigmentação, Camuflagem de Cicatrizes e Regeneração de Fios — procedimentos que vão além da estética, devolvendo a identidade e a confiança a cada cliente.\n\nCom a marca de mais de 10 mil atendimentos realizados, sinto que minha missão está apenas começando. Atualmente, curso graduação na área da saúde para fundamentar ainda mais minha prática com base científica e segurança.',
    whatsapp: 'https://wa.me/5521972668520?text=Olá! Gostaria de agendar uma consulta com o Thyago.',
    accentColor: '#8DAA91',
    ctaLabel: 'Agendar com Thyago',
  },
  {
    id: 3,
    name: 'Marcos Galdino',
    title: 'Esteticista & Massoterapeuta',
    specialty: 'Rejuvenescimento · Terapias Corporais · 16 anos de experiência',
    photo: '/images/team-marcos.webp',
    bio: 'Minha trajetória começou ainda aos 13 anos de idade, quando iniciei minha formação como cabeleireiro. Ao longo de 15 anos nessa profissão, tive o privilégio de contribuir para a autoestima e confiança de inúmeras mulheres, proporcionando não apenas beleza, mas também bem-estar emocional.\n\nMovido pelo desejo de ampliar meu cuidado com as pessoas, há mais de 5 anos direcionei minha carreira para a estética e a massoterapia. Hoje, meu trabalho é focado em promover saúde e qualidade de vida, com tratamentos avançados para rejuvenescimento da pele e terapias corporais para redução do estresse e da ansiedade.',
    whatsapp: 'https://wa.me/5521972668520?text=Olá! Gostaria de agendar uma consulta com o Marcos.',
    accentColor: '#D4AF37',
    ctaLabel: 'Agendar com Marcos',
  },
];

export function TeamSection() {
  return (
    <section
      id="equipe"
      className="relative py-14 lg:py-28 px-4 lg:px-6 overflow-hidden"
      style={{ background: '#FAFAF8' }}
    >
      {/* Background ornament */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 10% 50%, rgba(141,170,145,0.06) 0%, transparent 55%), radial-gradient(circle at 90% 30%, rgba(212,175,55,0.05) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <p
            className="tracking-[0.3em] uppercase mb-5"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 400,
              fontSize: '0.75rem',
              color: 'var(--color-sage-dark)',
            }}
          >
            Nossa Equipe
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 400,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--color-black)',
              lineHeight: '1.2',
            }}
          >
            Os profissionais por trás
            <br />
            <span style={{ color: 'var(--color-sage)' }}>da sua transformação</span>
          </h2>
          <div
            className="mx-auto mt-8"
            style={{
              width: '48px',
              height: '1px',
              background: 'linear-gradient(to right, transparent, var(--color-gold), transparent)',
            }}
          />
        </div>

        {/* Cards Container - Carousel on Mobile, Grid on Desktop */}
        <div 
          id="equipe-carousel"
          className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 items-stretch overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none pb-8 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <style>{`
            #equipe-carousel::-webkit-scrollbar { display: none; }
          `}</style>
          
          {professionals.map((pro, index) => (
            <div 
              key={pro.id} 
              className="flex-shrink-0 w-[85%] sm:w-[70%] md:w-full snap-center flex"
            >
              <ProfessionalCard pro={pro} index={index} />
            </div>
          ))}
        </div>

        {/* Mobile Scroll Indicator */}
        <div className="flex md:hidden justify-center items-center gap-2 mt-2">
          {professionals.map((_, i) => (
            <div 
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-gray-300"
              style={{ opacity: 0.5 }}
            />
          ))}
          <span className="ml-2 text-[10px] uppercase tracking-widest text-gray-400 font-medium">
            Arraste para o lado
          </span>
        </div>
      </div>
    </section>
  );
}

function ProfessionalCard({
  pro,
  index,
}: {
  pro: (typeof professionals)[number];
  index: number;
}) {
  return (
    <div
      className="group flex flex-col h-full w-full"
      style={{
        borderRadius: '24px',
        overflow: 'hidden',
        background: '#ffffff',
        boxShadow: '0 4px 32px rgba(0,0,0,0.07)',
        animation: `fadeInUp 0.7s ease-out ${index * 0.15}s both`,
        transition: 'transform 0.4s ease, box-shadow 0.4s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-8px)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 56px rgba(0,0,0,0.13)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 32px rgba(0,0,0,0.07)';
      }}
    >
      {/* Portrait */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
        <ImageWithFallback
          src={pro.photo}
          alt={`Foto de ${pro.name}`}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          width="400"
          height="533"
          loading="lazy"
          decoding="async"
        />

        {/* Gradient overlay at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '55%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 60%, transparent 100%)',
          }}
        />

        {/* Accent badge — top left */}
        <div
          className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full"
          style={{
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(12px)',
            border: `1px solid ${pro.accentColor}50`,
          }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: pro.accentColor }}
          />
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 400,
              fontSize: '0.65rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.9)',
            }}
          >
            Savid Maricá
          </span>
        </div>

        {/* Name & specialty overlaid on image bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 400,
              fontSize: '1.4rem',
              color: '#ffffff',
              lineHeight: '1.2',
              marginBottom: '0.3rem',
              textShadow: '0 1px 8px rgba(0,0,0,0.3)',
            }}
          >
            {pro.name}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 400,
              fontSize: '0.7rem',
              letterSpacing: '0.13em',
              textTransform: 'uppercase',
              color: pro.accentColor,
            }}
          >
            {pro.specialty}
          </p>
        </div>
      </div>

      {/* Content area */}
      <div className="flex flex-col flex-1 p-7">
        {/* Title */}
        <p
          className="mb-5"
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            fontSize: '0.8rem',
            color: pro.accentColor,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            minHeight: '2.75rem',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {pro.title}
        </p>

        {/* Thin accent rule */}
        <div
          className="mb-6"
          style={{
            width: '36px',
            height: '1px',
            background: `linear-gradient(to right, ${pro.accentColor}, transparent)`,
          }}
        />

        {/* Bio paragraphs */}
        <div className="flex-1 space-y-4">
          {pro.bio.split('\n\n').map((paragraph, i) => (
            <p
              key={i}
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 300,
                fontSize: '0.9rem',
                color: '#666',
                lineHeight: '1.85',
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href={pro.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 flex items-center justify-center gap-2.5 py-3.5 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-[1.03] active:scale-[0.98]"
          style={{
            background:
              pro.accentColor === '#D4AF37'
                ? 'linear-gradient(135deg, #D4AF37 0%, #c9a227 100%)'
                : 'linear-gradient(135deg, #8DAA91 0%, #7a9a7e 100%)',
            color: 'white',
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            fontSize: '0.875rem',
            letterSpacing: '0.03em',
            textDecoration: 'none',
            boxShadow:
              pro.accentColor === '#D4AF37'
                ? '0 4px 20px rgba(212,175,55,0.3)'
                : '0 4px 20px rgba(141,170,145,0.3)',
          }}
        >
          {/* WhatsApp icon */}
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            style={{ flexShrink: 0 }}
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.47-.148-.669.149-.198.297-.768.967-.941 1.166-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.15-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.148.198 2.095 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.004 2C6.465 2 2 6.463 2 12.001c0 1.761.46 3.467 1.333 4.976L2 22l5.167-1.354A9.958 9.958 0 0012.004 22C17.54 22 22 17.537 22 12.001 22 6.463 17.54 2 12.004 2z" />
          </svg>
          {pro.ctaLabel}
        </a>
      </div>
    </div>
  );
}
