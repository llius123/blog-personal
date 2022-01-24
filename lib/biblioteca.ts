import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { PostInterface } from '../pages/posts'

export interface PostsIdInterface {
    params: {
        id: string
    }
}

const bibliotecaDirectory = path.join(process.cwd(), 'posts/biblioteca')

export function getAllPostIds(): PostsIdInterface[] {
    const fileNames = fs.readdirSync(bibliotecaDirectory)

    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}

export async function getPostMetadata(id: string): Promise<PostInterface> {
    const fullPath = path.join(bibliotecaDirectory, `${id}.md`)
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