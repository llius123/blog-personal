import React, { CSSProperties } from "react";
import Header from "../../components/header/header";
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
      <Header />
      <div dangerouslySetInnerHTML={{ __html: allPostsData.contentHtml }} />
    </div>
  );
}

const container_css: CSSProperties = {
  display: "grid",
};
