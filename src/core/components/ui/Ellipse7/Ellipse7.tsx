import { useEffect } from "react";

interface Props {
  size?: string; // e.g., "40px", "4vw", etc.
  width?: string;
  height?: string;
  left?: string;
  top?: string;
  showAsLoading?: boolean;
}

export const Ellipse = ({
  size,
  width = "8vw",
  height = "8vw",
  left = "6.3%",
  top = "57.91%",
  showAsLoading = false,
}: Props) => {
  useEffect(() => {
    const styleId = "ellipse-animation-style";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = `
        @keyframes floatPulse {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10%) scale(1.1);
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const finalWidth = size ?? width;
  const finalHeight = size ?? height;

  return (
    <div
      className="rounded-full bg-gradient-to-r from-[#DEDEDE] to-[#BDDDFF] blur-[3.5px] rotate-180 pointer-events-none "
      style={{
        width: finalWidth,
        height: finalHeight,
        left,
        top,
        animation: showAsLoading ? "floatPulse 2s ease-in-out infinite" : undefined,
      }}
    />
  );
};
