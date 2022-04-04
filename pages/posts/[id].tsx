import { GetStaticPaths } from "next";
import { useRouter } from "next/router";
import UIHeader from "../../components/header/UIHeader";
import { UIPostWrapper } from "../../components/post/UIPostWrapper";
import { GetPostMetadata } from "../../lib/post/GetPostMetadata";
import { PostInterface } from "../../lib/post/PostInterface";
import { PostRepo } from "../../lib/post/PostRepo";

export default function Post(props: { postData: PostInterface }): JSX.Element {
  const router = useRouter();
  console.log(router);

  return (
    <>
      <UIHeader />
      <UIPostWrapper router={router} postData={props.postData} />
    </>
  );
}
export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: true, //indicates the type of fallback
  };
};

export async function getStaticProps({ params }) { 
  return await new GetPostMetadata('posts', params.id).run()
}