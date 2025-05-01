import { useContext } from "react";
import { ThemeContext } from "./ContextLearn";

const Box2 = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeContext must be used within a ThemeProvider");
  }

  const { theme, toggleTheme } = themeContext;

  alert(theme);
  return (
    <div className="boxContainer">
      <h1>Box 2</h1>
      <button onClick={toggleTheme}>Change Theme</button>
    </div>
  );
};

export default Box2;
