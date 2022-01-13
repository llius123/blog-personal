import React, { CSSProperties } from "react";

export default function UIBodyContainer({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <div style={body_css}>{children}</div>;
}
const body_css: CSSProperties = {
  width: "100%",
  maxWidth: "1400px",
  border: "1px solid red",
  height: "100px",
  display: "grid",
};
