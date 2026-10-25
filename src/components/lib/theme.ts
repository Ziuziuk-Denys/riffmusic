export type Theme = "light" | "dark";

export const themeStorageKey = "riff-theme";

// Runs before paint so a saved theme never flashes
export const themeInitScript = `try{var t=localStorage.getItem("${themeStorageKey}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export function currentTheme(): Theme {
  const saved = document.documentElement.dataset.theme;
  if (saved === "light" || saved === "dark") {
    return saved;
  }
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(themeStorageKey, theme);
  } catch {
    // Private mode keeps the choice for this visit only
  }
}
