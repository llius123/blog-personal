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
  allPostsId: PostsIdInterface[];
}): JSX.Element {
  return (
    <div style={container_css}>
      <Header />
      <div style={body_css}>
        {props.allPostsId.map((postId, index) => {
          return <div key={index}>{postId.id}</div>;
        })}
      </div>
    </div>
  );
}

const body_css: CSSProperties = {
  width: "1400px",
  border: "1px solid red",
  height: "100px",
};
const container_css: CSSProperties = {
  display: "grid",
  justifyItems: "center",
};

export interface PostInterface {
  contentHtml: string;
  date: string;
  id: string;
  title: string;
  tag: string;
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<{ allPostsId: PostsIdInterface[] }>
> {
  const allPostsId: PostsIdInterface[] = await getAllPostIds();

  return { props: { allPostsId: allPostsId } };
}
