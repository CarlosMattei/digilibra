"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView, type Variants } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Hand,
  GraduationCap,
  Heart,
  Users,
  BookOpen,
  Accessibility,
  ArrowLeft,
  Sparkles,
  Globe,
  Copy,
  Check,
  Play,
  Zap,
  Shield,
} from "lucide-react";

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleFade: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const features = [
  {
    icon: Hand,
    title: "Aprendizado Interativo",
    description:
      "Aprenda LIBRAS de forma prática e envolvente através de desafios e cenários do jogo.",
    tag: "Experiência",
  },
  {
    icon: Accessibility,
    title: "Inclusão Digital",
    description:
      "Promovemos o acesso à comunicação acessível para todos, quebrando barreiras linguísticas.",
    tag: "Acessibilidade",
  },
  {
    icon: GraduationCap,
    title: "Gamificação Educacional",
    description:
      "Transformar o aprendizado em uma experiência divertida com recompensas e progressão.",
    tag: "Educação",
  },
  {
    icon: Heart,
    title: "Conscientização Social",
    description:
      "Aumentar a conscientização sobre a cultura surta e a importância da acessibilidade.",
    tag: "Impacto",
  },
];

const stats = [
  { value: "100%", label: "Gratuito" },
  { value: "Web", label: "Plataforma" },
  { value: "PT-BR", label: "Idioma" },
  { value: "∞", label: "Possibilidades" },
];

const technologies = [
  { name: "Next.js", icon: Zap },
  { name: "React", icon: Play },
  { name: "TypeScript", icon: Shield },
  { name: "Tailwind CSS", icon: Sparkles },
  { name: "shadcn/ui", icon: Globe },
  { name: "Motion", icon: Heart },
];

function HeroText() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="relative flex min-h-[85vh] flex-col items-center justify-center px-6 text-center"
    >
      {/* Glow orb behind text */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2563EB]/20 blur-[120px]" />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        <motion.div
          variants={fadeUp}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-5 py-2.5 text-sm font-medium text-blue-300 backdrop-blur-md"
        >
          <Sparkles className="h-4 w-4" />
          Projeto Open Source
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="mb-6 text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl"
        >
          Conheça o
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
            DIGILIBRA
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto max-w-xl text-lg text-white/50 sm:text-xl md:text-2xl"
        >
          Uma experiência imersiva para aprender{" "}
          <strong className="text-white/80">LIBRAS</strong> de forma interativa
          e acessível.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 flex justify-center gap-4">
          <Button
            asChild
            className="h-14 rounded-full bg-[#2563EB] px-8 text-lg font-bold text-white hover:bg-[#1d4ed8]"
          >
            <Link href="/game">Iniciar Jogo</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-14 rounded-full border-white/15 px-8 text-lg font-bold text-white hover:bg-white/5"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Voltar
            </Link>
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-medium uppercase tracking-widest text-white/30">
            Scroll
          </span>
          <div className="h-10 w-[1px] bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function StatsSection() {
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="relative px-6 py-20 sm:px-8 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={scaleFade}
              custom={i}
              className="group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.03] p-8 text-center backdrop-blur-sm transition-all duration-500 hover:border-blue-500/20 hover:bg-blue-500/[0.06]"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-500/0 to-blue-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <p className="relative text-4xl font-bold text-white sm:text-5xl">
                {stat.value}
              </p>
              <p className="relative mt-2 text-sm font-medium text-white/40">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function MissionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative px-6 py-24 sm:px-8 md:px-12 lg:px-20">
      {/* Section divider glow */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-20">
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
              <Globe className="h-4 w-4" />
              Nossa Missão
            </div>
            <h2 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl">
              Linguagem é a ponte entre{" "}
              <span className="text-blue-400">culturas</span> e{" "}
              <span className="text-blue-400">corações</span>.
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-white/50">
              O DIGILIBRA nasceu com o objetivo de tornar o aprendizado da{" "}
              <strong className="text-white/80">
                Língua Brasileira de Sinais
              </strong>{" "}
              acessível, divertido e imersivo para todas as pessoas.
            </p>
            <p className="text-lg leading-relaxed text-white/50">
              Acreditamos que a tecnologia pode ser uma ponte entre comunidades,
              promovendo inclusão e quebrando barreiras de comunicação no dia a
              dia.
            </p>
          </motion.div>

          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-[#2563EB]/20 to-[#0e43b8]/10 p-10 backdrop-blur-sm">
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue-500/20 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-cyan-500/10 blur-2xl" />

              <div className="relative space-y-6">
                {[
                  {
                    label: "Lei 10.436/02",
                    desc: "Reconhecida oficialmente",
                    icon: Shield,
                  },
                  {
                    label: "Mais de 10M",
                    desc: "Surdos no Brasil",
                    icon: Users,
                  },
                  {
                    label: "1ª Língua",
                    desc: "Para muitos surdos brasileiros",
                    icon: BookOpen,
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      delay: 0.4 + i * 0.15,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-sm"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-white">{item.label}</p>
                      <p className="text-sm text-white/40">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="relative px-6 py-24 sm:px-8 md:px-12 lg:px-20">
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 text-center"
        >
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400"
          >
            <Zap className="h-4 w-4" />
            Funcionalidades
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-4xl font-bold text-white sm:text-5xl md:text-6xl"
          >
            Por que aprender{" "}
            <span className="text-blue-400">LIBRAS</span>?
          </motion.h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-500 hover:border-blue-500/20 hover:bg-blue-500/[0.04]"
              >
                {/* Parallax zoom effect on hover */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/5 opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-110" />

                <div className="relative">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 transition-all duration-500 group-hover:bg-blue-500/20 group-hover:scale-110">
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="rounded-full border border-white/[0.06] bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/40">
                      {feature.tag}
                    </span>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white">
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed text-white/45">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AboutLibrasSection() {
  return (
    <section className="relative px-6 py-24 sm:px-8 md:px-12 lg:px-20">
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      {/* Full-bleed color block — Umano style */}
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative overflow-hidden rounded-[2rem] border border-blue-500/20 bg-[#2563EB] p-10 sm:p-16"
        >
          {/* Decorative elements */}
          <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-blue-300/10 blur-2xl" />

          <div className="relative grid items-center gap-12 md:grid-cols-2">
            <motion.div variants={fadeUp}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white/90">
                <BookOpen className="h-4 w-4" />
                Sobre as LIBRAS
              </div>
              <h2 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl">
                Língua Brasileira de Sinais
              </h2>
              <p className="mb-4 text-lg leading-relaxed text-white/70">
                As LIBRAS são a língua oficial da comunidade surta no Brasil,
                reconhecida pela{" "}
                <strong className="text-white">
                  Lei nº 10.436 de 2002
                </strong>
                . São uma língua completa, com gramática e estrutura própria.
              </p>
              <p className="text-lg leading-relaxed text-white/70">
                Aprender LIBRAS não é apenas adquirir uma nova habilidade — é
                abrir caminhos para a inclusão, o respeito e a igualdade de
                oportunidades.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              {[
                {
                  number: "10.436",
                  title: "Lei Federal",
                  desc: "Reconhecimento oficial das LIBRAS no Brasil",
                },
                {
                  number: "10M+",
                  title: "Comunidade Surta",
                  desc: "Pessoas que usam LIBRAS no Brasil",
                },
                {
                  number: "2002",
                  title: "Marco Histórico",
                  desc: "Ano do reconhecimento oficial",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.3 + i * 0.15,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-center gap-5 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm transition-all duration-300 hover:bg-white/15"
                >
                  <span className="text-3xl font-bold text-white sm:text-4xl">
                    {item.number}
                  </span>
                  <div>
                    <p className="font-bold text-white">{item.title}</p>
                    <p className="text-sm text-white/60">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TechSection() {
  return (
    <section className="relative px-6 py-24 sm:px-8 md:px-12 lg:px-20">
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 text-center"
        >
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400"
          >
            <Zap className="h-4 w-4" />
            Stack Tecnológica
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-4xl font-bold text-white sm:text-5xl"
          >
            Tecnologias Utilizadas
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-6"
        >
          {technologies.map((tech, i) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                variants={scaleFade}
                custom={i}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 text-center transition-all duration-500 hover:border-blue-500/20 hover:bg-blue-500/[0.06]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 transition-all duration-500 group-hover:bg-blue-500/20 group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-semibold text-white/70 group-hover:text-white">
                  {tech.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative px-6 py-24 sm:px-8 md:px-12 lg:px-20">
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="mx-auto max-w-4xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative overflow-hidden rounded-[2rem] border border-white/[0.06] bg-white/[0.03] p-10 text-center backdrop-blur-sm sm:p-16"
        >
          <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-blue-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-cyan-500/10 blur-2xl" />

          <motion.div variants={fadeUp} className="relative">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-400">
              <Users className="h-8 w-8" />
            </div>
            <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
              Pronto para{" "}
              <span className="text-blue-400">começar</span>?
            </h2>
            <p className="mx-auto mb-10 max-w-lg text-lg text-white/45">
              Comece agora sua jornada de aprendizado em LIBRAS com o DIGILIBRA.
              Totalmente gratuito e acessível.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                className="h-14 rounded-full bg-[#2563EB] px-8 text-lg font-bold text-white hover:bg-[#1d4ed8]"
              >
                <Link href="/game">Iniciar Jogo</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-14 rounded-full border-white/15 px-8 text-lg font-bold text-white hover:bg-white/5"
              >
                <Link href="/">Voltar ao Início</Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("contato@digilibra.com.br");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative px-6 pb-12 pt-16 sm:px-8 md:px-12 lg:px-20"
    >
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div>
            <p className="text-xl font-bold text-white">DIGILIBRA</p>
            <p className="mt-1 text-sm text-white/30">
              Promovendo inclusão através da tecnologia.
            </p>
          </div>

          <button
            onClick={handleCopyEmail}
            className="group flex items-center gap-3 rounded-full border border-white/[0.06] bg-white/[0.03] px-5 py-3 text-sm text-white/50 transition-all duration-300 hover:border-blue-500/20 hover:text-white"
          >
            <span>contato@digilibra.com.br</span>
            {copied ? (
              <Check className="h-4 w-4 text-green-400" />
            ) : (
              <Copy className="h-4 w-4 transition-colors group-hover:text-blue-400" />
            )}
          </button>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-xs text-white/25">
            © 2026 DIGILIBRA. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            {["GitHub", "LinkedIn", "Instagram"].map((item) => (
              <span
                key={item}
                className="cursor-pointer text-xs text-white/25 transition-colors hover:text-white/60"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

export default function About() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#080B14]">
      <HeroText />
      <StatsSection />
      <MissionSection />
      <FeaturesSection />
      <AboutLibrasSection />
      <TechSection />
      <CTASection />
      <Footer />
    </main>
  );
}
