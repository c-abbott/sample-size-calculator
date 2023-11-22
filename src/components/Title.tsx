import React from "react";

interface TitleProps {
  text: string;
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  style?: React.CSSProperties;
  subtitle?: string;
}

const Title: React.FC<TitleProps> = ({
  text,
  level = "h1",
  style = {},
  subtitle,
}) => {
  const HeadingTag = level as keyof JSX.IntrinsicElements;

  return (
    <div style={{ textAlign: "center", ...style }}>
      <HeadingTag className="text-3xl font-bold underline">{text}</HeadingTag>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
};

export default Title;
