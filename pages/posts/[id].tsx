import { GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { CSSProperties } from "react";
import { PostInterface } from ".";
import Header from "../../components/header/header";
import { UILoading } from "../../components/loading/UILoading";
import { UIPost } from "../../components/post/UIPost";
import { getAllPostIds, getPostMetadata } from "../../lib/posts";

export default function Post(props: { postData: PostInterface }): JSX.Element {
  const router = useRouter();

  return (
    <div style={container_css}>
      <Header />
      {router.isFallback ? <UILoading /> : <UIPost />}
    </div>
  );
}
const container_css: CSSProperties = {
  display: "grid",
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: true, //indicates the type of fallback
  };
};

export async function getStaticProps({ params }) {
  const postData = await getPostMetadata(params.id);

  // const postData = { id: "123" };
  return {
    props: {
      postData,
    },
  };
}
