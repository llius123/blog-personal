import { NextRouter } from "next/router";
import { PostInterface } from "../../lib/post/PostInterface";
import UIBodyContainer from "../display-components/UIBodyContainer";
import { UILoading } from "../loading/UILoading";
import { UIPost } from "./UIPost";

export function UIPostWrapper({
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