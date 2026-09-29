import React, { createContext, useContext, useEffect, useState } from "react";

export const PALETTES = [
  {
    id: "blue",
    name: "Ocean Sapphire",
    tagline: "Classic & Professional",
    color: "#2563eb",
    gradient: "from-blue-600 to-indigo-600",
    ringColor: "ring-blue-500/30",
    bgClass: "bg-blue-600"
  },
  {
    id: "emerald",
    name: "Emerald Jade",
    tagline: "Fresh & Academic",
    color: "#059669",
    gradient: "from-emerald-600 to-teal-600",
    ringColor: "ring-emerald-500/30",
    bgClass: "bg-emerald-600"
  },
  {
    id: "violet",
    name: "Royal Amethyst",
    tagline: "Modern & Creative",
    color: "#7c3aed",
    gradient: "from-violet-600 to-purple-600",
    ringColor: "ring-violet-500/30",
    bgClass: "bg-violet-600"
  },
  {
    id: "rose",
    name: "Crimson Ruby",
    tagline: "Bold & Vibrant",
    color: "#e11d48",
    gradient: "from-rose-600 to-pink-600",
    ringColor: "ring-rose-500/30",
    bgClass: "bg-rose-600"
  },
  {
    id: "amber",
    name: "Sunset Amber",
    tagline: "Warm & Dynamic",
    color: "#d97706",
    gradient: "from-amber-500 to-orange-600",
    ringColor: "ring-amber-500/30",
    bgClass: "bg-amber-600"
  },
  {
    id: "cyan",
    name: "Nordic Cyan",
    tagline: "Clean & High-Tech",
    color: "#0891b2",
    gradient: "from-cyan-600 to-blue-600",
    ringColor: "ring-cyan-500/30",
    bgClass: "bg-cyan-600"
  },
  {
    id: "indigo",
    name: "Midnight Indigo",
    tagline: "Deep & Focused",
    color: "#4f46e5",
    gradient: "from-indigo-600 to-slate-800",
    ringColor: "ring-indigo-500/30",
    bgClass: "bg-indigo-600"
  }
];

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    try {
      const savedTheme = localStorage.getItem("sms_theme");
      if (savedTheme === "dark" || savedTheme === "light") {
        return savedTheme;
      }
    } catch {
      // Ignore
    }

    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }

    return "light";
  });

  const [palette, setPaletteState] = useState(() => {
    try {
      const savedPalette = localStorage.getItem("sms_palette");
      if (savedPalette && PALETTES.some((p) => p.id === savedPalette)) {
        return savedPalette;
      }
    } catch {
      // Ignore
    }
    return "blue";
  });

  // Apply dark mode class and color-scheme
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }

    try {
      localStorage.setItem("sms_theme", theme);
    } catch {
      // Ignore
    }
  }, [theme]);

  // Apply palette data-attribute
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-palette", palette);

    try {
      localStorage.setItem("sms_palette", palette);
    } catch {
      // Ignore
    }
  }, [palette]);

  // Listen to system preference changes if user hasn't explicitly set a theme
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      const savedTheme = localStorage.getItem("sms_theme");
      if (!savedTheme) {
        setThemeState(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const setTheme = (newTheme) => {
    if (newTheme === "dark" || newTheme === "light") {
      setThemeState(newTheme);
    }
  };

  const setPalette = (newPalette) => {
    if (PALETTES.some((p) => p.id === newPalette)) {
      setPaletteState(newPalette);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark: theme === "dark",
        toggleTheme,
        setTheme,
        palette,
        setPalette,
        currentPalette: PALETTES.find((p) => p.id === palette) || PALETTES[0],
        palettes: PALETTES
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeContext;
