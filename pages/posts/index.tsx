import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import Link from "next/link";
import React, { CSSProperties } from "react";
import UIHeader from "../../components/header/UIHeader";
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
      <UIHeader />
      <div style={body_css}>
        {props.allPostsId.map((postId, index) => {
          return (
            <React.Fragment key={index}>
              <Link href={"/posts/" + postId.params.id}>
                {postId.params.id}
              </Link>{" "}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

const body_css: CSSProperties = {
  width: "100%",
  maxWidth: "1400px",
  border: "1px solid red",
  height: "100px",
  display: "grid",
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
