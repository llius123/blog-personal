import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import Link from "next/link";
import React, { CSSProperties } from "react";
import UIBodyContainer from "../../components/display-components/UIBodyContainer";
import UIContainer from "../../components/display-components/UIContainer";
import UIHeader from "../../components/header/UIHeader";
import {
  getAllPostIds,
  getPostMetadata,
  PostsIdInterface,
} from "../../lib/biblioteca";

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
            <Link href={"/biblioteca/" + postId.params.id}>
              {postId.params.id}
            </Link>{" "}
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
  const allPostsId: PostsIdInterface[] = await getAllPostIds();

  return { props: { allPostsId: allPostsId } };
}
