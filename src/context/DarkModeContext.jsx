import { createContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

export const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
  const isSystemDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const [isDark, setIsDark] = useLocalStorageState(isSystemDark, "dark-mode");

  useEffect(
    function () {
      if (isDark) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [isDark]
  );

  function toggleDarkMode() {
    setIsDark((isDark) => !isDark);
  }
  return (
    <DarkModeContext.Provider
      value={{
        isDark,
        toggleDarkMode,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeProvider;
