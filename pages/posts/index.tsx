import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import Link from "next/link";
import { CSSProperties } from "react";
import Header from "../../components/header/header";
import {
  getAllPostIds,
  getPostMetadata,
  PostsIdInterface,
} from "../../lib/posts";

export default function Posts(props: {
  postData: PostInterface[];
}): JSX.Element {
  return (
    <div style={container_css}>
      <Header />
      {props.postData.map((post) => (
        <Link key={post.id} href={"/posts/" + post.id}>
          {post.id}
        </Link>
      ))}
    </div>
  );
}
const container_css: CSSProperties = {
  display: "grid",
};

export interface PostInterface {
  contentHtml: string;
  date: string;
  id: string;
  title: string;
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<{ postData: PostInterface[] }>
> {
  const allPostsData: PostsIdInterface[] = await getAllPostIds();

  const postsData: PostInterface[] = [];
  for (const post of allPostsData) {
    postsData.push(await getPostMetadata(post.params.id));
  }
  return { props: { postData: postsData } };
}
