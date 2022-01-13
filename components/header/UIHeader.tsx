import Link from "next/link";
import React, { CSSProperties } from "react";
import { Views } from "../../utils/views";
import UISpacer20px from "../display-components/UISpacer20px";

const views = Views;
export default function UIHeader(): JSX.Element {
  return (
    <>
      <div style={header_container_css}>
        <div style={header_first_row_container}>
          <h1>Jesus Maria Berisa Nuñez</h1>
          <h2>Full stack developer</h2>
        </div>
        <div style={{ display: "grid", gridAutoFlow: "column" }}>
          {views.map((view) => {
            return (
              <div key={view.id}>
                <Link href={view.href}>{view.title}</Link>
              </div>
            );
          })}
        </div>
      </div>
      <UISpacer20px />
    </>
  );
}

const header_first_row_container: CSSProperties = {
  textAlign: "center",
};

const header_container_css: CSSProperties = {
  width: "100%",
  maxWidth: "1400px",
  border: "1px solid black",
  display: "grid",
  justifyContent: "center",
};