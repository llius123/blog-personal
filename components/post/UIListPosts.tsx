import Link from "next/link";
import React from "react";
import { PostsIdInterface } from "../../lib/post/PostsIdInterface";
import UIBodyContainer from "../display-components/UIBodyContainer";

export function UIListPosts({
    allPostsId,
    href
  }: {
    allPostsId: PostsIdInterface[];
    href: string
  }): JSX.Element {
    return (
      <UIBodyContainer>
        {allPostsId.map((postId, index) => {
          return (
            <React.Fragment key={index}>
              <Link href={`/${href}/` + postId.params.id}>
                {postId.params.id}
              </Link>{" "}
            </React.Fragment>
          );
        })}
      </UIBodyContainer>
    );
  }