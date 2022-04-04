import { GetStaticPropsResult } from "next";
import React from "react";
import UIHeader from "../../components/header/UIHeader";
import { UIListPosts } from "../../components/post/UIListPosts";
import { PostRepo } from "../../lib/post/PostRepo";
import { PostsIdInterface } from "../../lib/post/PostsIdInterface";
import { GetAllPostsId } from "../../lib/post/GetAllPostsId";

const folder = 'biblioteca'

export default function Posts(props: {
  allPostsId: PostsIdInterface[];
}): JSX.Element {
  return (
    <>
      <UIHeader />
      <UIListPosts href={folder} allPostsId={props.allPostsId} />
    </>
  );
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<{ allPostsId: PostsIdInterface[] }>
> {
  return await new GetAllPostsId(folder).run()
}
