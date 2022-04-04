import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import Link from "next/link";
import React, { CSSProperties } from "react";
import UIBodyContainer from "../../components/display-components/UIBodyContainer";
import UIContainer from "../../components/display-components/UIContainer";
import UIHeader from "../../components/header/UIHeader";
import { PostRepo } from "../../lib/post/PostRepo";
import { PostsIdInterface } from "../../lib/post/PostsIdInterface";

export default function Posts(props: {
  allPostsId: PostsIdInterface[];
}): JSX.Element {
  return (
    <>
      <UIHeader />
      <ListPosts allPostsId={props.allPostsId} />
    </>
  );
}

function ListPosts({
  allPostsId,
}: {
  allPostsId: PostsIdInterface[];
}): JSX.Element {
  return (
    <UIBodyContainer>
      {allPostsId.map((postId, index) => {
        return (
          <React.Fragment key={index}>
            <Link href={"/posts/" + postId.params.id}>{postId.params.id}</Link>{" "}
          </React.Fragment>
        );
      })}
    </UIBodyContainer>
  );
}
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
  const post = new PostRepo('posts')
  const allPostsId: PostsIdInterface[] = await post.getAllPostIds();

  return { props: { allPostsId: allPostsId } };
}
