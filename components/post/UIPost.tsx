import { PostInterface } from "../../pages/posts";

export function UIPost({ postData }: { postData: PostInterface }): JSX.Element {
  return <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />;
}
