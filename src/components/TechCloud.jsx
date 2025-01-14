import { useEffect, useMemo, useState, memo } from "react";
import {
  Cloud,
  fetchSimpleIcons,
  renderSimpleIcon,
} from "react-icon-cloud";

const cloudProps = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
    freezeActive: true, 
    freezeDecel: false, 
    noSelect: true, 
    noMouse: false,
  },
};

const renderCustomIcon = (icon) => {
  const bgHex = "#000000"; 
  const fallbackHex = "#ffffff"; 
  
  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio: 2,
    size: 42,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e) => e.preventDefault(),
    },
  });
};

// Memoize the entire component
const TechCloudBase = () => {
  const [data, setData] = useState(null);
  
  const iconSlugs = useMemo(() => [
    "python",
    "cplusplus", 
    "javascript",
    "r",
    "mysql", 
    "html5", 
    "css3", 
    "react",
    "bootstrap",
    "tailwindcss",
    "nodedotjs", 
    "mongodb",
    "sqlite",
    "vercel",
    "git",
    "github",
    "notion",
    "visualstudiocode", 
    "googlecolab",
    "powerbi",
    "figma",
    "canva"
  ], []);

  useEffect(() => {
    fetchSimpleIcons({ slugs: iconSlugs }).then(setData);
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data) return null;
    return Object.values(data.simpleIcons).map((icon) =>
      renderCustomIcon(icon)
    );
  }, [data]);

  if (!renderedIcons) return null;

  return (
    <div className="relative z-10 py-20">
      <h2 className="text-4xl font-serif font-bold text-center mb-5 bg-primary bg-clip-text text-transparent">
        Tech Stack
      </h2>
      {/* @ts-ignore */}
      <Cloud {...cloudProps}>
        {renderedIcons}
      </Cloud>
    </div>
  );
};

// Export memoized version
export const TechCloud = memo(TechCloudBase);
