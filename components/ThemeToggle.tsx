"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import styles from "./ThemeToggle.module.css";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <button className={styles.toggleBtn} aria-label="Toggle theme"></button>;
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      className={styles.toggleBtn}
      aria-label="Toggle theme"
    >
      {resolvedTheme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
