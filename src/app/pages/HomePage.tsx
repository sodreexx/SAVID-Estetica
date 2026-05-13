import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { TeamSection } from "../components/TeamSection";

export default function HomePage() {
  const navigate = useNavigate();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHeroMouseMove = (
    e: React.MouseEvent<HTMLElement>,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleHeroMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const testimonials = [
    {
      text: "A experiência foi transformadora. A equipe é altamente qualificada e o ambiente é simplesmente maravilhoso. Cada visita é um momento de cuidado e atenção aos detalhes.",
      author: "Ana Carolina",
      role: "Cliente desde 2018",
    },
    {
      text: "Profissionalismo impecável e resultados que superam expectativas. Recomendo de olhos fechados! A clínica oferece um padrão de excelência incomparável.",
      author: "Juliana Ribeiro",
      role: "Cliente desde 2019",
    },
    {
      text: "O cuidado com cada detalhe faz toda diferença. Saio de lá me sentindo renovada e com uma autoestima completamente elevada. Simplesmente perfeito!",
      author: "Mariana Santos",
      role: "Cliente desde 2020",
    },
    {
      text: "Fui recebida com tanto carinho e profissionalismo que me senti em casa. Os resultados são naturais e incríveis, exatamente o que eu procurava.",
      author: "Beatriz Almeida",
      role: "Cliente desde 2021",
    },
    {
      text: "A estrutura da clínica é impecável e a equipe é extremamente competente. Me sinto segura e confiante em cada procedimento realizado aqui.",
      author: "Camila Ferreira",
      role: "Cliente desde 2022",
    },
    {
      text: "Nunca imaginei que pudesse me sentir tão bem cuidada. O atendimento personalizado e a dedicação da equipe fazem toda a diferença no resultado final.",
      author: "Fernanda Costa",
      role: "Cliente desde 2023",
    },
    {
      text: "Recomendo para todas as minhas amigas! A clínica é referência em qualidade, sofisticação e resultados naturais. Simplesmente a melhor experiência.",
      author: "Gabriela Lima",
      role: "Cliente desde 2024",
    },
    {
      text: "Cada detalhe é pensado para proporcionar conforto e segurança. Os profissionais são extremamente qualificados e o resultado é sempre impecável.",
      author: "Isabela Souza",
      role: "Cliente desde 2026",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(
        (prev) => (prev + 1) % testimonials.length,
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <Helmet>
        <title>Savid Maricá — Clínica de Estética e Harmonização Facial</title>
        <meta
          name="description"
          content="Clínica de estética em Maricá especializada em harmonização facial, micropigmentação, tratamentos de pele e procedimentos estéticos avançados. Mais de 1.200 clientes atendidas. Agende sua consulta."
        />
        <meta property="og:title" content="Savid Maricá — Clínica de Estética e Harmonização Facial" />
        <meta property="og:description" content="Tratamentos estéticos personalizados com tecnologia de ponta em Maricá, RJ. Mais de 1.200 clientes atendidas." />
        <meta property="og:url" content="https://savid.com.br/" />
      </Helmet>

      {/* Floating Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3 md:py-[22px]" : "py-3 md:py-[30px]"
        }`}
        style={{ animation: "slideDown 0.8s ease-out" }}
      >
        <nav
          className={`max-w-6xl mx-auto px-4 lg:px-6 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5" : "bg-white/70 backdrop-blur-md"} rounded-[20px]`}
          style={{
            border: "1px solid rgba(212, 175, 55, 0.2)",
          }}
        >
          <div className="flex items-center justify-between py-3 px-4 md:py-[22px] md:px-8 m-[0px]">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src="/src/imports/Design_sem_nome_(8)-1.png"
                alt="Savid Maricá Logo"
                className="h-14 md:h-24 w-auto object-contain m-[0px]"
              />
            </div>

            {/* Menu */}
            <ul className="hidden md:flex items-center gap-8">
              {[
                { label: "Home", target: "hero" },
                { label: "Serviços", target: "servicos" },
                { label: "Equipe", target: "equipe" },
                { label: "Sobre", target: "sobre" },
                { label: "Contato", target: "contato" },
              ].map((item) => (
                <li key={item.label} className="relative group">
                  <button
                    onClick={() => {
                      if (item.target === "hero") {
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      } else if (item.target === "servicos") {
                        navigate("/servicos");
                      } else {
                        const el = document.getElementById(
                          item.target,
                        );
                        if (el) {
                          const y = el.getBoundingClientRect().top + window.scrollY - 130;
                          window.scrollTo({ top: y, behavior: 'smooth' });
                        }
                      }
                    }}
                    className="relative text-sm tracking-wide pb-1"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 500,
                      color: "var(--color-black)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "4px 0",
                      transition: "color 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      (
                        e.currentTarget as HTMLButtonElement
                      ).style.color = "var(--color-sage)";
                    }}
                    onMouseLeave={(e) => {
                      (
                        e.currentTarget as HTMLButtonElement
                      ).style.color = "var(--color-black)";
                    }}
                  >
                    {item.label}
                  </button>
                  {/* Gold underline — slides in on group-hover */}
                  <span
                    className="absolute bottom-0 left-0 h-px transition-all duration-300 ease-out group-hover:w-full"
                    style={{
                      width: "0%",
                      background: "var(--color-gold)",
                    }}
                  />
                </li>
              ))}
            </ul>

            {/* CTA Button — desktop only */}
            <a
              href="https://wa.me/5521972668520"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block px-6 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 hover:brightness-110 active:scale-100"
              style={{
                background: "var(--color-sage)",
                color: "white",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "0.875rem",
                letterSpacing: "0.02em",
                textDecoration: "none",
              }}
            >
              Agendar Consulta
            </a>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Menu"
            >
              <span
                className="block w-6 h-px transition-all duration-300"
                style={{
                  background: "var(--color-black)",
                  transform: mobileMenuOpen
                    ? "translateY(5px) rotate(45deg)"
                    : "none",
                }}
              />
              <span
                className="block w-6 h-px transition-all duration-300"
                style={{
                  background: "var(--color-black)",
                  opacity: mobileMenuOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-6 h-px transition-all duration-300"
                style={{
                  background: "var(--color-black)",
                  transform: mobileMenuOpen
                    ? "translateY(-5px) rotate(-45deg)"
                    : "none",
                }}
              />
            </button>
          </div>

          {/* Mobile Menu Drawer */}
          <div
            className="md:hidden overflow-hidden transition-all duration-400"
            style={{
              maxHeight: mobileMenuOpen ? "420px" : "0",
            }}
          >
            <div
              className="px-8 pb-6 pt-2 flex flex-col gap-1"
              style={{ borderTop: "1px solid rgba(212,175,55,0.15)" }}
            >
              {[
                { label: "Home", target: "hero" },
                { label: "Serviços", target: "servicos" },
                { label: "Equipe", target: "equipe" },
                { label: "Sobre", target: "sobre" },
                { label: "Contato", target: "contato" },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (item.target === "hero") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    } else if (item.target === "servicos") {
                      navigate("/servicos");
                    } else {
                      const el = document.getElementById(item.target);
                      if (el) {
                        const y = el.getBoundingClientRect().top + window.scrollY - 110;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                      }
                    }
                  }}
                  className="text-left py-3 w-full"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    fontSize: "1rem",
                    color: "var(--color-black)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    borderBottom: "1px solid rgba(212,175,55,0.1)",
                  }}
                >
                  {item.label}
                </button>
              ))}
              <a
                href="https://wa.me/5521972668520"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 w-full py-3 rounded-full"
                style={{
                  background: "var(--color-sage)",
                  color: "white",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  display: "block",
                  textAlign: "center",
                }}
              >
                Agendar Consulta
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        ref={heroRef}
        className="relative overflow-hidden lg:px-6 min-h-screen flex items-center lg:pt-0"
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
      >
        {/* Background Decorative Elements — hidden on small screens for performance */}
        <div className="hidden sm:block absolute inset-0 pointer-events-none overflow-hidden">
          {/* Parallax Layer 1 — slowest (depth: far) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: `translate(${mousePos.x * 14}px, ${mousePos.y * 14}px)`,
              transition:
                "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            {/* Large Sage Circle - top right */}
            <div
              className="absolute rounded-full"
              style={{
                top: "8%",
                right: "5%",
                width: "280px",
                height: "280px",
                background:
                  "radial-gradient(circle, rgba(141,170,145,0.15), rgba(141,170,145,0.05))",
                filter: "blur(40px)",
                animation: "floatSlow 12s ease-in-out infinite",
              }}
            />
            {/* Gold Ring - bottom left */}
            <div
              className="absolute rounded-full"
              style={{
                bottom: "20%",
                left: "5%",
                width: "200px",
                height: "200px",
                border: "1.5px solid rgba(212,175,55,0.2)",
                animation:
                  "floatSlow 14s ease-in-out infinite 3s",
              }}
            />
          </div>

          {/* Parallax Layer 2 — medium */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: `translate(${mousePos.x * 28}px, ${mousePos.y * 28}px)`,
              transition:
                "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            {/* Medium Gold Circle - top left */}
            <div
              className="absolute rounded-full"
              style={{
                top: "15%",
                left: "8%",
                width: "180px",
                height: "180px",
                background:
                  "radial-gradient(circle, rgba(212,175,55,0.12), rgba(212,175,55,0.03))",
                filter: "blur(30px)",
                animation:
                  "floatSlow 10s ease-in-out infinite 1s",
              }}
            />
            {/* Small Sage Circle - bottom right */}
            <div
              className="absolute rounded-full"
              style={{
                bottom: "15%",
                right: "20%",
                width: "100px",
                height: "100px",
                background: "rgba(141,170,145,0.1)",
                animation:
                  "floatMedium 9s ease-in-out infinite 1.5s",
              }}
            />
          </div>

          {/* Parallax Layer 3 — fastest (depth: close) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: `translate(${mousePos.x * 45}px, ${mousePos.y * 45}px)`,
              transition:
                "transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            {/* Small Sage Square - mid right */}
            <div
              className="absolute"
              style={{
                top: "45%",
                right: "12%",
                width: "120px",
                height: "120px",
                background: "rgba(141,170,145,0.08)",
                borderRadius: "24px",
                transform: "rotate(15deg)",
                animation:
                  "floatMedium 8s ease-in-out infinite 2s",
              }}
            />
            {/* Tiny Gold Dot - mid left */}
            <div
              className="absolute rounded-full"
              style={{
                top: "55%",
                left: "15%",
                width: "60px",
                height: "60px",
                background:
                  "radial-gradient(circle, rgba(212,175,55,0.25), rgba(212,175,55,0.05))",
                filter: "blur(15px)",
                animation:
                  "floatMedium 7s ease-in-out infinite 2.5s",
              }}
            />
            {/* Sage Rounded Rectangle - top center */}
            <div
              className="absolute"
              style={{
                top: "10%",
                left: "45%",
                width: "140px",
                height: "90px",
                background: "rgba(141,170,145,0.06)",
                borderRadius: "45px",
                transform: "rotate(-12deg)",
                animation:
                  "floatSlow 11s ease-in-out infinite 4s",
              }}
            />
          </div>

          {/* Additional Decorative Layer — floating particles */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              opacity: 0.6,
            }}
          >
            {/* Gold sparkle particles */}
            {[
              {
                top: "20%",
                left: "18%",
                delay: "0s",
                size: "4px",
              },
              {
                top: "35%",
                right: "25%",
                delay: "1.5s",
                size: "3px",
              },
              {
                top: "60%",
                left: "30%",
                delay: "3s",
                size: "5px",
              },
              {
                top: "75%",
                right: "15%",
                delay: "2s",
                size: "3px",
              },
              {
                top: "25%",
                right: "40%",
                delay: "4s",
                size: "4px",
              },
              {
                top: "50%",
                left: "10%",
                delay: "2.5s",
                size: "3px",
              },
              {
                top: "80%",
                left: "40%",
                delay: "1s",
                size: "4px",
              },
              {
                top: "40%",
                right: "8%",
                delay: "3.5s",
                size: "3px",
              },
            ].map((particle, i) => (
              <div
                key={`particle-${i}`}
                className="absolute rounded-full"
                style={{
                  ...particle,
                  width: particle.size,
                  height: particle.size,
                  background: "var(--color-gold)",
                  boxShadow: "0 0 8px rgba(212,175,55,0.6)",
                  animation: `sparkle 3s ease-in-out infinite ${particle.delay}`,
                }}
              />
            ))}

            {/* Subtle glow spots */}
            <div
              className="absolute"
              style={{
                top: "30%",
                right: "10%",
                width: "200px",
                height: "200px",
                background:
                  "radial-gradient(circle, rgba(141,170,145,0.12), transparent 65%)",
                filter: "blur(50px)",
                animation: "pulse 8s ease-in-out infinite 1s",
              }}
            />
            <div
              className="absolute"
              style={{
                bottom: "25%",
                left: "12%",
                width: "160px",
                height: "160px",
                background:
                  "radial-gradient(circle, rgba(212,175,55,0.08), transparent 70%)",
                filter: "blur(45px)",
                animation: "pulse 7s ease-in-out infinite 2.5s",
              }}
            />

            {/* Thin decorative lines */}
            <div
              className="absolute"
              style={{
                top: "18%",
                right: "6%",
                width: "80px",
                height: "1px",
                background:
                  "linear-gradient(to right, transparent, rgba(212,175,55,0.4), transparent)",
                transform: "rotate(45deg)",
                animation: "fadeInOut 5s ease-in-out infinite",
              }}
            />
            <div
              className="absolute"
              style={{
                bottom: "30%",
                left: "8%",
                width: "100px",
                height: "1px",
                background:
                  "linear-gradient(to right, transparent, rgba(141,170,145,0.35), transparent)",
                transform: "rotate(-35deg)",
                animation:
                  "fadeInOut 6s ease-in-out infinite 2s",
              }}
            />

            {/* Small geometric shapes */}
            <div
              className="absolute"
              style={{
                top: "12%",
                right: "30%",
                width: "8px",
                height: "8px",
                border: "1px solid rgba(212,175,55,0.3)",
                borderRadius: "2px",
                transform: "rotate(25deg)",
                animation:
                  "floatMedium 9s ease-in-out infinite 1s",
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                bottom: "40%",
                right: "18%",
                width: "6px",
                height: "6px",
                border: "1px solid rgba(141,170,145,0.3)",
                animation:
                  "floatSlow 10s ease-in-out infinite 3s",
              }}
            />
            <div
              className="absolute"
              style={{
                top: "65%",
                left: "25%",
                width: "10px",
                height: "10px",
                border: "1px solid rgba(212,175,55,0.25)",
                borderRadius: "3px",
                transform: "rotate(-15deg)",
                animation:
                  "floatMedium 8s ease-in-out infinite 2s",
              }}
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">

          {/* ═══════════════════════════════════════════════
              MOBILE HERO — full-screen image + overlaid text
              ═══════════════════════════════════════════════ */}
          <div
            className="lg:hidden relative flex flex-col justify-center"
            style={{ minHeight: "100svh" }}
          >
            {/* Text content */}
            <div
              className="relative z-10 px-6 pt-36 pb-14 space-y-5"
              style={{ animation: "fadeInRight 1s ease-out 0.4s both" }}
            >
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 400,
                  fontSize: "0.7rem",
                  color: "var(--color-sage-dark)",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                }}
              >
                Beleza que transforma
              </p>

              <h1
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 400,
                  fontSize: "clamp(2.2rem, 9vw, 3rem)",
                  lineHeight: "1.1",
                  color: "var(--color-black)",
                  letterSpacing: "-0.02em",
                }}
              >
                Desperte sua
                <br />
                <span style={{ color: "var(--color-sage)" }}>melhor versão</span>
              </h1>

              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 300,
                  fontSize: "1rem",
                  color: "#555",
                  lineHeight: "1.75",
                  maxWidth: "36ch",
                }}
              >
                Tratamentos estéticos personalizados com tecnologia de ponta e
                cuidado profissional para realçar sua beleza natural.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 pt-1">
                <a
                  href="https://wa.me/5521972668520"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 rounded-lg transition-all duration-300 active:scale-95"
                  style={{
                    background: "var(--color-sage)",
                    color: "white",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    fontSize: "1rem",
                    textDecoration: "none",
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  Agendar Consulta
                </a>
                <button
                  onClick={() => {
                    const el = document.getElementById("contato");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-8 py-3.5 rounded-lg transition-all duration-300 active:scale-95 relative group"
                  style={{
                    background: "transparent",
                    color: "var(--color-black)",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    fontSize: "1rem",
                  }}
                >
                  Saiba Mais
                  <span
                    className="absolute bottom-3 left-8 right-8 h-0.5"
                    style={{ background: "var(--color-gold)" }}
                  />
                </button>
              </div>

              {/* Impact Stats */}
              <div
                className="flex flex-row gap-6 pt-4"
                style={{ borderTop: "1px solid rgba(212,175,55,0.18)" }}
              >
                {[
                  { number: "1.200+", label: "Clientes Atendidas" },
                  { number: "8 Anos", label: "de Experiência" },
                  { number: "4.9 ★", label: "Avaliação Média" },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-0.5">
                    <span
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontWeight: 400,
                        fontSize: "1.4rem",
                        color: "var(--color-gold)",
                        lineHeight: 1,
                      }}
                    >
                      {stat.number}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontWeight: 400,
                        fontSize: "0.62rem",
                        color: "#888",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════
              DESKTOP HERO — side-by-side grid (lg+)
              ═══════════════════════════════════════════════ */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center bg-[#00000000] p-[0px] m-[0px] py-16 lg:py-24">
            {/* Left - Professional Portraits with Organic Shapes */}
            <div
              className="relative h-[320px] sm:h-[420px] lg:h-[600px] order-2 lg:order-1"
              style={{ animation: "fadeInLeft 1s ease-out" }}
            >
              {/* Background Organic Shapes */}
              <div className="absolute inset-0">
                <svg
                  className="absolute top-0 left-0 w-full h-full"
                  viewBox="0 0 500 600"
                  fill="none"
                >
                  {/* Sage Green Blob 1 */}
                  <path
                    d="M150,100 Q250,50 350,120 T400,250 Q380,350 280,380 T120,320 Q80,220 150,100 Z"
                    fill="var(--color-sage)"
                    opacity="0.15"
                    style={{
                      animation:
                        "float 8s ease-in-out infinite",
                    }}
                  />
                  {/* Sage Green Blob 2 */}
                  <path
                    d="M100,300 Q180,250 260,310 T350,450 Q300,520 200,500 T80,420 Q60,360 100,300 Z"
                    fill="var(--color-sage-light)"
                    opacity="0.2"
                    style={{
                      animation:
                        "float 10s ease-in-out infinite 1s",
                    }}
                  />
                  {/* Gold Glow */}
                  <ellipse
                    cx="300"
                    cy="200"
                    rx="120"
                    ry="100"
                    fill="var(--color-gold)"
                    opacity="0.08"
                    style={{
                      filter: "blur(40px)",
                      animation:
                        "pulse 6s ease-in-out infinite",
                    }}
                  />
                </svg>
              </div>

              {/* Portrait Images */}
              <div className="relative z-10 h-full p-[0px]">
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    animation: "fadeIn 1.2s ease-out 0.3s both",
                  }}
                >
                  <img
                    src="/images/hero-apresentacao.png"
                    alt="Professional team portrait"
                    className="w-full h-full object-cover object-top"
                    width="600"
                    height="600"
                    fetchPriority="high"
                    decoding="async"
                  />
                </div>
              </div>
            </div>

            {/* Right - Pyramid Text Stack */}
            <div
              className="space-y-6 lg:space-y-8 order-1 lg:order-2"
              style={{
                animation: "fadeInRight 1s ease-out 0.5s both",
              }}
            >
              {/* T1: Small uppercase compliment */}
              <p
                className="tracking-[0.3em] uppercase"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 400,
                  fontSize: "0.75rem",
                  color: "var(--color-sage-dark)",
                  letterSpacing: "0.3em",
                }}
              >
                Beleza que transforma
              </p>

              {/* T2: Large bold impact title */}
              <h1
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 400,
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                  lineHeight: "1.1",
                  color: "var(--color-black)",
                  letterSpacing: "-0.02em",
                }}
              >
                Desperte sua
                <br />
                <span style={{ color: "var(--color-sage)" }}>
                  melhor versão
                </span>
              </h1>

              {/* T3: Medium descriptive phrase */}
              <p
                className="max-w-lg leading-relaxed"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 300,
                  fontSize: "1.125rem",
                  color: "#555",
                  lineHeight: "1.8",
                }}
              >
                Tratamentos estéticos personalizados com
                tecnologia de ponta e cuidado profissional para
                realçar sua beleza natural.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-2 lg:pt-4">
                <a
                  href="https://wa.me/5521972668520"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-105 w-full sm:w-auto"
                  style={{
                    background: "var(--color-sage)",
                    color: "white",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    fontSize: "1rem",
                    textDecoration: "none",
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  Agendar Consulta
                </a>
                <button
                  onClick={() => {
                    const el = document.getElementById("contato");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-8 py-3.5 rounded-lg transition-all duration-300 hover:scale-105 relative group w-full sm:w-auto"
                  style={{
                    background: "transparent",
                    color: "var(--color-black)",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    fontSize: "1rem",
                  }}
                >
                  Saiba Mais
                  <span
                    className="absolute bottom-3 left-8 right-8 h-0.5 transition-all duration-300 group-hover:left-6 group-hover:right-6"
                    style={{ background: "var(--color-gold)" }}
                  />
                </button>
              </div>

              {/* Impact Stats */}
              <div
                className="flex flex-row flex-wrap gap-6 pt-5 lg:pt-6"
                style={{
                  borderTop: "1px solid rgb(212 175 55 / 0.18)",
                  animation: "fadeInRight 1s ease-out 1s both",
                }}
              >
                {[
                  {
                    number: "30.000+",
                    label: "Clientes Atendidas",
                  },
                  { number: "14 Anos", label: "de Experiência" },
                  { number: "4.9 ★", label: "Avaliação Média" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col gap-1"
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontWeight: 400,
                        fontSize: "1.6rem",
                        color: "var(--color-gold)",
                        lineHeight: 1,
                        fontVariantNumeric: "tabular-nums",
                        display: "block",
                      }}
                    >
                      {stat.number}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontWeight: 300,
                        fontSize: "0.7rem",
                        color: "#999",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator — hidden on mobile */}
        <div
          className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 pointer-events-none"
          style={{ animation: "fadeIn 1s ease-out 2s both" }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.6rem",
              letterSpacing: "0.25em",
              color: "#bbb",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
          <div
            style={{
              animation:
                "scrollBounce 1.6s ease-in-out infinite",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="rgba(212,175,55,0.7)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="servicos"
        className="relative py-14 lg:py-24 px-4 lg:px-6 overflow-hidden"
        style={{ background: "#F8F8F6" }}
      >
        {/* Thin gold axis line */}
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            top: "50%",
            height: "0.5px",
            background:
              "linear-gradient(to right, transparent 2%, #D4AF37 20%, #D4AF37 80%, transparent 98%)",
            opacity: 0.3,
            zIndex: 0,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-14">
            <p
              className="tracking-[0.3em] uppercase mb-4"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
                fontSize: "0.75rem",
                color: "var(--color-sage-dark)",
              }}
            >
              Nossos Serviços
            </p>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 400,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--color-black)",
              }}
            >
              Excelência em cada tratamento
            </h2>
          </div>

          {/* 4 Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
            {[
              {
                title: "Beleza Express",
                anchor: "beleza",
                image:
                  "https://images.unsplash.com/photo-1761718209694-70031ee64f82?w=600&h=900&fit=crop",
              },
              {
                title: "Estética Avançada",
                anchor: "avancada",
                image:
                  "https://images.unsplash.com/photo-1761718210089-ba3bb5ccb54f?w=600&h=900&fit=crop",
              },
              {
                title: "Tratamento de Pele",
                anchor: "pele",
                image:
                  "https://images.unsplash.com/photo-1731514771613-991a02407132?w=600&h=900&fit=crop",
              },
              {
                title: "Estética Corporal",
                anchor: "corporal",
                image:
                  "https://images.unsplash.com/photo-1696841212541-449ca29397cc?w=600&h=900&fit=crop",
              },
            ].map((service, index) => (
              <div
                key={service.title}
                className="group flex flex-col cursor-pointer"
                onClick={() =>
                  navigate(`/servicos#${service.anchor}`)
                }
                style={{
                  borderRadius: "28px",
                  overflow: "hidden",
                  background: "#fff",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                  animation: `fadeInUp 0.7s ease-out ${index * 0.1}s both`,
                  transition:
                    "transform 0.4s ease, box-shadow 0.4s ease",
                }}
                onMouseEnter={(e) => {
                  (
                    e.currentTarget as HTMLElement
                  ).style.transform = "translateY(-6px)";
                  (
                    e.currentTarget as HTMLElement
                  ).style.boxShadow =
                    "0 16px 48px rgba(0,0,0,0.14)";
                }}
                onMouseLeave={(e) => {
                  (
                    e.currentTarget as HTMLElement
                  ).style.transform = "translateY(0)";
                  (
                    e.currentTarget as HTMLElement
                  ).style.boxShadow =
                    "0 4px 24px rgba(0,0,0,0.08)";
                }}
              >
                {/* Image area */}
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "3/4" }}
                >
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Top-left badge */}
                  <div
                    className="absolute top-4 left-4 w-9 h-9 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(255,255,255,0.92)",
                      backdropFilter: "blur(8px)",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                    }}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 2L14.4 8.9H21.6L16.1 13.1L18.5 20L12 15.8L5.5 20L7.9 13.1L2.4 8.9H9.6L12 2Z"
                        fill="var(--color-gold)"
                      />
                    </svg>
                  </div>

                  {/* Subtle gradient at bottom of image */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-16"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.18), transparent)",
                    }}
                  />
                </div>

                {/* Bottom bar — white, solid */}
                <div
                  className="flex items-center justify-between px-3 py-3 lg:px-5 lg:py-4"
                  style={{ background: "#ffffff" }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontWeight: 400,
                      fontSize:
                        "clamp(0.95rem, 1.2vw, 1.15rem)",
                      color: "var(--color-black)",
                      lineHeight: "1.3",
                      flex: 1,
                    }}
                  >
                    {service.title}
                  </h3>

                  {/* Arrow button */}
                  <div
                    className="ml-3 flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: "var(--color-sage)",
                      boxShadow:
                        "0 2px 10px rgba(141,170,145,0.4)",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M7 17L17 7M17 7H7M17 7V17"
                        stroke="white"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sobre Nós Section ── */}
      <section id="sobre" className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[620px]">
          {/* Left — full-bleed image */}
          <div className="relative overflow-hidden min-h-[280px] sm:min-h-[380px] lg:min-h-0">
            <ImageWithFallback
              src="/images/clinica-ambiente.jpeg"
              alt="Interior da clínica"
              className="absolute inset-0 w-full h-full object-cover object-[center_15%]"
              width="800"
              height="600"
              loading="lazy"
              decoding="async"
            />
            <div
              className="absolute inset-y-0 right-0 w-24 hidden lg:block"
              style={{
                background:
                  "linear-gradient(to right, transparent, #f5f2ec)",
              }}
            />
          </div>

          {/* Right — cream text panel */}
          <div
            className="relative flex flex-col justify-center px-6 py-12 sm:px-12 sm:py-16 lg:px-20 lg:py-20"
            style={{ background: "#f5f2ec" }}
          >
            {/* Decorative ornament */}
            <div className="absolute top-10 right-10 opacity-40">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
              >
                <circle
                  cx="24"
                  cy="24"
                  r="22"
                  stroke="rgba(212,175,55,0.5)"
                  strokeWidth="0.8"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="14"
                  stroke="rgba(212,175,55,0.35)"
                  strokeWidth="0.6"
                />
                <line
                  x1="24"
                  y1="8"
                  x2="24"
                  y2="16"
                  stroke="rgba(212,175,55,0.5)"
                  strokeWidth="0.8"
                />
                <line
                  x1="24"
                  y1="32"
                  x2="24"
                  y2="40"
                  stroke="rgba(212,175,55,0.5)"
                  strokeWidth="0.8"
                />
                <line
                  x1="8"
                  y1="24"
                  x2="16"
                  y2="24"
                  stroke="rgba(212,175,55,0.5)"
                  strokeWidth="0.8"
                />
                <line
                  x1="32"
                  y1="24"
                  x2="40"
                  y2="24"
                  stroke="rgba(212,175,55,0.5)"
                  strokeWidth="0.8"
                />
              </svg>
            </div>

            {/* Label */}
            <p
              className="tracking-[0.3em] uppercase mb-5"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
                fontSize: "0.7rem",
                color: "var(--color-sage-dark)",
              }}
            >
              Sobre Nós
            </p>

            {/* Gold thin rule */}
            <div
              className="mb-8"
              style={{
                width: "48px",
                height: "1px",
                background:
                  "linear-gradient(to right, var(--color-gold), transparent)",
              }}
            />

            {/* Headline */}
            <h2
              className="mb-8"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 400,
                fontSize: "clamp(1.9rem, 3.2vw, 2.8rem)",
                lineHeight: "1.2",
                color: "var(--color-black)",
                letterSpacing: "-0.01em",
                maxWidth: "480px",
              }}
            >
              Nossa história,
              <br />
              <span style={{ color: "var(--color-sage-dark)" }}>
                nossa essência.
              </span>
            </h2>

            {/* Body paragraphs */}
            <div className="space-y-5 max-w-[480px]">
              {[
                "Nossa história começou com o sonho de criar um espaço dedicado à beleza, ao cuidado e à autoestima. Desde o início, acreditamos que a estética vai além da aparência, transformando a forma como cada pessoa se sente.",
                "Com dedicação e profissionalismo, crescemos oferecendo atendimento acolhedor, técnicas modernas e resultados que valorizam a beleza natural de cada cliente.",
                "Hoje, seguimos com o mesmo propósito: cuidar de pessoas, elevar a autoestima e proporcionar bem-estar em cada atendimento.",
              ].map((paragraph, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 300,
                    fontSize: "0.975rem",
                    color: "#5a5a5a",
                    lineHeight: "1.85",
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* CTA link */}
            <div
              className="mt-10 flex items-center gap-3 group cursor-pointer"
              style={{ width: "fit-content" }}
              onClick={() => {
                const el = document.getElementById("equipe");
                if (el)
                  el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  fontSize: "0.85rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--color-sage-dark)",
                }}
              >
                Conheça a equipe
              </span>
              <span
                className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:translate-y-0.5"
                style={{
                  background: "var(--color-sage)",
                  boxShadow:
                    "0 2px 10px rgba(141,170,145,0.35)",
                }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 5v14M5 12l7 7 7-7"
                    stroke="white"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>

            {/* Bottom-left soft blob */}
            <div
              className="absolute bottom-0 left-0 pointer-events-none"
              style={{
                width: "220px",
                height: "180px",
                background:
                  "radial-gradient(ellipse at bottom left, rgba(141,170,145,0.10), transparent 70%)",
                filter: "blur(30px)",
              }}
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />

      {/* Social Proof Section */}
      <section className="py-12 lg:py-24 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl">
            {/* Left - Portrait — hidden on mobile to save space */}
            <div className="relative h-[260px] sm:h-[360px] lg:h-auto">
              <img
                src="/images/clinica-procedimento.jpeg"
                alt="Nossa equipe"
                className="w-full h-full object-cover object-top"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(141, 170, 145, 0.1))",
                }}
              />
            </div>

            {/* Right - Testimonial Carousel */}
            <div
              className="relative p-7 sm:p-10 lg:p-16 flex flex-col justify-center"
              style={{
                background:
                  "linear-gradient(135deg, #f8faf9, #f0f4f2)",
              }}
            >
              <div
                className="mb-8"
                style={{
                  color: "var(--color-gold)",
                  fontSize: "5rem",
                  fontFamily: "var(--font-serif)",
                  lineHeight: 1,
                  opacity: 0.3,
                }}
              >
                "
              </div>

              <div className="relative min-h-[240px] lg:min-h-[360px]">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="absolute inset-0 transition-all duration-700"
                    style={{
                      opacity:
                        activeTestimonial === index ? 1 : 0,
                      transform:
                        activeTestimonial === index
                          ? "translateY(0)"
                          : "translateY(20px)",
                      pointerEvents:
                        activeTestimonial === index
                          ? "auto"
                          : "none",
                    }}
                  >
                    <p
                      className="mb-6 leading-relaxed"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontWeight: 300,
                        fontSize: "clamp(1rem, 3.5vw, 1.5rem)",
                        color: "var(--color-black)",
                        lineHeight: "1.8",
                      }}
                    >
                      {testimonial.text}
                    </p>
                    <div>
                      <p
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontWeight: 600,
                          fontSize: "1rem",
                          color: "var(--color-sage-dark)",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {testimonial.author}
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontWeight: 300,
                          fontSize: "0.875rem",
                          color: "#888",
                        }}
                      >
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carousel Dots */}
              <div className="flex gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      background:
                        activeTestimonial === index
                          ? "var(--color-gold)"
                          : "#d0d0d0",
                      width:
                        activeTestimonial === index
                          ? "2rem"
                          : "0.5rem",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Phrase Section */}
      <section
        className="py-16 lg:py-32 px-5 text-center relative overflow-hidden"
        style={{ background: "var(--color-white)" }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(var(--color-sage) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="max-w-4xl mx-auto relative z-10">
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "var(--color-black)",
              lineHeight: "1.3",
              letterSpacing: "-0.01em",
            }}
          >
            Sua jornada de transformação
            <br />
            <span
              style={{
                color: "var(--color-sage)",
                fontWeight: 400,
              }}
            >
              começa aqui
            </span>
          </h2>
        </div>
      </section>

      {/* Location & Contact Section */}
      <section
        id="contato"
        className="py-12 lg:py-20 px-4 lg:px-6"
        style={{ background: "#fafafa" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left - Map */}
            <div
              className="rounded-2xl overflow-hidden shadow-lg"
              style={{ border: "1px solid var(--color-gold)" }}
            >
              <div className="bg-gray-200 h-[400px] flex items-center justify-center relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3674.948783947298!2d-42.93317319841013!3d-22.915259840263495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x998d197d145959%3A0x30054093bb9c5a5b!2sSavid%20Sa%C3%BAde%20e%20Est%C3%A9tica!5e0!3m2!1spt-BR!2sbr!4v1777895779756!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização da clínica"
                />
              </div>
            </div>

            {/* Right - Contact Info */}
            <div className="flex flex-col justify-center space-y-8 p-4 lg:p-8">
              <div>
                <h3
                  className="mb-6"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontWeight: 500,
                    fontSize: "2rem",
                    color: "var(--color-black)",
                  }}
                >
                  Visite-nos
                </h3>
                <div className="space-y-4">
                  <div>
                    <p
                      className="mb-1"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        color: "var(--color-sage-dark)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Endereço
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontWeight: 300,
                        fontSize: "1rem",
                        color: "#555",
                        lineHeight: "1.6",
                      }}
                    >
                      Rua Caio Figueredo, 20
                      <br />
                      Inoã, Maricá - RJ
                      <br />
                      CEP 24943435
                    </p>
                  </div>

                  <div>
                    <p
                      className="mb-1"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        color: "var(--color-sage-dark)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Horário de Funcionamento
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontWeight: 300,
                        fontSize: "1rem",
                        color: "#555",
                        lineHeight: "1.6",
                      }}
                    >
                        Terça à Quinta: 9h - 17h
                      <br />
                      Sexta e Sábado: 10h - 18h
                      <br />
                      Domingo e segunda: Fechado
                    </p>
                  </div>

                  <div>
                    <p
                      className="mb-1"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        color: "var(--color-sage-dark)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Contato
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontWeight: 300,
                        fontSize: "1rem",
                        color: "#555",
                        lineHeight: "1.6",
                      }}
                    >
                      (21) 97266-8520
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        className="py-12 lg:py-20 px-4 lg:px-6"
        style={{ background: "var(--color-white)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
            {/* Left - Title */}
            <div className="lg:col-span-2 lg:sticky lg:top-32">
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 300,
                  fontSize: "clamp(2.5rem, 4vw, 3.8rem)",
                  color: "var(--color-black)",
                  lineHeight: "1.15",
                  letterSpacing: "-0.02em",
                }}
              >
                Dúvidas
                <br />
                <span style={{ color: "var(--color-sage)" }}>
                  Frequentes
                </span>
              </h2>
              <div
                className="mt-6 w-12 h-px"
                style={{ background: "var(--color-gold)" }}
              />
              <p
                className="mt-6"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 300,
                  fontSize: "1rem",
                  color: "#777",
                  lineHeight: "1.7",
                }}
              >
                Tire suas principais dúvidas sobre nossos
                procedimentos e tratamentos estéticos.
              </p>
            </div>

            {/* Right - Accordion */}
            <div className="lg:col-span-3">
              {[
                {
                  question: "O efeito do Botox é definitivo?",
                  answer:
                    "Não. A toxina botulínica é um tratamento temporário que age relaxando a musculatura para suavizar rugas e linhas de expressão. O efeito costuma durar entre 4 a 6 meses, dependendo do organismo de cada paciente, sendo recomendada uma nova aplicação para manter os resultados.",
                },
                {
                  question: "A Micropigmentação é para sempre?",
                  answer:
                    "Não, ela é considerada um procedimento semipermanente. Diferente de uma tatuagem, os pigmentos são aplicados em camadas mais superficiais da pele e tendem a desbotar naturalmente com o tempo. Geralmente, o resultado dura de 1 a 2 anos, sendo necessário um retoque para manter a cor e o design desejados.",
                },
                {
                  question:
                    "Qualquer pessoa pode fazer limpeza de pele?",
                  answer:
                    "Praticamente qualquer pessoa pode se beneficiar, mas a técnica e os produtos utilizados variam conforme cada biotipo. Pessoas com acne severa, infecções ativas ou peles extremamente sensíveis precisam de uma avaliação prévia para garantir que o procedimento seja seguro e não cause irritações.",
                },
                {
                  question:
                    "Vocês realizam preenchimento labial?",
                  answer:
                    "Sim. Utilizamos preenchedores à base de ácido hialurônico, uma substância segura e absorvível pelo corpo. O foco do nosso protocolo é a harmonia facial, buscando realçar o contorno e o volume dos lábios de forma natural e sofisticada.",
                },
                {
                  question:
                    "Quanto tempo depois da minha cirurgia posso fazer a camuflagem?",
                  answer:
                    "A camuflagem de cicatrizes requer cautela. Geralmente, é necessário aguardar entre 6 a 12 meses após a cirurgia. A cicatriz precisa estar completamente madura (esbranquiçada) e estável. A liberação do seu médico cirurgião é fundamental antes de iniciarmos o procedimento.",
                },
                {
                  question:
                    "Para que serve o Microagulhamento?",
                  answer:
                    "O Microagulhamento é focado na indução percutânea de colágeno. Através de microagulhas, estimulamos a renovação da pele, sendo excelente para o tratamento de cicatrizes de acne, redução de poros abertos, suavização de linhas finas e melhora na textura e viço geral do rosto.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  style={{ borderBottom: "1px solid #e8e8e8" }}
                >
                  <button
                    className="w-full flex items-center justify-between py-6 text-left group"
                    onClick={() =>
                      setOpenFaq(
                        openFaq === index ? null : index,
                      )
                    }
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontWeight: 400,
                        fontSize: "1rem",
                        color:
                          openFaq === index
                            ? "var(--color-sage-dark)"
                            : "var(--color-black)",
                        lineHeight: "1.5",
                        transition: "color 0.3s ease",
                        paddingRight: "2rem",
                      }}
                    >
                      <span
                        style={{
                          color: "var(--color-gold)",
                          fontFamily: "var(--font-serif)",
                          marginRight: "0.75rem",
                          fontWeight: 300,
                        }}
                      >
                        {String(index + 1).padStart(2, "0")}.
                      </span>
                      {faq.question}
                    </span>
                    <span
                      className="flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-300"
                      style={{
                        width: "2rem",
                        height: "2rem",
                        border: `1px solid ${openFaq === index ? "var(--color-sage)" : "#d0d0d0"}`,
                        background:
                          openFaq === index
                            ? "var(--color-sage)"
                            : "transparent",
                        color:
                          openFaq === index ? "white" : "#888",
                        transform:
                          openFaq === index
                            ? "rotate(45deg)"
                            : "rotate(0deg)",
                        transition: "all 0.3s ease",
                        fontSize: "1.25rem",
                        lineHeight: 1,
                      }}
                    >
                      +
                    </span>
                  </button>
                  <div
                    style={{
                      maxHeight:
                        openFaq === index ? "300px" : "0",
                      overflow: "hidden",
                      transition: "max-height 0.4s ease",
                    }}
                  >
                    <p
                      className="pb-6"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontWeight: 300,
                        fontSize: "0.9375rem",
                        color: "#666",
                        lineHeight: "1.8",
                        paddingLeft: "2.5rem",
                      }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-10 px-5 lg:px-6"
        style={{ background: "#f5f2ec" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src="/images/logo-savid-alt.png"
                alt="Savid Maricá Logo"
                className="h-32 md:h-40 w-auto object-contain"
              />
            </div>

            {/* Social Icons */}
            <div className="flex gap-6">
              <a
                href="#"
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 overflow-hidden"
                style={{
                  border: "1px solid var(--color-sage)",
                  background: "transparent",
                }}
                aria-label="Instagram"
              >
                <img
                  src="/images/icon-instagram.jpg"
                  alt="Instagram"
                  className="w-[90%] h-[90%] object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <a
                href="https://wa.me/5521972668520"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 overflow-hidden"
                style={{
                  border: "1px solid var(--color-sage)",
                  background: "transparent",
                }}
                aria-label="WhatsApp"
              >
                <img
                  src="/images/icon-whatsapp.jpg"
                  alt="WhatsApp"
                  className="w-[125%] h-[125%] object-contain"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    // Fallback se a imagem não existir ainda
                    (e.target as HTMLImageElement).style.opacity = '0';
                  }}
                />
              </a>
            </div>

            {/* Copyright */}
            <div className="flex flex-col items-center md:items-end gap-2">
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 300,
                  fontSize: "0.875rem",
                  color: "#666",
                }}
              >
                © 2026 Savid Maricá. Todos os direitos
                reservados.
              </p>
              <a
                href="#"
                className="transition-colors duration-300 hover:underline"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 300,
                  fontSize: "0.8rem",
                  color: "#888",
                }}
                onMouseEnter={(e) => {
                  (
                    e.currentTarget as HTMLAnchorElement
                  ).style.color = "var(--color-gold)";
                }}
                onMouseLeave={(e) => {
                  (
                    e.currentTarget as HTMLAnchorElement
                  ).style.color = "#888";
                }}
              >
                Criado por Lucas Sodree
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/5521972668520"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-5 z-50 flex items-center gap-2.5 rounded-full shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        style={{
          background: "#25D366",
          padding: "12px 20px 12px 14px",
        }}
        aria-label="Fale conosco pelo WhatsApp"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "0.85rem",
            color: "white",
            letterSpacing: "0.01em",
            whiteSpace: "nowrap",
          }}
        >
          Fale conosco
        </span>
      </a>

      {/* CSS Animations */}
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-100%); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.08; }
          50% { opacity: 0.15; }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0) translateX(0); }
          33% { transform: translateY(-25px) translateX(15px); }
          66% { transform: translateY(10px) translateX(-10px); }
        }
        @keyframes floatMedium {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          50% { transform: translateY(-20px) translateX(20px) rotate(5deg); }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(6px); opacity: 0.5; }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}