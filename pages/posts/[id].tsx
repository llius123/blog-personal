import { CSSProperties } from "react";
import { PostInterface } from ".";
import Header from "../../components/header/header";
import { getAllPostIds, getPostMetadata } from "../../lib/posts";

export default function Post(props: { postData: PostInterface }): JSX.Element {
  return (
    <div style={container_css}>
      <Header />
      <div dangerouslySetInnerHTML={{ __html: props.postData.contentHtml }} />
    </div>
  );
}
const container_css: CSSProperties = {
  display: "grid",
};

export async function getStaticPaths() {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostMetadata(params.id);
  return {
    props: {
      postData,
    },
  };
}
