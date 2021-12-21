import Link from "next/link";
import React, { CSSProperties } from "react";

export default function Header(): JSX.Element {
  return (
    <div style={header_container_css}>
      <div style={header_first_row_container}>
        <h1>Jesus Maria Berisa Nuñez</h1>
        <h2>Full stack developer</h2>
      </div>
      <div>
        <Link href="/profile">perfil</Link>
      </div>
    </div>
  );
}

const header_first_row_container: CSSProperties = {
  textAlign: "center",
};

const header_container_css: CSSProperties = {
  width: "100%",
  border: "1px solid black",
  display: "grid",
  justifyContent: "center",
};
