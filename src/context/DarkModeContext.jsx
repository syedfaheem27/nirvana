import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
  const [isDark, setIsDark] = useLocalStorageState(false, "dark-mode");

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

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context) return;

  const { isDark, toggleDarkMode } = context;
  return { isDark, toggleDarkMode };
}
