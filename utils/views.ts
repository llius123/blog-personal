export interface ViewsInterface {
    id: string,
    href: string;
    title: string;
}

export const Views: ViewsInterface[] = [
    {
        id: '1',
        href: '/profile',
        title: 'Perfil'
    },
    {
        id: '2',
        href: '/posts',
        title: 'Posts'
    },
    {
        id: '3',
        href: '/2022',
        title: 'Propositos 2022'
    }
]