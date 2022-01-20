import Image from "next/image";
import React, { CSSProperties } from "react";
import UIBodyContainer from "../components/display-components/UIBodyContainer";
import UIHeader from "../components/header/UIHeader";
import pepe404 from "../public/images/errorPage.jpeg";

export default function Custom404() {
  return (
    <>
      <UIHeader />
      <UIBodyContainer>
        <div
          style={{
            display: "flex",
            justifySelf: "center",
            flexDirection: "row",
            padding: "10px 0px",
          }}
        >
          <div style={{ width: "500px" }}>
            <Image src={pepe404} alt="Pepe 404" />
          </div>
          <div style={{ textAlign: "center" }}>
            <h3>404 Not Found</h3>
          </div>
        </div>
      </UIBodyContainer>
    </>
  );
}

const container_css: CSSProperties = {
  display: "grid",
};
