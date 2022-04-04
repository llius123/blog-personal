import { GetStaticPaths } from "next";
import { NextRouter, useRouter } from "next/router";
import UIBodyContainer from "../../components/display-components/UIBodyContainer";
import UIHeader from "../../components/header/UIHeader";
import { UILoading } from "../../components/loading/UILoading";
import { UIPost } from "../../components/post/UIPost";
import { PostInterface } from "../../lib/post/PostInterface";
import { PostRepo } from "../../lib/post/PostRepo";

export default function Post(props: { postData: PostInterface }): JSX.Element {
  const router = useRouter();

  return (
    <>
      <UIHeader />
      <PostData router={router} postData={props.postData} />
    </>
  );
}

function PostData({
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
export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: true, //indicates the type of fallback
  };
};

export async function getStaticProps({ params }) {
  const post = new PostRepo('biblioteca')
  const postData = await getPostMetadata(params.id);

  // const postData = { id: "123" };
  return {
    props: {
      postData,
    },
  };
}
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
async function getPostMetadata(id: string): Promise<PostInterface> {
  const fullPath = path.join(this.getFolder(), `${id}.md`)
  const fileContents = await fs.readFileSync(fullPath, 'utf8')


  // Use gray-matter to parse the post metadata section
  const { content, data: { title, date, tag } }: matter.GrayMatterFile<string> = matter(fileContents)



  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
      .use(html)
      .process(content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
      id,
      contentHtml,
      date,
      title,
      tag
  };
}
