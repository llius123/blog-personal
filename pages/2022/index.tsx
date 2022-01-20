import React, { CSSProperties } from "react";
import UIBodyContainer from "../../components/display-components/UIBodyContainer";
import UIContainer from "../../components/display-components/UIContainer";
import UIHeader from "../../components/header/UIHeader";
import { getProfileData } from "../../lib/2022";

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
    <UIContainer>
      <UIHeader />
      <UIBodyContainer>
        <div dangerouslySetInnerHTML={{ __html: allPostsData.contentHtml }} />
      </UIBodyContainer>
    </UIContainer>
  );
}

const container_css: CSSProperties = {
  display: "grid",
};
