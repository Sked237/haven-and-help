import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeMode = "normal" | "dark" | "deuteranopia";

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem("theme-mode");
    return (saved as ThemeMode) || "normal";
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove("dark", "deuteranopia");
    
    // Add current theme class
    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "deuteranopia") {
      root.classList.add("deuteranopia");
    }
    
    // Save to localStorage
    localStorage.setItem("theme-mode", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
