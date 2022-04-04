import { GetStaticPaths } from "next";
import { NextRouter, useRouter } from "next/router";
import UIBodyContainer from "../../components/display-components/UIBodyContainer";
import UIHeader from "../../components/header/UIHeader";
import { UILoading } from "../../components/loading/UILoading";
import { UIPost } from "../../components/post/UIPost";
import { PostInterface } from "../../lib/post/PostInterface";
import { PostRepo } from "../../lib/post/PostRepo";

export default function Post(props: { postData: PostInterface }): JSX.Element {
  const router = useRouter();

  return (
    <>
      <UIHeader />
      <PostData router={router} postData={props.postData} />
    </>
  );
}

function PostData({
  router,
  postData,
}: {
  router: NextRouter;
  postData: PostInterface;
}): JSX.Element {
  return (
    <UIBodyContainer>
      {router.isFallback ? <UILoading /> : <UIPost postData={postData} />}
    </UIBodyContainer>
  );
}
export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: true, //indicates the type of fallback
  };
};

export async function getStaticProps({ params }) {
  const post = new PostRepo('biblioteca')
  const postData = await post.getPostMetadata(params.id);

  // const postData = { id: "123" };
  return {
    props: {
      postData,
    },
  };
}
