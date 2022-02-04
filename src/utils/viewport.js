import { useState, useEffect } from "react";

function getViewportSize() {
  const width = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  if (width <= 576) return "xs";
  if (width <= 768) return "sm";
  if (width <= 992) return "md";
  if (width <= 1200) return "lg";
  if (width <= 1400) return "xl";
  return "xxl";
}

function getGridSize() {
  const size = getViewportSize();
  switch (size) {
    case "xs":
      return 4;
    case "sm":
      return 6;
    case "md":
      return 8;
    case "lg":
      return 4;
    case "xl":
      return 6;
    default:
      return 8;
  }
}

export default function useViewport() {
  const [gridSize, setgridSize] = useState(getGridSize());

  useEffect(() => {
    function handleResize() {
      setgridSize(getGridSize);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { gridSize };
}
