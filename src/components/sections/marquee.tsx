import { TECH_STACK } from "@/data/mock";
import { Dot } from "lucide-react";

export function TechMarquee() {
  const loopItems = [...TECH_STACK, ...TECH_STACK];

  return (
    <section
      className="border-y border-[var(--surface-border)] bg-[var(--bg-elevated)] py-8 overflow-hidden"
      aria-label="Technology stack"
    >
      <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-12 hover:[animation-play-state:paused]">
        {loopItems.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="flex font-mono text-sm tracking-wide text-[var(--ink-faint)] whitespace-nowrap"
          >
            <Dot className="text-green-700" />
            {tech}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
