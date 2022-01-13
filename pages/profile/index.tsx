import React, { CSSProperties } from "react";
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
    <div style={container_css}>
      <UIHeader />
      <div dangerouslySetInnerHTML={{ __html: allPostsData.contentHtml }} />
    </div>
  );
}

const container_css: CSSProperties = {
  display: "grid",
};
