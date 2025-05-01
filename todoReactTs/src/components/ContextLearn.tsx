import { createContext, ReactNode, useState } from "react";
import Box2 from "./Box2";

type ThemeType = "light" | "dark";

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

// Type 1
// const ThemeContext = createContext<ThemeContextType>({
//   theme: "light",
//   toggleTheme: () => {},
// });

// Type 2
// const ThemeContext = createContext<ThemeContextType | null>({
//   theme: "light",
//   toggleTheme: () => {},
// });

// Type 3
export const ThemeContext = createContext<ThemeContextType | null>(null);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const ContextLearn = () => {
  return (
    <ThemeProvider>
      <div>Hello</div>
      <Box2 />
    </ThemeProvider>
  );
};

export default ContextLearn;
