import { ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type AnimatedRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
};

export function AnimatedReveal({
  children,
  className,
  delay = 0,
  yOffset = 24,
}: AnimatedRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("transition-all duration-700 ease-out", className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : `translateY(${yOffset}px)`,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
