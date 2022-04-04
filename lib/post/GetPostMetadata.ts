import { PostRepo } from "./PostRepo";

export class GetPostMetadata{
    private folder: string
    private postId: string
    constructor(folder: string, postId: string){
        this.folder = folder;
        this.postId = postId
    }
    public async run(){
        const post = new PostRepo(this.folder)
        const postData = await post.getPostMetadata(this.postId);

        return {
            props: {
            postData,
            },
        };
    }
}