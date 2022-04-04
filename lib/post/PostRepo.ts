import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { PostsIdInterface } from './PostsIdInterface'
import { PostInterface } from './PostInterface'

export class PostRepo {

    private route = 'posts/'
    private folder: string 

    constructor(folder: string) {
        this.folder = folder
    }

    private getFolder(): string{
        return path.join(process.cwd(), this.route + this.folder)
    }

    public getAllPostIds(folder: string): PostsIdInterface[] {
        const route = path.join(process.cwd(), 'posts/' + folder)
        const fileNames = fs.readdirSync(route)
    
        return fileNames.map(fileName => {
            return {
                params: {
                    id: fileName.replace(/\.md$/, '')
                }
            }
        })
    }

    public async getPostMetadata(id: string): Promise<PostInterface> {
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
}