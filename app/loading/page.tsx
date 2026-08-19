import Image from "next/image";

const GESTURES = [
  { id: "L", src: "/gestures/L.svg", alt: "Gesto Libras L" },
  { id: "I", src: "/gestures/I.svg", alt: "Gesto Libras I" },
  { id: "B", src: "/gestures/b.svg", alt: "Gesto Libras B" },
  { id: "R", src: "/gestures/R.svg", alt: "Gesto Libras R" },
  { id: "A", src: "/gestures/A.svg", alt: "Gesto Libras A" },
];

export default function LoadingPage() {
  return (
    <main className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-[#1E5FF0] px-4 select-none">
      {/* Subtle background ambient glow */}
      <div className="pointer-events-none absolute h-80 w-80 rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Gestures sequence container */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
          {GESTURES.map((gesture, index) => (
            <div
              key={gesture.id}
              className="animate-gesture-sync flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 transition-all"
              style={{
                animationDelay: `${index * 0.28}s`,
              }}
            >
              <Image
                src={gesture.src}
                alt={gesture.alt}
                width={80}
                height={80}
                priority
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>

        {/* Loading text */}
        <p className="animate-pulse-slow text-base sm:text-lg md:text-xl font-medium tracking-wide text-white/90 text-center">
          Carregando, aguarde...
        </p>
      </div>
    </main>
  );
}
