import { CSSProperties } from "react";

export default function UIContainer({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <div style={container_css}>{children}</div>;
}

const container_css: CSSProperties = {
  display: "grid",
  justifyItems: "center",
};
