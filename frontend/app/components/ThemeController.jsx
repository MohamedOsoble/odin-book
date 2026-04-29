import { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContexts";

export default function ThemeController(Theme) {
  const { changeTheme, theme } = useTheme();
  const handleClick = (event) => {
    changeTheme(event.target.value);
    localStorage.setItem("theme", event.target.value);
    const parent = document.getElementById("theme-dropdown");
    parent.removeAttribute("open");
  };

  return (
    <ul className="menu menu-horizontal px-1">
      <li>
        <details id="theme-dropdown">
          <summary>Change theme</summary>
          <ul className="p-2 bg-base-100 w-40 z-1">
            <li>
              <button onClick={handleClick} value="light">
                Light
              </button>
            </li>
            <li>
              <button onClick={handleClick} value="dark">
                Dark
              </button>
            </li>
            <li>
              <button onClick={handleClick} value="night">
                Night
              </button>
            </li>
            <li>
              <button onClick={handleClick} value="black">
                Black
              </button>
            </li>
          </ul>
        </details>
      </li>
    </ul>
  );
}
