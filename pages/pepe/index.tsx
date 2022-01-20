import React, { CSSProperties } from "react";
import UIBodyContainer from "../../components/display-components/UIBodyContainer";
import UIContainer from "../../components/display-components/UIContainer";
import UIHeader from "../../components/header/UIHeader";
import { getProfileData } from "../../lib/2022";

export default function Pepe() {
  return (
    <>
      <UIHeader />
      <UIBodyContainer>Pepe list</UIBodyContainer>
    </>
  );
}

const container_css: CSSProperties = {
  display: "grid",
};
