"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function RouteProgress() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const showTimer = window.setTimeout(() => {
      setLoading(true);
    }, 0);
    const hideTimer = window.setTimeout(() => {
      setLoading(false);
    }, 450);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed top-0 left-0 z-[100] h-[2px] bg-[var(--color-brand-bright)]"
          initial={{ width: "0%", opacity: 1 }}
          animate={{ width: "85%" }}
          exit={{ width: "100%", opacity: 0, transition: { duration: 0.2 } }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
    </AnimatePresence>
  );
}
