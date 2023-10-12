import { useContext } from "react";
import { DarkModeContext } from "./DarkModeContext";

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context) return;

  const { isDark, toggleDarkMode } = context;
  return { isDark, toggleDarkMode };
}
