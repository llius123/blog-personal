import React, { CSSProperties } from "react";
import UIBodyContainer from "../../components/display-components/UIBodyContainer";
import UIContainer from "../../components/display-components/UIContainer";
import UIHeader from "../../components/header/UIHeader";
import { getProfileData } from "../../lib/perfil";

export async function getStaticProps() {
  const allPostsData = await getProfileData();

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Profile({ allPostsData }) {
  return (
    <>
      <UIHeader />
      <UIBodyContainer>
        <div dangerouslySetInnerHTML={{ __html: allPostsData.contentHtml }} />
      </UIBodyContainer>
    </>
  );
}

const container_css: CSSProperties = {
  display: "grid",
};
