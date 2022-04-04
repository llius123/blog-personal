import { PostInterface } from "../../lib/post/PostInterface";


export function UIPost({ postData }: { postData: PostInterface }): JSX.Element {
  return <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />;
}
