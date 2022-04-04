import { GetStaticPropsResult } from "next";
import { PostRepo } from "./PostRepo";
import { PostsIdInterface } from "./PostsIdInterface";
import path from 'path'

export class GetAllPostsId{
    private folder: string;
    constructor(folder: string){
        this.folder = folder
    }

    public async run(): Promise<GetStaticPropsResult<{ allPostsId: PostsIdInterface[] }>> {
        const post = new PostRepo(this.folder)
        const allPostsId: PostsIdInterface[] = await post.getAllPostIds(path.join(process.cwd(), 'posts/' + this.folder));

        return { props: { allPostsId: allPostsId } };
    }
}