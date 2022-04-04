import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import Link from "next/link";
import React, { CSSProperties } from "react";
import UIBodyContainer from "../../components/display-components/UIBodyContainer";
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
            <Link href={"/biblioteca/" + postId.params.id}>
              {postId.params.id}
            </Link>{" "}
          </React.Fragment>
        );
      })}
    </UIBodyContainer>
  );
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<{ allPostsId: PostsIdInterface[] }>
> {
  const post = new PostRepo('biblioteca')
  // const allPostsId: PostsIdInterface[] = await post.getAllPostIds();
  const allPostsId: PostsIdInterface[] = [{params: {id : 'Arquitectura_Hexagonal'}}, {params: {id : 'Principios_solid'}}]

  return { props: { allPostsId: allPostsId } };
}
