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
    <div className="text-center" style={style}>
      <HeadingTag className={`font-bold ${level === 'h1' ? 'text-4xl' : 'text-3xl'} text-primary`}>
        {text}
      </HeadingTag>
      {subtitle && <p className="text-base text-accent mt-2">{subtitle}</p>}
    </div>
  );
};

export default Title;
