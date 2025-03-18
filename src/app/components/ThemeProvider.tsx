"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React, { createContext, useEffect, useState, useContext, ReactNode } from "react";

//Style
import NavStyle from "../styles/NavStyles.module.scss"

const ThemeContext = createContext({
  darkMode: false,
  toggleTheme: () => {},
});

function setTheme(themeName: string) {
  localStorage.setItem("theme", themeName);
  document.documentElement.className = themeName;
}

function keepTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme("light-mode");
  }
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    keepTheme();
    setDarkMode(localStorage.getItem("theme") === "dark-mode");
  }, []);

  const toggleTheme = () => {
    const newTheme = darkMode ? "light-mode" : "dark-mode";
    setDarkMode(!darkMode);
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <div>
        <nav className={NavStyle.navbar}>
          <div className={NavStyle.logo}>BlockDash</div>
          <div className={NavStyle.navActions}>
            <button 
            onClick={toggleTheme}
            className={NavStyle.toggleBtn}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <WalletMultiButton />
          </div>
        </nav>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}